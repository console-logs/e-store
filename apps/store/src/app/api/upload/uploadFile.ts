import { env } from "@/env";

export async function uploadFile(props: {
	file: File | undefined;
	Name: string;
}): Promise<{ success: boolean; fileUrl: string }> {
	const { file, Name } = props;
	if (!file) return { success: false, fileUrl: "" };

	const response = await fetch(env.NEXT_PUBLIC_BASE_URL + "/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ filename: Name, contentType: file.type }),
	});

	if (response.ok) {
		const { url, fields } = (await response.json()) as { url: string; fields: string };

		const formData = new FormData();
		Object.entries(fields).forEach(([key, value]) => {
			formData.append(key, value);
		});
		formData.append("file", file);

		const uploadResponse = await fetch(url, {
			method: "POST",
			body: formData,
		});
		return uploadResponse.ok ? { success: true, fileUrl: "" } : { success: false, fileUrl: "" };
	} else {
		console.error("Failed to get presigned url");
		return { success: false, fileUrl: "" };
	}
}
