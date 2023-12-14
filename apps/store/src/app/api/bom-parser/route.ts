import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK } from "@/lib/constants";
import parseCsvFile from "@/lib/helpers";
import { tRPCServerApi } from "@/trpc/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file: File | null = formData.get("file") as File;
	if (!file) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No file provided" });
	try {
		const parsedData = await parseCsvFile(file);

		const promises = parsedData.map(part => {
			return tRPCServerApi.part.getParts.query({ mpn: part.Name });
		});

		const responses = await Promise.all(promises);

		// Api returns multiple results that match the query.
		// Filter out Names that are not exact match to Names in our bom file.
		const parsedDataNames = new Set(parsedData.map(data => data.Name.toUpperCase()));

		const results = responses.filter(response => {
			return Object.values(response.Parts).filter(part => {
				parsedDataNames.has(part.Name.toUpperCase());
			});
		});
		return new Response(JSON.stringify(results), { status: STATUS_OK });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Something went wrong" });
	}
}
