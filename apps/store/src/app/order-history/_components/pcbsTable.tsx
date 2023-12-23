import ViewPcbFabSpecsModal from "@/components/pcb/view-pcb-fab-specs-modal";
import { formatToInr } from "@packages/shared/lib/utils";

export default async function OrderedPcbsTable({ order }: { order: OrderType }) {
	const pcbs = order.cart.cartItems.filter(
		(item): item is RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType => item.Type === "PCB"
	);

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
						</tr>
					</thead>
					<tbody>
						{pcbs.map((pcb, pcbIdx) => {
							const serialNum = pcbIdx + 1;
							const { NetPrice, Category } = pcb;
							const isRigidOrFlex = Category === "Rigid PCB" || Category === "Flex PCB";
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
											Type: <span className="font-normal">{Category}</span>
										</div>

										<ViewPcbFabSpecsModal fabSpecs={pcb} />

										<dl className="lg:hidden">
											<dd className="flex items-center gap-x-2 mt-1 sm:w-64 md:w-80 sm:hidden">
												{quantity} No&apos;s
											</dd>
											<dd className="mt-1 sm:hidden">
												<span className="text-muted-foreground">Rate: </span>
												<span className="font-medium">{formatToInr(unitPrice)}</span>
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
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
