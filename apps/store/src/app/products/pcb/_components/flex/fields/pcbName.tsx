import NameTip from "@/app/products/pcb/_components/flex/tips/nameTip";
import { selectPcbName, setPcbName } from "@/redux/reducers/flexPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbName() {
	const dispatch = useDispatch();
	const pcbname = useSelector(selectPcbName);

	return (
		<div>
			<Label>
				Flex PCB Name <NameTip />
			</Label>
			<Input
				placeholder="Enter your Flex Pcb name"
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
