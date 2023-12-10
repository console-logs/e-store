import { createCartCookieAction } from "@/actions";
import { env } from "@/env";
import { convertMBToBytes } from "@/lib/utils";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";

export async function POST(request: Request) {
	const { filename, contentType } = await request.json() as { filename: string; contentType: string }
	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();
	
	let newFileName = filename + "_" + newCartId; // default

	if(!userId && !cartIdCookie) {
		await createCartCookieAction(newCartId);
	} else if (cartIdCookie){
		newFileName = filename + "_" + cartIdCookie.value;
	}
	
	try {
		const client = new S3Client({ region: env.AWS_REGION });
		const { url, fields } = await createPresignedPost(client, {
			Bucket: env.AWS_BUCKET_NAME,
			Key: newFileName,
			Conditions: [
				["content-length-range", 0, convertMBToBytes(25)],
				["starts-with", "$Content-Type", contentType],
			],
			Fields: {
				acl: "public-read",
				"Content-Type": contentType,
			},
			Expires: 600, // 3600 by default.
		});
		return Response.json({ url, fields });
	} catch (err: unknown) {
		let errorMessage: string | undefined = "Something went wrong, please try again later.";
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return Response.json({ error: errorMessage, success: false });
	}
}
