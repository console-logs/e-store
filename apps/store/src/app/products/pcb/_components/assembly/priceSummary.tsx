import {
	selectCalculatedPrice,
	selectOneTimeSetupCost,
	selectQuantity,
	selectTentativeDispatchDate,
} from "@/redux/reducers/pcbAssemblySlice";
import { useSelector } from "react-redux";

export default function PcbAssemblyPriceSummary() {
	const pcbAssemblyPrice = useSelector(selectCalculatedPrice);
	const setupCost = useSelector(selectOneTimeSetupCost);
	const assemblyQty = useSelector(selectQuantity);
	const tentativeDispatchDate = useSelector(selectTentativeDispatchDate);

	return (
		<div className="rounded-lg bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Estimated Price</h2>
			<div className="flow-root">
				<dl className="-my-4 divide-y divide-gray-300 dark:divide-gray-700 text-sm">
					<div className="flex items-center justify-between py-4">
						<dt>Quantity</dt>
						<dd className="font-medium">{assemblyQty}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>Rate</dt>
						<dd className="font-medium">
							₹
							{(pcbAssemblyPrice / assemblyQty === Infinity ? 0 : pcbAssemblyPrice / assemblyQty).toFixed(
								2
							)}
						</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>Assembly Price</dt>
						<dd className="font-medium">₹{pcbAssemblyPrice}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>One time setup cost</dt>
						<dd className="font-medium">₹{setupCost}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>Tentative Lead Time</dt>
						<dd className="font-medium">{tentativeDispatchDate}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt className="text-base font-medium">Order Total</dt>
						<dd className="text-base font-medium">₹{setupCost + pcbAssemblyPrice}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
