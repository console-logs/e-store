"use client";
import HelpPopover from "@/components/products/pcb/common/help-popover";
import {
	selectBoardType,
	selectOrderedQty,
	selectPcbAssemblyMemomized,
	setOneTimeSetupCost,
	setOrderedQty,
	setPcbAssemblyCost,
} from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function AssemblyQuantity() {
	const dispatch = useDispatch();
	const quantity = useSelector(selectOrderedQty);
	const boardType = useSelector(selectBoardType);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

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
					dispatch(setOrderedQty(Number(e.target.value)));
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
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
