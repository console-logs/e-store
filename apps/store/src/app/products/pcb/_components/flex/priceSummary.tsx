"use client";
import { type ReduxState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function FlexPcbPriceSummary() {
	const pcbPrice = useSelector((state: ReduxState) => state.flexPcb.calculatedPrice);
	const designFormat = useSelector((state: ReduxState) => state.flexPcb.designFormat);
	const pcbQty = useSelector((state: ReduxState) => state.flexPcb.pcbQty);
	const singlePiecesQty = useSelector((state: ReduxState) => state.flexPcb.singlePiecesQty);
	const tentativeDispatchDate = useSelector((state: ReduxState) => state.flexPcb.tentativeDispatchDate);

	return (
		<div className="rounded-lg bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Estimated Price</h2>
			<div className="flow-root">
				<dl className="-my-4 divide-y divide-gray-300 dark:divide-gray-700 text-sm">
					<div className="flex items-center justify-between py-4">
						<dt>Quantity</dt>
						<dd className="font-medium">{designFormat === "Single PCB" ? pcbQty : singlePiecesQty}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>Unit Price</dt>
						<dd className="font-medium">
							₹{(pcbPrice / (designFormat === "Single PCB" ? pcbQty : singlePiecesQty)).toFixed(2)}
						</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt className="">Tentative Lead Time</dt>
						<dd className="font-medium">{tentativeDispatchDate}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt className="text-base font-medium">Order total</dt>
						<dd className="text-base font-medium">₹{pcbPrice.toFixed(2)}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
