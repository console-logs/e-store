import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectNumOfSmdComponents, setNumOfSmdComponents } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function SmdComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfSmdComponents = useSelector(selectNumOfSmdComponents);

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
