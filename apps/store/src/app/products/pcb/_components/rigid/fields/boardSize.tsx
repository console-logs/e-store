"use client";
import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";
import { useCalculateRigidPcbPriceMutation } from "@/redux/api/apiSlice";
import {
	selectBoardSizeX,
	selectBoardSizeY,
	selectRigidPcbMemoized,
	setBoardSizeX,
	setBoardSizeY,
	setPcbPrice,
	updatePanelSize,
} from "@/redux/reducers/rigidPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function BoardSize() {
	const dispatch = useDispatch();
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const boardSizeX = useSelector(selectBoardSizeX);
	const boardSizeY = useSelector(selectBoardSizeY);
	const [calculatePcbPrice] = useCalculateRigidPcbPriceMutation();

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
						const price = await calculatePcbPrice(rigidPcb).unwrap();
						dispatch(setPcbPrice(price));
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
						const price = await calculatePcbPrice(rigidPcb).unwrap();
						dispatch(setPcbPrice(price));
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
