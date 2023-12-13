import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectBoardType, selectPcbAssemblyMemomized, selectPcbsPerPanel, setOneTimeSetupCost, setPcbAssemblyCost, setPcbsPerPanel } from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbsPerPanel() {
	const dispatch = useDispatch();
	const pcbsPerPanel = useSelector(selectPcbsPerPanel);
	const boardType = useSelector(selectBoardType);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

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
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
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
