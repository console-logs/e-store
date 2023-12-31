import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectName, setName } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbName() {
	const dispatch = useDispatch();
	const name = useSelector(selectName);

	return (
		<div>
			<Label>
				PCB Name <PcbNameTip />
			</Label>
			<Input
				placeholder="Enter your project name"
				type="text"
				name="projectName"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setName(e.target.value))}
				value={name}
			/>
		</div>
	);
}

function PcbNameTip() {
	return (
		<HelpPopover>
			<p>This is the name of your Pcb. It is used for the reference in the order confirmation email.</p>
		</HelpPopover>
	);
}
