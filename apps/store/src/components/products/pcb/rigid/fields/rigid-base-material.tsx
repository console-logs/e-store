import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectBaseMaterial,
	selectBaseMaterialOptions,
	selectRigidPcbMemoized,
	setBaseMaterial,
	setPcbPrice,
	updateBoardThickness,
	updateCastellatedHoles,
	updateGoldFingers,
	updateLayer,
	updateMaterial,
	updateOuterCuWeight,
	updateSilkscreen,
	updateSoldermask,
	updateSurfaceFinish,
	updateThermalConductivity,
	updateViaCovering,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RigidBaseMaterial() {
	const dispatch = useDispatch();
	const baseMaterialOptions = useSelector(selectBaseMaterialOptions);
	const baseMaterial = useSelector(selectBaseMaterial);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	async function handleChange(value: "FR4" | "Aluminum" | "CopperCore" | "Rogers") {
		dispatch(setBaseMaterial(value));
		dispatch(updateLayer());
		dispatch(updateBoardThickness());
		dispatch(updateSurfaceFinish());
		dispatch(updateSoldermask());
		dispatch(updateSilkscreen());
		dispatch(updateGoldFingers());
		dispatch(updateOuterCuWeight());
		dispatch(updateThermalConductivity());
		dispatch(updateCastellatedHoles());
		dispatch(updateMaterial());
		dispatch(updateViaCovering());
		const response = await result.refetch();
		dispatch(setPcbPrice(response.data ?? 0));
	}

	return (
		<div>
			<Label>
				Base Material <BaseMaterialTip />
			</Label>
			<Listbox
				value={baseMaterial}
				onChange={handleChange}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{baseMaterial}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{baseMaterialOptions.map((option, optionIdx) => (
								<Listbox.Option
									key={optionIdx}
									className={({ active }) =>
										clsx(
											"relative cursor-default select-none py-1.5 pl-2 pr-4",
											active && "bg-gray-100"
										)
									}
									value={option}>
									{({ selected }) => (
										<>
											{option}
											{selected ? (
												<span className="absolute inset-y-0 right-2 flex items-center pl-3">
													<Icons.CheckIcon className="h-4 w-4" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}

function BaseMaterialTip() {
	return (
		<HelpPopover>
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>FR-4 is the most popular substrate material for rigid PCBs.</li>
				<li>
					Flex PCBs utilize a thin, flexible polymer film as the substrate for the circuitry. Flex PCBs reduce
					space consumption, and have lower weight.
				</li>
				<li>
					Aluminum/copper core boards have better heat dissipation and thermal transfer than standard FR-4
					constructions.
				</li>
				<li>
					Rogers PCBs have excellent dielectric properties and minimal resistance. They are generally used in
					high-speed, high-frequency circuitry applications.
				</li>
			</ul>
			<p className="my-2">
				<span className="font-semibold">Note - </span>For Aluminum/Copper core boards, the min drill size is
				1.0mm, and min slot width is 1.6mm.
			</p>
		</HelpPopover>
	);
}
