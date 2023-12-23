import { PartResultTableHead } from "@/components/products/part/part-result-thead";
import { PART_DETAILS_PAGE } from "@/lib/routes";
import { tRPCServerApi } from "@/trpc/server";
import { Badge } from "@shared/components/ui/badge";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { query: string } }): Promise<Metadata> {
	return {
		title: params.query,
	};
}

export default async function PartResults({
	params: { query },
}: {
	params: {
		query: string;
	};
}) {
	const response = await tRPCServerApi.part.getParts.query({ mpn: query });
	const parts = response.Parts;
	const partNumbers = Object.keys(parts);

	if (partNumbers.length === 0) {
		return notFound();
	}

	return (
		<div className="mt-4 space-y-6">
			<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				Results for {decodeURIComponent(query)}
			</h1>
			<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 table-fixed">
				<PartResultTableHead />
				<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{partNumbers.map((partNumber, index) => {
						const { Description, DatasheetUrl, Availability } = parts[partNumber]!;
						return (
							<tr
								key={index}
								className="dark:hover:bg-gray-900 hover:bg-gray-100">
								<td className="px-3 py-4 text-sm">{index + 1}</td>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0">
									<Link
										href={PART_DETAILS_PAGE + partNumber}
										className="hover:underline">
										{partNumber}
									</Link>
									{/* Mobile View */}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Part Description</dt>
										<dd className="mt-1 sm:w-64 md:w-80">{Description}</dd>
										<dt className="sr-only sm:hidden ">Part Datasheet link</dt>
										<dd className="mt-1 sm:hidden">
											<Link
												className="hover:underline"
												target="_blank"
												href={DatasheetUrl}>
												Datasheet
											</Link>
										</dd>
										<dt className="sr-only sm:hidden ">Availability</dt>
										<dd className="mt-1 sm:hidden">
											<Badge
												variant={
													Availability === "On Order" || Availability === "None"
														? "destructive"
														: "default"
												}>
												{Availability}
											</Badge>
										</dd>
									</dl>
								</td>
								{/* End of Mobile View */}
								<td className="hidden px-3 py-4 text-sm lg:table-cell w-2/5">{Description}</td>
								<td className="hidden sm:table-cell text-sm px-3">
									<Link
										className="hover:underline"
										target="_blank"
										href={DatasheetUrl}>
										Datasheet
									</Link>
								</td>
								<td className="hidden sm:table-cell px-3 py-4">
									<Badge
										variant={
											Availability === "On Order" || Availability === "None"
												? "destructive"
												: "default"
										}>
										{Availability}
									</Badge>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
