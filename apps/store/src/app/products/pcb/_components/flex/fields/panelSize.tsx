"use client";
import PanelSizeTip from "@/app/products/pcb/_components/flex/tips/panelSizeTip";
import { type ReduxState } from "@/redux/store";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useSelector } from "react-redux";

export default function PanelSize() {
	const panelSizeX = useSelector((state: ReduxState) => state.flexPcb.panelSizeX);
	const panelSizeY = useSelector((state: ReduxState) => state.flexPcb.panelSizeY);
	const designFormat = useSelector((state: ReduxState) => state.flexPcb.designFormat);

	return (
		<div
			className="w-full"
			hidden={designFormat === "Single PCB" ? true : designFormat === "Panel by Customer" ? true : false}>
			<Label>
				Panel Size (mm) <PanelSizeTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					type="number"
					name="PanelSizeX"
					placeholder="Panel length in mm"
					autoComplete="off"
					className="col-span-5"
					value={panelSizeX}
					disabled
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					type="number"
					name="PanelSizeY"
					placeholder="Panel width in mm"
					autoComplete="off"
					className="col-span-5"
					value={panelSizeY}
					disabled
				/>
			</div>
		</div>
	);
}
