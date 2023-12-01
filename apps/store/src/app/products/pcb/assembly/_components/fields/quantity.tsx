"use client";
import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectBoardType, selectQuantity, setQuantity } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function AssemblyQuantity() {
	const dispatch = useDispatch();
	const quantity = useSelector(selectQuantity);
	const boardType = useSelector(selectBoardType);

	return (
		<div className="w-full">
			<Label>
				Assembly Quantity <span>{boardType === "Single PCB" ? "(No. of Pcbs)" : "(No. of Panels)"}</span>
				<AssemblyQtyTip />
			</Label>
			<Input
				placeholder="Enter assembly quantity"
				type="text"
				name="AssemblyQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setQuantity(Number(e.target.value)));
				}}
				value={quantity === 0 ? "" : quantity}
			/>
		</div>
	);
}

function AssemblyQtyTip() {
	return (
		<HelpPopover>
			<p>The quantity you&apos;d want to get assembled</p>
		</HelpPopover>
	);
}
