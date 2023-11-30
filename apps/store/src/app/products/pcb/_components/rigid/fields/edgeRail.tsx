import HelpPopover from "@/app/products/pcb/_components/common/help";
import { tRPCApi } from "@/trpc/server";
import {
	selectDesignFormat,
	selectEdgeRails,
	selectEdgeRailsOptions,
	selectRigidPcbMemoized,
	setEdgeRails,
	setPcbPrice,
	updatePanelSize,
} from "@/redux/reducers/rigidPcbSlice";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EdgeRails() {
	const dispatch = useDispatch();
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const edgeRailOptions = useSelector(selectEdgeRailsOptions);
	const edgeRails = useSelector(selectEdgeRails);
	const designFormat = useSelector(selectDesignFormat);

	return (
		<div hidden={designFormat === "Single PCB" || designFormat === "Panel by Customer"}>
			<Label>
				Edge Rails <EdgeRailsTip />
			</Label>
			<Listbox
				value={edgeRails}
				onChange={async value => {
					dispatch(setEdgeRails(value));
					dispatch(updatePanelSize());
					const price = await tRPCApi.rigidPcb.getPrice.query(rigidPcb);
					dispatch(setPcbPrice(price));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{edgeRails}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{edgeRailOptions.map((option, optionIdx) => (
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

function EdgeRailsTip() {
	return (
		<HelpPopover>
			<p>
				Edge rails are added for increasing component-to-board-edge clearances. Edge rails that are added for
				increasing component-to-board-edge clearances are to be at least 5mm.
			</p>
		</HelpPopover>
	);
}
