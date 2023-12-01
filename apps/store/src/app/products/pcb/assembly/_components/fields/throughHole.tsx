import HelpPopover from "@/app/products/pcb/_components/common/help";
import { useCalculatePcbAssemblyPriceMutation } from "@/redux/api/apiSlice";
import {
	selectNumOfThroughHoleComponents,
	selectPcbAssemblyMemomized,
	setNumOfThroughHoleComponents,
	setOneTimeSetupCost,
	setPcbPrice,
} from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ThroughHoleComponentsQuantity() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const numOfThroughHoleComponents = useSelector(selectNumOfThroughHoleComponents);
	const [calculatePcbPrice] = useCalculatePcbAssemblyPriceMutation();

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
					const price = await calculatePcbPrice(pcbAssembly).unwrap();
					dispatch(setPcbPrice(price.assemblyCost));
					dispatch(setOneTimeSetupCost(price.setupCost));
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
