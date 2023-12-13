import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectNumOfUniqueComponents, selectPcbAssemblyMemomized, setNumOfUniqueComponents, setOneTimeSetupCost, setPcbAssemblyCost } from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function UniqueComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfUniqueComponents = useSelector(selectNumOfUniqueComponents);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

	return (
		<div>
			<Label>
				Number of unique components
				<UniqueComponentsTip />
			</Label>
			<Input
				placeholder="Enter unique components quantity"
				type="text"
				name="uniqueComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setNumOfUniqueComponents(Number(e.target.value)));
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
				}}
				value={numOfUniqueComponents === 0 ? "" : numOfUniqueComponents}
			/>
		</div>
	);
}

function UniqueComponentsTip() {
	return (
		<HelpPopover>
			<p>How many number of unique components are present on the board.</p>
		</HelpPopover>
	);
}
