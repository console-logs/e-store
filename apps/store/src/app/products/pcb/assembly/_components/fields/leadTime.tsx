import HelpPopover from "@/app/products/pcb/_components/common/help";
import { selectTurnaroundTime, selectTurnaroundTimeOptions, setLeadTime } from "@/redux/reducers/pcbAssemblySlice";
import { Listbox, Transition } from "@headlessui/react";
import { Icons } from "@packages/shared/components/Icons";
import { Label } from "@shared/components/ui/label";
import clsx from "clsx";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TurnAroundTime() {
	const dispatch = useDispatch();
	const turnaroundTimeOptions = useSelector(selectTurnaroundTimeOptions);
	const turnaroundTime = useSelector(selectTurnaroundTime);

	return (
		<div>
			<Label>
				Turnaround Time <TurnAroundTimeTip />
			</Label>
			<Listbox
				value={turnaroundTime}
				onChange={async value => {
					dispatch(setLeadTime(value));
				}}>
				<div className="relative">
					<Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
						<span className="block truncate">{turnaroundTime}</span>
						<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{turnaroundTimeOptions.map((option, optionIdx) => (
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

function TurnAroundTimeTip() {
	return (
		<HelpPopover>
			<p>The time it takes to ship your boards.</p>
		</HelpPopover>
	);
}
