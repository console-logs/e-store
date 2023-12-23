"use client";
import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectDesignFormat,
	selectFlexPcbMemoized,
	selectPcbQty,
	selectPcbQtyOptions,
	setPcbPrice,
	setPcbQty,
} from "@/redux/reducers/flexPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export function FlexPcbQuantity() {
	const dispatch = useDispatch();
	const pcbQtyOptions = useSelector(selectPcbQtyOptions);
	const pcbQty = useSelector(selectPcbQty);
	const designFormat = useSelector(selectDesignFormat);
	const flexPcb = useSelector(selectFlexPcbMemoized);
	const result = tRPCReactApi.flexPcb.getPrice.useQuery(flexPcb);

	return (
		<div
			className="w-full"
			hidden={designFormat !== "Single PCB"}>
			<Label>
				PCB Quantity <PcbQtyTip />
			</Label>
			<Listbox
				value={pcbQty}
				onChange={async value => {
					dispatch(setPcbQty(value));
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{pcbQty}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{pcbQtyOptions.map((option, optionIdx) => (
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

function PcbQtyTip() {
	return (
		<HelpPopover>
			<p>The quantity of PCBs you need.</p>
		</HelpPopover>
	);
}
