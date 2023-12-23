import { HelpPopover } from "@/components/products/pcb/help-popover";
import { selectName, setName } from "@/redux/reducers/flexPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function FlexPcbName() {
	const dispatch = useDispatch();
	const name = useSelector(selectName);

	return (
		<div>
			<Label>
				PCB Name <NameTip />
			</Label>
			<Input
				placeholder="Enter your Flex Pcb name"
				type="text"
				name="pcbname"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setName(e.target.value))}
				value={name}
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
