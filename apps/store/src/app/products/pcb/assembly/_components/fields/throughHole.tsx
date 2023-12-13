import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectNumOfThroughHoleComponents, selectPcbAssemblyMemomized, setNumOfThroughHoleComponents, setOneTimeSetupCost, setPcbAssemblyCost } from "@/redux/reducers/pcbAssemblySlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ThroughHoleComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfThroughHoleComponents = useSelector(selectNumOfThroughHoleComponents);
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const result = tRPCReactApi.pcbAssembly.getPrice.useQuery(pcbAssembly);

	return (
		<div>
			<Label>
				Number of through-hole components
				<UniqueThroughHoleTip />
			</Label>
			<Input
				placeholder="Enter through-hole components quantity"
				type="text"
				name="throughHoleComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setNumOfThroughHoleComponents(Number(e.target.value)));
					const response = await result.refetch();
					dispatch(setPcbAssemblyCost(response.data ? response.data.assemblyCost : 0));
					dispatch(setOneTimeSetupCost(response.data ? response.data.setupCost : 0));
				}}
				value={numOfThroughHoleComponents}
			/>
		</div>
	);
}

function UniqueThroughHoleTip() {
	return (
		<HelpPopover>
			<p>How many number of through-hole components are present on the board.</p>
		</HelpPopover>
	);
}
