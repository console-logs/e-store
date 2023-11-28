"use client";
import GoldThicknessTip from "@/app/products/pcb/_components/flex/tips/goldThicknessTip";
import { useCalculateFlexPcbPriceMutation } from "@/redux/api/apiSlice";
import {
	selectFlexPcb,
	selectGoldThickness,
	selectGoldThicknessOptions,
	selectSurfaceFinish,
	setGoldThickness,
	setPcbPrice,
} from "@/redux/reducers/flexPcbSlice";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GoldThickness() {
	const dispatch = useDispatch();
	const flexPcb = useSelector(selectFlexPcb);
	const goldThicknessOptions = useSelector(selectGoldThicknessOptions);
	const goldThickness = useSelector(selectGoldThickness);
	const surfaceFinish = useSelector(selectSurfaceFinish);
	const [calculatePcbPrice] = useCalculateFlexPcbPriceMutation();

	return (
		<div hidden={surfaceFinish !== "ENIG"}>
			<Label>
				Gold Thickness <GoldThicknessTip />
			</Label>
			<Listbox
				value={goldThickness}
				onChange={async value => {
					dispatch(setGoldThickness(value));
					const price = await calculatePcbPrice(flexPcb).unwrap();
					dispatch(setPcbPrice(price));
				}}>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{goldThickness}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{goldThicknessOptions.map((option, optionIdx) => (
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
