import HelpPopover from "@/app/products/pcb/_components/common/help";
import {
	selectDesignFormat,
	selectDesignFormatOptions,
	selectRigidPcbMemoized,
	setDesignFormat,
	setPcbPrice,
	updateChamferedGoldFingers,
	updateDifferentDesignsInPanel,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DesignFormat() {
	const dispatch = useDispatch();
	const designFormatOptions = useSelector(selectDesignFormatOptions);
	const designFormat = useSelector(selectDesignFormat);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	return (
		<div>
			<Label>
				Design Format <DesignFormatTip />
			</Label>
			<Listbox
				value={designFormat}
				onChange={async value => {
					dispatch(setDesignFormat(value));
					dispatch(updateDifferentDesignsInPanel());
					dispatch(updateChamferedGoldFingers());
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{designFormat}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{designFormatOptions.map((option, optionIdx) => (
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

function DesignFormatTip() {
	return (
		<HelpPopover>
			This is the format of the design file supplied by you.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>
					<span className="font-semibold">Single PCB - </span> The design file is a single PCB.
				</li>
				<li>
					<span className="font-semibold">Panel by Customer -</span>
					You construct the PCB panel yourself and provide us the panelized data for PCB production.
				</li>
				<li>
					<span className="font-semibold">Panel by Manufacturer -</span>
					We construct your panel with v-cut according to your need.
				</li>
			</ul>
			<p className="my-2">
				<span className="font-semibold">Note - </span>We only provide panelizing service:
				<ul className="my-1 list-disc space-y-2 px-3">
					<li>If PCBs are Regular shapes like rectangle and circle</li>
					<li>
						If number of different designs in a panel is more than one, then you need to panalize it
						yourself.
					</li>
				</ul>
			</p>
		</HelpPopover>
	);
}
