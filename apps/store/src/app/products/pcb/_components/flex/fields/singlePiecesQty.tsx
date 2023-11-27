"use client";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import HelpPopover from "@store/src/components/pcb/shared/helpPopover";
import { ReduxState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function SinglePiecesQuantity() {
	const singlePiecesQty = useSelector((state: ReduxState) => state.flexPcb.singlePiecesQty);
	const designFormat = useSelector((state: ReduxState) => state.flexPcb.designFormat);

	return (
		<div hidden={designFormat === "Single PCB" ? true : false}>
			<Label>
				Single Pieces Quantity{" "}
				<HelpPopover>
					<p>The total number of PCBs after de-panelization</p>
				</HelpPopover>
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
