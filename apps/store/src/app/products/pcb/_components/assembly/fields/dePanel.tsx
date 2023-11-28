"use client";
import DepanelTip from "@/app/products/pcb/_components/assembly/tips/depanelTip";
import { useCalculatePcbAssemblyPriceMutation } from "@/redux/api/apiSlice";
import {
	selectDePanel,
	selectDePanelOptions,
	selectPcbAssemblyMemomized,
	setDePanel,
	setOneTimeSetupCost,
	setPcbPrice,
} from "@/redux/reducers/pcbAssemblySlice";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Depanel() {
	const dispatch = useDispatch();
	const pcbAssembly = useSelector(selectPcbAssemblyMemomized);
	const depanelOptions = useSelector(selectDePanelOptions);
	const depanel = useSelector(selectDePanel);
	const [calculatePcbPrice] = useCalculatePcbAssemblyPriceMutation();

	return (
		<div>
			<Label>
				De-panel
				<DepanelTip />
			</Label>
			<Listbox
				value={depanel}
				onChange={async value => {
					dispatch(setDePanel(value));
					const price = await calculatePcbPrice(pcbAssembly).unwrap();
					dispatch(setPcbPrice(price.assemblyCost));
					dispatch(setOneTimeSetupCost(price.setupCost));
				}}>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{depanel}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{depanelOptions.map((option, optionIdx) => (
								<Listbox.Option
									key={optionIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-1.5 pl-2 pr-4 ${
											active && "bg-gray-100"
										}`
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
