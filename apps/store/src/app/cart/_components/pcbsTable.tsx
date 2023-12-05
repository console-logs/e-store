import { deleteAllItemsAction, deleteCartItemAction, fetchCartItemsAction } from "@/actions";
import DeleteButton from "@/app/cart/_components/delete";
import PcbFabSpecsModal from "@/app/cart/_components/modal";
import { formatToInr } from "@packages/shared/lib/utils";

const pcbTypes = ["Rigid PCB", "Flex PCB", "PCB Assembly"];

export default async function BasketPcbsTable() {
	const cart = await fetchCartItemsAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	const pcbs = cart
		? cart.cartItems.filter((item): item is RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType =>
				pcbTypes.includes(item.Type)
		  )
		: [];

	return (
		<div>
			<h3 className="text-lg font-semibold">PCB Fabrication/Assembly</h3>
			<div className="-mx-4 mt-3 flow-root sm:mx-0">
				<table className="min-w-full">
					<colgroup>
						<col className="sm:w-1/12" />
						<col className="w-full sm:w-1/4" />
						<col className="sm:w-1/6" />
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
								PCB Details
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
								<DeleteButton
									deleteAllAction={deleteAllItemsAction}
									itemTypeToDelete="PCB"
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{pcbs.length > 0 ? (
							<>
								{pcbs.map((pcb, pcbIdx) => {
									const serialNum = pcbIdx + 1;
									const { NetPrice, Type } = pcb;
									const isRigidOrFlex = Type === "Rigid PCB" || Type === "Flex PCB";
									const name = pcb.Name;
									const quantity = isRigidOrFlex
										? pcb.DesignFormat === "Single PCB"
											? pcb.PcbQty
											: pcb.SinglePiecesQty
										: pcb.OrderedQty;
									const netPrice = NetPrice;
									const unitPrice = netPrice / quantity;

									return (
										<tr
											key={serialNum}
											className="divide-y divide-gray-300 dark:divide-gray-700">
											<td className="px-3 py-5 text-center text-sm text-muted-foreground sm:table-cell">
												{serialNum}
											</td>
											<td className="max-w-0 space-y-1 py-5 pl-4 pr-3 text-sm sm:pl-0">
												<div className="font-bold">
													Name: <span className="font-normal">{name}</span>
												</div>

												<div className="font-bold">
													Type: <span className="font-normal">{Type}</span>
												</div>

												<PcbFabSpecsModal fabSpecs={pcb} />

												<dl className="lg:hidden">
													<dd className="flex items-center gap-x-2 mt-1 sm:w-64 md:w-80 sm:hidden">
														{quantity} No&apos;s
													</dd>
													<dd className="mt-1 sm:hidden">
														<span className="text-muted-foreground">Rate: </span>
														<span className="font-medium">{formatToInr(unitPrice)}</span>
													</dd>
													<dt className="sr-only sm:hidden">Remove</dt>
													<dd className="mt-1 text-muted-foreground sm:hidden">
														<DeleteButton
															deleteAction={deleteCartItemAction}
															itemToDelete={name}
														/>
													</dd>
												</dl>
											</td>

											<td className="hidden px-3 py-5 text-sm sm:table-cell text-center">
												{quantity} No&apos;s
											</td>

											<td className="hidden px-3 py-5 text-right font-medium text-sm sm:table-cell">
												{formatToInr(unitPrice)}
											</td>

											<td className="py-5 pl-3 pr-4 text-right font-medium text-sm sm:pr-0">
												{formatToInr(netPrice)}
											</td>

											<td className="hidden sm:table-cell text-right">
												<DeleteButton
													deleteAction={deleteCartItemAction}
													itemToDelete={name}
												/>
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
									You&apos;ve not added PCB fabrication or assembly projects to cart
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
