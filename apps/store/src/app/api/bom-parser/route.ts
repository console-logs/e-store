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
		const filteredResults: PartResultsType[] = [];
		const parsedDataNames = new Set(parsedData.map(data => data.Name.toUpperCase())); // Get all Names from parsed data

		responses.forEach(response => {
			for (const [key, value] of Object.entries(response.Parts)) {
				if (parsedDataNames.has(key.toUpperCase())) {
					filteredResults.push({
						Parts: { [key]: value },
						Errors: null,
					});
				}
			}
		});

		// unique results
		const uniqueResults = [...new Set(filteredResults)];
		return new Response(JSON.stringify(uniqueResults), { status: STATUS_OK });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Failed to process BoM" });
	}
}
