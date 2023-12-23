import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectNumOfBgaComponents,
	selectPcbAssemblyMemomized,
	setNumOfBgaComponents,
	setOneTimeSetupCost,
	setPcbAssemblyCost,
} from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyBgaComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfBgaComponents = useSelector(selectNumOfBgaComponents);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

	return (
		<div>
			<Label>
				Number of BGA / QFP components
				<UniqueBGATip />
			</Label>
			<Input
				placeholder="Enter BGA/QFP components quantity"
				type="text"
				name="bgaQfpComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				value={numOfBgaComponents}
				onChange={async e => {
					dispatch(setNumOfBgaComponents(Number(e.target.value)));
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
				}}
			/>
		</div>
	);
}

function UniqueBGATip() {
	return (
		<HelpPopover>
			<p>How many number of BGA/QFP/QFN components are present on the board.</p>
		</HelpPopover>
	);
}
