import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectNumOfUniqueComponents, setNumOfUniqueComponents } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function UniqueComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfUniqueComponents = useSelector(selectNumOfUniqueComponents);

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
