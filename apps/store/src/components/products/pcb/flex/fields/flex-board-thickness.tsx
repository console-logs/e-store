import { HelpPopover } from "@/components/products/pcb/help-popover";
import {
	selectBoardThickness,
	selectBoardThicknessOptions,
	selectFlexPcbMemoized,
	setBoardThickness,
	setPcbPrice,
	updateCoverlayThickness,
	updateOuterCuWeight,
} from "@/redux/reducers/flex-pcb-slice";
import { tRPCReactApi } from "@/trpc/react";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export function FlexBoardThickness() {
	const dispatch = useDispatch();
	const boardThicknessOptions = useSelector(selectBoardThicknessOptions);
	const boardThickness = useSelector(selectBoardThickness);
	const flexPcb = useSelector(selectFlexPcbMemoized);
	const result = tRPCReactApi.flexPcb.getPrice.useQuery(flexPcb);

	return (
		<div>
			<Label>
				Flex PCB Thickness (mm) <BoardThicknessTip />
			</Label>
			<Listbox
				value={boardThickness}
				onChange={async value => {
					dispatch(setBoardThickness(value));
					dispatch(updateOuterCuWeight());
					dispatch(updateCoverlayThickness());
					const response = await result.refetch();
					dispatch(setPcbPrice(response.data ?? 0));
				}}>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{boardThickness}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{boardThicknessOptions.map((option, optionIdx) => (
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
											{option.toFixed(2)}
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

function BoardThicknessTip() {
	return (
		<HelpPopover>
			<p>The thickness of finished flex PCB. Board thickness tolerance is ±10%.</p>
		</HelpPopover>
	);
}
