import HelpPopover from "@/app/products/pcb/_components/common/help";
import { tRPCApi } from "@/trpc/server";
import {
	selectBaseMaterial,
	selectRigidPcbMemoized,
	selectViaHoles,
	setPcbPrice,
	setViaHoles,
} from "@/redux/reducers/rigidPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ViaHoles() {
	const dispatch = useDispatch();
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const viaHoles = useSelector(selectViaHoles);
	const baseMaterial = useSelector(selectBaseMaterial);

	return (
		<div hidden={baseMaterial === "Aluminum" || baseMaterial === "CopperCore"}>
			<Label>
				Via Holes <ViaHolesTip />
			</Label>
			<Input
				placeholder="Enter number of Via Holes"
				type="number"
				name="ViaHoles"
				autoComplete="off"
				className="w-full"
				required
				onChange={async e => {
					dispatch(setViaHoles(Number(e.target.value)));
					const price = await tRPCApi.rigidPcb.getPrice.query(rigidPcb);
					dispatch(setPcbPrice(price));
				}}
				value={viaHoles}
			/>
		</div>
	);
}

function ViaHolesTip() {
	return (
		<HelpPopover>
			<p>The number of via holes in the PCB.</p>
		</HelpPopover>
	);
}
