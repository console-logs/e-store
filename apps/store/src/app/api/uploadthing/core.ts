import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const pcbFileRouter = {
	designFileUploader: f({ "application/zip": { maxFileSize: "64MB", maxFileCount: 1 } })
		.middleware(async () => {
			const { user } = auth();
			if (!user) throw new Error("Unauthorized");
			return { user };
		})
		.onUploadComplete(async ({ file }) => {
			return { fileUrl: file.url };
		}),
} satisfies FileRouter;

export type PcbFileRouter = typeof pcbFileRouter;
