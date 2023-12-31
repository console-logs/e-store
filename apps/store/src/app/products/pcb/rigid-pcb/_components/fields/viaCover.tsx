import HelpPopover from "@/app/products/pcb/_components/common/help";
import {
	selectBaseMaterial,
	selectRigidPcbMemoized,
	selectViaCovering,
	selectViaCoveringOptions,
	setPcbPrice,
	setViaCovering,
} from "@/redux/reducers/rigidPcbSlice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViaCovering() {
	const dispatch = useDispatch();
	const viaCoveringOptions = useSelector(selectViaCoveringOptions);
	const viaCovering = useSelector(selectViaCovering);
	const baseMaterial = useSelector(selectBaseMaterial);
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const result = tRPCReactApi.rigidPcb.getPrice.useQuery(rigidPcb);

	const hiddenOptions = ["Aluminum", "CopperCore"];

	return (
		<div hidden={hiddenOptions.includes(baseMaterial)}>
			<Label>
				Via Covering <ViaCoveringTip />
			</Label>
			<Listbox
				value={viaCovering}
				onChange={async value => {
					dispatch(setViaCovering(value));
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{viaCovering}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{viaCoveringOptions.map((option, optionIdx) => (
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

function ViaCoveringTip() {
	return (
		<HelpPopover>
			The production is according to your Gerber files.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>
					<span className="font-semibold">Tented - </span> Vias are covered with soldermask and are not
					processed with HASL or ENIG. Boards with 6+ layers are upgraded to Epoxy Filled & Capped Via for
					free.
				</li>
				<li>
					<span className="font-semibold">Untented -</span>
					Soldermask is removed over the via and its annular ring. The via will be solderable and has the same
					surface finish as regular pads.
				</li>
				<li>
					<span className="font-semibold">Plugged -</span>
					The vias are partially closed with non-conductive media (epoxy/resin) and a layer of solder mask.
					Boards with 6+ layers are upgraded to Epoxy Filled & Capped Via.
				</li>
				<li>
					<span className="font-semibold">Epoxy filled & capped -</span>
					Vias should be at most 0.55 mm in diameter to avoid incomplete filling. Vias violating this size
					will be left unfilled. Vias are filled with epoxy resin and then plated over with copper to create a
					flat, solderable surface. Ideal for via-in-pad, multilayer boards, and thick boards.
				</li>
				<li>
					<span className="font-semibold">Copper paste filled & capped -</span>
					Vias should be at most 0.55 mm in diameter to avoid incomplete filling. Vias violating this size
					will be left unfilled. Vias are filled with high thermal conductivity copper paste and then plated
					over to create a flat, solderable surface. The filling has an excellent heat conductivity of 8 W/m·K
					ideal for via-in-pad and heatsink pads.
				</li>
			</ul>
		</HelpPopover>
	);
}
