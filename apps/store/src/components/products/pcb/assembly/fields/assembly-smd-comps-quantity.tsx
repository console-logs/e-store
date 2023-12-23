import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectNumOfSmdComponents,
	selectPcbAssemblyMemomized,
	setNumOfSmdComponents,
	setOneTimeSetupCost,
	setPcbAssemblyCost,
} from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblySmdComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfSmdComponents = useSelector(selectNumOfSmdComponents);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

	return (
		<div>
			<Label>
				Number of smd components
				<UniqueSmdTip />
			</Label>
			<Input
				placeholder="Enter SMD components quantity"
				type="text"
				name="smdComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setNumOfSmdComponents(Number(e.target.value)));
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
				}}
				value={numOfSmdComponents}
			/>
		</div>
	);
}

function UniqueSmdTip() {
	return (
		<HelpPopover>
			<p>How many number of SMD components are present on the board.</p>
		</HelpPopover>
	);
}
