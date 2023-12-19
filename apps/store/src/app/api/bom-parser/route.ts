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
			return tRPCServerApi.part.getParts.query({ mpn: part.ManufacturerPartNumber });
		});
		const responses = await Promise.all(promises);

		// Api returns multiple results that match the query.
		// Filter out Names that are not exact match to Names in our bom file.
		const parsedDataNames = new Set(parsedData.map(data => data.ManufacturerPartNumber.toUpperCase())); // Get all Names from parsed data

		// Create a map to store unique parts
		const uniqueParts: Record<string, PartResultsType> = {};
		const sortedResults: SortedResultsType = {
			naParts: [],
			availableParts: [],
		};

		responses.forEach(response => {
			for (const [key, value] of Object.entries(response.Parts)) {
				if (parsedDataNames.has(key.toUpperCase())) {
					// Only add the part to the map if it's not already present
					if (!uniqueParts[key]) {
						// Find the corresponding part in parsedData
						const correspondingPart = parsedData.find(
							part => part.ManufacturerPartNumber.toUpperCase() === key.toUpperCase()
						);

						// Update the OrderedQty value
						value.OrderedQty = correspondingPart ? parseInt(correspondingPart.Quantity) : 0;

						uniqueParts[key] = {
							Parts: { [key]: value },
							Errors: null,
						};
					}
				}
			}
		});
		// Convert the map to an array
		const filteredResults = Object.values(uniqueParts);

		// Check the Availability property of each part in the filtered data
		Object.values(filteredResults).forEach(result => {
			Object.values(result.Parts).forEach(part => {
				if (part.Availability.includes("None") || part.Availability.includes("On Order")) {
					sortedResults.naParts.push(part);
				} else {
					sortedResults.availableParts.push(part);
				}
			});
		});

		return new Response(JSON.stringify(sortedResults), { status: STATUS_OK });
	} catch (err) {
		console.error(err);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Failed to process BoM" });
	}
}
