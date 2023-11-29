import HelpPopover from "@/app/products/pcb/_components/common/help";
import { useCalculateRigidPcbPriceMutation } from "@/redux/api/apiSlice";
import {
	selectDesignFormat,
	selectEdgeRailSize,
	selectEdgeRailSizeOptions,
	selectEdgeRails,
	selectRigidPcbMemoized,
	setEdgeRailSize,
	setPcbPrice,
	updatePanelSize,
} from "@/redux/reducers/rigidPcbSlice";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EdgeRailsSize() {
	const dispatch = useDispatch();
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const edgeRailSize = useSelector(selectEdgeRailSize);
	const designFormat = useSelector(selectDesignFormat);
	const edgeRails = useSelector(selectEdgeRails);
	const edgeRailSizeOptions = useSelector(selectEdgeRailSizeOptions);
	const [calculatePcbPrice] = useCalculateRigidPcbPriceMutation();

	const hiddenStatus = designFormat === "Single PCB" || designFormat === "Panel by Customer" || edgeRails === "No";

	return (
		<div hidden={hiddenStatus}>
			<Label>
				Edge Rails Size (mm) <EdgeRailSizeTip />
			</Label>
			<Listbox
				value={edgeRailSize}
				onChange={async value => {
					dispatch(setEdgeRailSize(value));
					dispatch(updatePanelSize());
					const price = await calculatePcbPrice(rigidPcb).unwrap();
					dispatch(setPcbPrice(price));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{edgeRailSize}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{edgeRailSizeOptions.map((option, optionIdx) => (
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

function EdgeRailSizeTip() {
	return (
		<HelpPopover>
			<p>Edge rails that are added for increasing component-to-board-edge clearances are to be at least 5mm.</p>
		</HelpPopover>
	);
}
