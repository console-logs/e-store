import { env } from "@/env";
import { FILE_EXTENSION, STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK, s3Client } from "@/lib/constants";
import { getFoldername } from "@/lib/helpers";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file: File | null = formData.get("file") as File;
	if (!file) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No file provided" });
	const filename = file.name + FILE_EXTENSION; // default

	const foldername = await getFoldername();

	// s3 only accepts file in the form of a buffer
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
		return new Response(JSON.stringify({ filename, fileUrl }), { status: STATUS_OK });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Something went wrong" });
	}
}
