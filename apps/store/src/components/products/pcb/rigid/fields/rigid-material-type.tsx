import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectBaseMaterial,
	selectLayer,
	selectMaterial,
	selectMaterialOptions,
	selectRigidPcbMemoized,
	setMaterial,
	setPcbPrice,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RigidMaterialType() {
	const dispatch = useDispatch();
	const materialOptions = useSelector(selectMaterialOptions);
	const baseMaterial = useSelector(selectBaseMaterial);
	const material = useSelector(selectMaterial);
	const layer = useSelector(selectLayer);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	const hiddenStatus = !(baseMaterial === "FR4" && layer >= 4) && baseMaterial !== "Rogers";

	return (
		<div hidden={hiddenStatus}>
			<Label>
				Material Type <MaterialTypeTip />
			</Label>
			<Listbox
				value={material}
				onChange={async value => {
					dispatch(setMaterial(value));
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{material}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{materialOptions.map((option, optionIdx) => (
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

function MaterialTypeTip() {
	return (
		<HelpPopover>
			The glass transition temperature(Tg) of base material.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>
					FR-4 is a common material for PCBs. Typically, we use FR4-Standard Tg 130-140 for PCB production.
				</li>
				<li>
					FR-4 Tg 155 has better flame retardance than standard FR-4, and it&apos;s appropriate for lead-free
					assembly. We recommend choosing TG155 for the following conditions.
					<ul className="ml-5 list-decimal space-y-1">
						<li>4&6 Layer PCB boards.</li>
						<li>PCBs use in automotive, military or aerospace applications.</li>
						<li>High-precision PCBs with 4mil trace width/spacing, 15mil hole to hole clearance, BGAs.</li>
					</ul>
				</li>
			</ul>
		</HelpPopover>
	);
}
