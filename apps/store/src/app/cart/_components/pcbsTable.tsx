import { fetchCartItemsAction } from "@/actions";
import { deleteAllPcbsAction, deletePcbAction } from "@/actions/pcb";
import DeleteButton from "@/app/cart/_components/delete";
import PcbFabSpecsModal from "@/app/cart/_components/modal";
import { formatToInr } from "@packages/shared/lib/utils";
import { Badge } from "@shared/components/ui/badge";

export default async function BasketPcbsTable() {
	const cart = await fetchCartItemsAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	const rigidPcbs: RigidPcbFabSpecsType[] = cart ? cart.rigidPcbs : [];
	const flexPcbs: FlexPcbFabSpecsType[] = cart ? cart.flexPcbs : [];
	const pcbAssemblies: PcbAssemblyFabSpecsType[] = cart ? cart.pcbAssemblies : [];
	const allPcbs = [...rigidPcbs, ...flexPcbs, ...pcbAssemblies];

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
								<DeleteButton deleteAllAction={deleteAllPcbsAction} />
							</th>
						</tr>
					</thead>
					<tbody>
						{allPcbs.length > 0 ? (
							<>
								{allPcbs.map((pcb, pcbIdx) => {
									const serialNum = pcbIdx + 1;
									const type = pcb.Type;
									let name = "";
									let quantity = 0;
									let unitPrice = 0;
									let netPrice = 0;

									if (type === "Rigid PCB" || type === "Flex PCB") {
										name = pcb.PcbName;
										netPrice = pcb.NetPrice;
										if (pcb.DesignFormat === "Single PCB") {
											quantity = pcb.PcbQty;
										} else {
											quantity = pcb.SinglePiecesQty;
										}
									} else {
										name = pcb.ProjectName;
										quantity = pcb.Quantity;
									}
									unitPrice = netPrice / quantity;
									return (
										<tr
											key={serialNum}
											className="divide-y divide-gray-300 dark:divide-gray-700">
											<td className="px-3 py-5 text-center text-sm text-muted-foreground sm:table-cell">
												{serialNum}
											</td>
											<td className="max-w-0 space-y-1 py-5 pl-4 pr-3 text-sm sm:pl-0">
												<div className="font-medium">
													Name: <span className="font-normal">{name}</span>
												</div>

												<div className="flex items-center gap-x-2">
													Type: <Badge>{type}</Badge>
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
															deleteAction={deletePcbAction}
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
													deleteAction={deletePcbAction}
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
