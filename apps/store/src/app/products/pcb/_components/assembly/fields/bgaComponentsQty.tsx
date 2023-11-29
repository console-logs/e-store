import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";
import { useCalculatePcbAssemblyPriceMutation } from "@/redux/api/apiSlice";
import {
	selectNumOfBgaComponents,
	selectPcbAssemblyMemomized,
	setNumOfBgaComponents,
	setOneTimeSetupCost,
	setPcbPrice,
} from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function BgaComponentsQuantity() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const numOfBgaComponents = useSelector(selectNumOfBgaComponents);
	const [calculatePcbPrice] = useCalculatePcbAssemblyPriceMutation();

	return (
		<div>
			<Label>
				Number of BGA / QFP components
				<UniqueBGATip />
			</Label>
			<Input
				placeholder="Enter BGA/QFP components quantity"
				type="text"
				name="bgaQfpComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				value={numOfBgaComponents}
				onChange={async e => {
					dispatch(setNumOfBgaComponents(Number(e.target.value)));
					const price = await calculatePcbPrice(pcbAssembly).unwrap();
					dispatch(setPcbPrice(price.assemblyCost));
					dispatch(setOneTimeSetupCost(price.setupCost));
				}}
			/>
		</div>
	);
}

function UniqueBGATip() {
	return (
		<HelpPopover>
			<p>How many number of BGA/QFP/QFN components are present on the board.</p>
		</HelpPopover>
	);
}
