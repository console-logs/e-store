export async function uploadFile(props: { file: File | undefined; Name: string }) {
	const { file, Name } = props;
	if (!file) return false;

	const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/upload", {
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

		return uploadResponse.ok ? true : false;
	} else {
		console.error("Failed to get presigned url");
		return false;
	}
}
