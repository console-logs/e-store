import HelpPopover from "@/components/products/pcb/help-popover";
import {
	selectBaseMaterial,
	selectRigidPcbMemoized,
	selectViaHoles,
	setPcbPrice,
	setViaHoles,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ViaHoles() {
	const dispatch = useDispatch();
	const viaHoles = useSelector(selectViaHoles);
	const baseMaterial = useSelector(selectBaseMaterial);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

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
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
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
