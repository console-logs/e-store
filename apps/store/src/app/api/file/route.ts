import { createCartCookieAction } from "@/actions";
import { env } from "@/env";
import { guestCartsCollection, mongoClient, usersCollection } from "@/lib/mongo";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";

const s3Client = new S3Client({}); // credentials are loaded from environment variables

export async function POST(request: Request) {
	const formData = await request.formData();

	const file: File | null = formData.get("file") as File;
	if (!file) return new Response(null, { status: 400, statusText: "No file provided" });
	const filename = file.name + ".zip"; // default
	let foldername = "/";

	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();

	if (!userId && !cartIdCookie) {
		foldername = newCartId + "/";
		await guestCartsCollection.insertOne({
			cartId: newCartId,
			cart: {
				cartSize: 0,
				cartItems: [],
			},
		});
		await createCartCookieAction(newCartId);
	}

	if (userId) {
		await mongoClient.connect();
		const options = { projection: { _id: 0, s3FileDir: 1 } };
		const userFilter = { userId };
		const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
		if (!result) return new Response(null, { status: 404, statusText: "User not found" });
		if (result.s3FileDir) {
			foldername = result.s3FileDir + "/";
		} else {
			foldername = newCartId + "/";
			await usersCollection.updateOne(userFilter, { $set: { s3FileDir: foldername } });
		}
	}

	if (cartIdCookie) {
		foldername = cartIdCookie.value + "/";
	}

	// Read the file into a Buffer
	const fileArrayBuffer = await file.arrayBuffer();
	const fileUint8Array = new Uint8Array(fileArrayBuffer);

	const putCommand = new PutObjectCommand({
		Bucket: env.AWS_BUCKET_NAME,
		Key: foldername + filename,
		Body: fileUint8Array,
		ContentType: file.type,
	});

	const getCommand = new GetObjectCommand({
		Bucket: env.AWS_BUCKET_NAME,
		Key: foldername + filename,
	});

	try {
		await s3Client.send(putCommand);
		const fileUrl = await getSignedUrl(s3Client, getCommand);
		return new Response(JSON.stringify({ filename, fileUrl }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: 500, statusText: "Something went wrong" });
	}
}

export async function DELETE(request: Request) {
	const { filename } = (await request.json()) as { filename: string };

	const command = new DeleteObjectCommand({
		Bucket: env.AWS_BUCKET_NAME,
		Key: filename,
	});

	try {
		await s3Client.send(command);
		return new Response(null, { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: 404, statusText: "File not found" });
	}
}
