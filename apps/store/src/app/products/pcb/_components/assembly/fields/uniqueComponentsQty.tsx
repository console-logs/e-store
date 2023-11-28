"use client";
import UniqueComponentsTip from "@/app/products/pcb/_components/assembly/tips/uniqueComsTip";
import { useCalculatePcbAssemblyPriceMutation } from "@/redux/api/apiSlice";
import {
	selectNumOfUniqueComponents,
	selectPcbAssemblyMemomized,
	setNumOfUniqueComponents,
	setOneTimeSetupCost,
	setPcbPrice,
} from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function UniqueComponentsQuantity() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const numOfUniqueComponents = useSelector(selectNumOfUniqueComponents);
	const [calculatePcbPrice] = useCalculatePcbAssemblyPriceMutation();

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
					const price = await calculatePcbPrice(pcbAssembly).unwrap();
					dispatch(setPcbPrice(price.assemblyCost));
					dispatch(setOneTimeSetupCost(price.setupCost));
				}}
				value={numOfUniqueComponents === 0 ? "" : numOfUniqueComponents}
			/>
		</div>
	);
}
