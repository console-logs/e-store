import {
	selectCalculatedPrice,
	selectDesignFormat,
	selectPcbQty,
	selectSinglePiecesQty,
	selectTentativeDispatchDate,
} from "@/redux/reducers/rigidPcbSlice";
import { useSelector } from "react-redux";

export default function RigidPcbPriceSummary() {
	const pcbPrice = useSelector(selectCalculatedPrice);
	const designFormat = useSelector(selectDesignFormat);
	const pcbQty = useSelector(selectPcbQty);
	const singlePiecesQty = useSelector(selectSinglePiecesQty);
	const tentativeDispatchDate = useSelector(selectTentativeDispatchDate);

	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 dark:bg-gray-900 sm:p-6 lg:p-8">
			<h2 className="mb-8 text-xl font-semibold tracking-tight">Estimated Price</h2>
			<div className="flow-root">
				<dl className="-my-4 divide-y divide-gray-300 text-sm dark:divide-gray-700">
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
