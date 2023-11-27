"use client";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import HelpPopover from "@store/src/components/pcb/shared/helpPopover";
import { useCalculateFlexPcbPriceMutation } from "@/redux/api/apiSlice";
import { setPcbPrice, setStiffner } from "@/redux/reducers/flexPcbSlice";
import { type ReduxState, reduxStore } from "@/redux/store";
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
				Stiffener{" "}
				<HelpPopover>
					Bare FPCs are very light and flexible. When thickness or strength is required in parts of an FPC for
					installation or assembly, a rigid layer can be attached to the board&apos;s surface. This rigid
					material is called a stiffener.
					<ul className="list-disc px-3 space-y-2 my-1">
						<li>1. We provide polyimide, FR4, stainless steel, and 3M tape stiffeners.</li>
						<li>2. Stiffeners of different thicknesses and materials can be used on the same FPC.</li>
						<li>
							3. &quot;Stiffener thickness&quot; refers to the stiffener alone. The total thickness is
							this value added to the FPC&apos;s thickness.
						</li>
						<li>
							4. A drawing or extra Gerber layer must be provided alongside other design files to show the
							location, material and thickness of stiffeners. See the diagram for the expected format. For
							gold fingers, please make sure to add stiffeners if needed so the connector has enough
							strength to mate with its receptacle.
						</li>
					</ul>
				</HelpPopover>
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
