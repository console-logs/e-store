"use client";
import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectBoardSizeX,
	selectBoardSizeY,
	selectRigidPcbMemoized,
	setBoardSizeX,
	setBoardSizeY,
	setPcbPrice,
	updatePanelSize,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function RigidBoardSize() {
	const dispatch = useDispatch();
	const boardSizeX = useSelector(selectBoardSizeX);
	const boardSizeY = useSelector(selectBoardSizeY);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	return (
		<div className="w-full">
			<Label>
				PCB / Panel Dimensions (mm) <BoardSizeTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					required
					type="number"
					min={20}
					name="BoardSizeX"
					placeholder="PCB length in mm"
					autoComplete="off"
					className="col-span-5"
					value={boardSizeX === 0 ? "" : boardSizeX}
					onChange={async e => {
						dispatch(setBoardSizeX(Number(e.target.value)));
						dispatch(updatePanelSize());
						const response = await result.refetch();
						dispatch(setPcbPrice(response.data ?? 0));
					}}
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					required
					type="number"
					min={20}
					name="BoardSizeY"
					placeholder="PCB width in mm"
					autoComplete="off"
					className="col-span-5"
					value={boardSizeY === 0 ? "" : boardSizeY}
					onChange={async e => {
						dispatch(setBoardSizeY(Number(e.target.value)));
						dispatch(updatePanelSize());
						const response = await result.refetch();
						dispatch(setPcbPrice(response.data ?? 0));
					}}
				/>
			</div>
		</div>
	);
}

function BoardSizeTip() {
	return (
		<HelpPopover>
			<p>The dimension of single PCB or PCB panel you upload.</p>
		</HelpPopover>
	);
}
