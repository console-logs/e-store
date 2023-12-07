import { calculatePartNetPrice, calculatePartUnitPrice } from "@/lib/utils";

export default async function OrderedPartsTable({ order }: { order: OrderType }) {
	const parts = order.cart.cartItems.filter((item): item is PartDataType => item.Type === "Part");
	return (
		<div>
			<h3 className="text-lg font-semibold">Parts</h3>
			<div className="-mx-4 mt-3 flow-root sm:mx-0">
				<table className="min-w-full">
					<colgroup>
						<col className="sm:w-1/12" />
						<col className="w-full sm:w-1/4" />
						<col />
						<col className="sm:w-1/6" />
						<col className="sm:w-1/6" />
						<col className="sm:w-1/12" />
					</colgroup>
					<thead className="border-b border-gray-300 dark:border-gray-700">
						<tr>
							<th
								scope="col"
								className="px-3 py-3.5 text-left text-sm font-semibold sm:table-cell">
								S.No
							</th>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
								Part Details
							</th>

							<th
								scope="col"
								className="hidden px-3 py-3.5 text-center text-sm font-semibold sm:table-cell">
								Quantity
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-right text-sm font-semibold sm:table-cell">
								Unit Price
							</th>
							<th
								scope="col"
								className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold sm:pr-0">
								Net Price
							</th>
						</tr>
					</thead>
					<tbody>
						{parts.map((part, partIdx) => {
							const { Name, Description, OrderedQty } = part;
							const serialNum = partIdx + 1;
							const unitPrice = calculatePartUnitPrice(parts, Name);
							const netPrice = calculatePartNetPrice(unitPrice, part.OrderedQty);
							return (
								<tr
									key={serialNum}
									className="divide-y divide-gray-300 dark:divide-gray-700">
									<td className="px-3 py-5 text-center text-sm text-muted-foreground sm:table-cell">
										{serialNum}
									</td>
									<td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
										<div className="font-medium">{Name}</div>
										<div className="mt-1 text-muted-foreground">{Description}</div>
										<dl className="lg:hidden">
											<dt className="sr-only">Ordered Quantity</dt>
											<dd className="mt-1 md:w-80 sm:hidden">{OrderedQty}</dd>
											<dt className="sr-only sm:hidden">Rate</dt>
											<dd className="mt-1 sm:hidden">
												<span className="text-muted-foreground">Rate: </span>
												<span className="font-medium">{unitPrice}</span>
											</dd>
										</dl>
									</td>
									<td className="hidden px-3 py-5 text-sm sm:table-cell">{OrderedQty}</td>
									<td className="hidden px-3 py-5 text-right font-medium text-sm sm:table-cell">
										{unitPrice}
									</td>
									<td className="py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
										{netPrice}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
