import { HelpPopover } from "@/components/products/pcb/help-popover";
import { selectDesignFormat, selectSinglePiecesQty } from "@/redux/reducers/rigid-pcb-slice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useSelector } from "react-redux";

export function RigidSinglePiecesQuantity() {
	const singlePiecesQty = useSelector(selectSinglePiecesQty);
	const designFormat = useSelector(selectDesignFormat);

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

function SinglePiecesQtyTip() {
	return (
		<HelpPopover>
			<p>The total number of PCBs after de-panelization</p>
		</HelpPopover>
	);
}
