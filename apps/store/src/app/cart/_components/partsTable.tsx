import { fetchCartItemsAction } from "@/actions";
import { DeleteAllButton, DeleteCartItemButton } from "@/app/cart/_components/delete";
import UpdatePartQtyForm from "@/app/cart/_components/updatePartQty";
import { calculatePartNetPrice, calculatePartUnitPrice } from "@/lib/utils";
import { Badge } from "@shared/components/ui/badge";

export default async function BasketPartsTable() {
	const cart = await fetchCartItemsAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	// May include out-of-stock parts added by bom parser.
	// Make sure to remove them at checkout.
	const parts = cart ? cart.cartItems.filter((item): item is PartDataType => item.Type === "Part") : [];

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
							<th
								scope="col"
								className="text-right hidden sm:table-cell">
								<DeleteAllButton type={"Part"} />
							</th>
						</tr>
					</thead>
					<tbody>
						{parts.length > 0 ? (
							<>
								{parts.map((part, partIdx) => {
									const { Name, Description, Availability } = part;
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
													<dd className="mt-1 md:w-80 sm:hidden">
														<UpdatePartQtyForm part={part} />
													</dd>

													<dt className="sr-only sm:hidden">Stock</dt>
													<dd className="mt-1 sm:hidden">
														<Badge>{Availability}</Badge>
													</dd>
													<dt className="sr-only sm:hidden">Rate</dt>
													<dd className="mt-1 sm:hidden">
														<span className="text-muted-foreground">Rate: </span>
														<span className="font-medium">{unitPrice}</span>
													</dd>
													<dt className="sr-only sm:hidden">Remove</dt>
													<dd className="mt-1 text-muted-foreground sm:hidden">
														<DeleteCartItemButton itemName={Name} />
													</dd>
												</dl>
											</td>
											<td className="hidden px-3 py-5 text-sm sm:table-cell">
												<UpdatePartQtyForm part={part} />
												<Badge className="mt-2">{Availability}</Badge>
											</td>
											<td className="hidden px-3 py-5 text-right font-medium text-sm sm:table-cell">
												{unitPrice}
											</td>
											<td className="py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												{netPrice}
											</td>
											<td className="hidden sm:table-cell text-right">
												<DeleteCartItemButton itemName={Name} />
											</td>
										</tr>
									);
								})}
							</>
						) : (
							<tr className="divide-y divide-gray-300 dark:divide-gray-700">
								<td
									colSpan={6}
									className="text-center text-muted-foreground text-sm">
									You&apos;ve not added any parts to cart
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
