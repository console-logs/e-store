import HelpPopover from "@/app/products/pcb/_components/common/help";
import { useCalculatePcbAssemblyPriceMutation } from "@/redux/api/apiSlice";
import {
	selectBoardType,
	selectPcbAssemblyMemomized,
	selectPcbsPerPanel,
	setOneTimeSetupCost,
	setPcbPrice,
	setPcbsPerPanel,
} from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbsPerPanel() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const pcbsPerPanel = useSelector(selectPcbsPerPanel);
	const boardType = useSelector(selectBoardType);
	const [calculatePcbPrice] = useCalculatePcbAssemblyPriceMutation();

	return (
		<div hidden={boardType === "Single PCB"}>
			<Label>
				Pcbs per Panel <PcbsPerPanelTip />
			</Label>
			<Input
				placeholder="Enter Pcbs/Panel"
				type="text"
				name="PcbsPerPanel"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setPcbsPerPanel(Number(e.target.value)));
					const price = await calculatePcbPrice(pcbAssembly).unwrap();
					dispatch(setPcbPrice(price.assemblyCost));
					dispatch(setOneTimeSetupCost(price.setupCost));
				}}
				value={pcbsPerPanel === 0 ? "" : pcbsPerPanel}
			/>
		</div>
	);
}

function PcbsPerPanelTip() {
	return (
		<HelpPopover>
			<p>How many single pcbs you have on your panel</p>
		</HelpPopover>
	);
}
