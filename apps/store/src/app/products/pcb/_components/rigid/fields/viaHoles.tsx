import ViaHolesTip from "@/app/products/pcb/_components/rigid/tips/viaHolesTip";
import { useCalculateRigidPcbPriceMutation } from "@/redux/api/apiSlice";
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
	const [calculatePcbPrice] = useCalculateRigidPcbPriceMutation();

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
					const price = await calculatePcbPrice(rigidPcb).unwrap();
					dispatch(setPcbPrice(price));
				}}
				value={viaHoles}
			/>
		</div>
	);
}
