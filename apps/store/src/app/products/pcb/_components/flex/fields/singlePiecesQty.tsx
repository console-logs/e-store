"use client";
import SinglePiecesQtyTip from "@/app/products/pcb/_components/flex/tips/singlePiecesQtyTip";
import { type ReduxState } from "@/redux/store";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useSelector } from "react-redux";

export default function SinglePiecesQuantity() {
	const singlePiecesQty = useSelector((state: ReduxState) => state.flexPcb.singlePiecesQty);
	const designFormat = useSelector((state: ReduxState) => state.flexPcb.designFormat);

	return (
		<div hidden={designFormat === "Single PCB"}>
			<Label>
				Single Pieces Quantity <SinglePiecesQtyTip />
			</Label>
			<Input
				placeholder="Single Pieces Quntity"
				disabled
				type="number"
				name="SinglePiecesQty"
				autoComplete="off"
				className="w-full"
				required
				value={singlePiecesQty}
			/>
		</div>
	);
}
