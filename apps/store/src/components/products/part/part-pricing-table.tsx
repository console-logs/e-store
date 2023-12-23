import { formatToInr } from "@packages/shared/lib/utils";

export function PartPricingTable({ partData }: { partData: PartDataType }) {
	return (
		<div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:border-l lg:pl-4">
			<p className="text-lg font-semibold my-2">Pricing Chart</p>
			<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
				<thead>
					<tr className="text-center">
						<th
							scope="col"
							className="py-3.5 text-xs font-semibold uppercase">
							Qty
						</th>
						<th
							scope="col"
							className="py-3.5 text-xs font-semibold uppercase">
							Rate
						</th>
						<th
							scope="col"
							className="py-3.5 text-xs font-semibold uppercase">
							Price
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-300 dark:divide-gray-700 text-center">
					{partData.PriceBreaks.map((priceBreak, index) => {
						const { Price, Quantity } = priceBreak;
						const unitPrice_num = Number(Price.slice(1).replace(/,/g, "")); // remove ₹ and ,
						const netPrice_num = Number(Price.slice(1).replace(/,/g, "")) * Number(Quantity);
						const unitPrice = formatToInr(unitPrice_num);
						const netPrice = formatToInr(netPrice_num);
						if (index < 6) {
							// limiting number of rows to 6.
							return (
								<tr key={index}>
									<td className="px-3 py-3 text-sm text-muted-foreground">{Quantity}</td>
									<td className="px-3 py-3 text-sm text-muted-foreground">{unitPrice}</td>
									<td className="px-3 py-3 text-sm text-muted-foreground">{netPrice}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
}
