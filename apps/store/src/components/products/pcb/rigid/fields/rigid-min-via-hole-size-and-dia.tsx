import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectLayer,
	selectMinViaHoleSizeAndDiameter,
	selectMinViaHoleSizeAndDiameterOptions,
	selectRigidPcbMemoized,
	setMinViaHoleSizeAndDiameter,
	setPcbPrice,
} from "@/redux/reducers/rigid-pcb-slice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RigidMinimumHoleSizeAndDiameter() {
	const dispatch = useDispatch();
	const minHoleSizeAndDiameterOptions = useSelector(selectMinViaHoleSizeAndDiameterOptions);
	const minHoleSizeAndDiameter = useSelector(selectMinViaHoleSizeAndDiameter);
	const layer = useSelector(selectLayer);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	return (
		<div hidden={layer < 4}>
			<Label>
				Minimum Hole Size / Diameter <MinHoleSizeTip />
			</Label>
			<Listbox
				value={minHoleSizeAndDiameter}
				onChange={async value => {
					dispatch(setMinViaHoleSizeAndDiameter(value));
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{minHoleSizeAndDiameter}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{minHoleSizeAndDiameterOptions.map((option, optionIdx) => (
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

function MinHoleSizeTip() {
	return (
		<HelpPopover>
			<p>
				The minimum via hole size and via diameter. Via diameter should be 0.1mm(0.15mm preferred) larger than
				Via hole size. e.g. when the via hole size is 0.2mm, the via diameter should be 0.3mm or 0.35mm.
			</p>
			<p>
				<span>Note: </span>Additional charges will apply when the via hole&lt;0.3mm and the via
				diameter≤0.4mm.No additional charge when the via hole&lt;0.3mm, and via diameter&gt;0.4mm. e.g.
				additional charge is needed for 0.2mm hole/0.4mm diameter, while 0.2mm hole/0.45mm diameter is free.
			</p>
		</HelpPopover>
	);
}
