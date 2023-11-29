import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";
import { selectPcbName, setPcbName } from "@/redux/reducers/rigidPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbName() {
	const dispatch = useDispatch();
	const pcbname = useSelector(selectPcbName);

	return (
		<div>
			<Label>
				PCB Name <NameTip />
			</Label>
			<Input
				placeholder="Enter your PCB name"
				type="text"
				name="pcbname"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setPcbName(e.target.value))}
				value={pcbname}
			/>
		</div>
	);
}

function NameTip() {
	return (
		<HelpPopover>
			<p>This is the name of your PCB. It is used for the reference in the order confirmation email.</p>
		</HelpPopover>
	);
}
