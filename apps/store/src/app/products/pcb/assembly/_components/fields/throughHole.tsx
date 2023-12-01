import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectNumOfThroughHoleComponents, setNumOfThroughHoleComponents } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ThroughHoleComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfThroughHoleComponents = useSelector(selectNumOfThroughHoleComponents);

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
