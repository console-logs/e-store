"use client";
import StiffnerTip from "@/app/products/pcb/_components/flex/tips/stiffnerTip";
import { useCalculateFlexPcbPriceMutation } from "@/redux/api/apiSlice";
import { setPcbPrice, setStiffner } from "@/redux/reducers/flexPcbSlice";
import { reduxStore, type ReduxState } from "@/redux/store";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Stiffener() {
	const dispatch = useDispatch();
	const stiffnerOptions = useSelector((state: ReduxState) => state.flexPcb.stiffnerOptions);
	const stiffner = useSelector((state: ReduxState) => state.flexPcb.stiffner);
	const [calculatePcbPrice] = useCalculateFlexPcbPriceMutation();

	async function handleChange(values: Array<"Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape">) {
		// selected none again. remove others.
		if (values.length > 1 && values.indexOf("Without") > 0) {
			dispatch(setStiffner(["Without"]));
			const price = await calculatePcbPrice(reduxStore.getState().flexPcb).unwrap();
			dispatch(setPcbPrice(price));
			return;
		}

		// just none (default), keep it.
		if (values.length === 1 && values.includes("Without")) {
			dispatch(setStiffner(["Without"]));
			const price = await calculatePcbPrice(reduxStore.getState().flexPcb).unwrap();
			dispatch(setPcbPrice(price));
			return;
		}

		// remove none others are selected.
		if (values.length > 1 && values.includes("Without")) {
			dispatch(setStiffner(values.filter(value => value !== "Without")));
			const price = await calculatePcbPrice(reduxStore.getState().flexPcb).unwrap();
			dispatch(setPcbPrice(price));
			return;
		}

		// just others, keep them
		if (!values.includes("Without")) {
			dispatch(setStiffner(values));
			const price = await calculatePcbPrice(reduxStore.getState().flexPcb).unwrap();
			dispatch(setPcbPrice(price));
			return;
		}
	}

	return (
		<div>
			<Label>
				Stiffener <StiffnerTip />
			</Label>
			<Listbox
				value={stiffner}
				onChange={handleChange}
				multiple>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate"> {stiffner.map(option => option).join(", ")}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{stiffnerOptions.map((option, optionIdx) => (
								<Listbox.Option
									key={optionIdx}
									className="relative cursor-default select-none py-1.5 pl-10 pr-4 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
