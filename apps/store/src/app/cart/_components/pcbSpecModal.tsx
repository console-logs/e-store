"use client";
import { Dialog, Transition } from "@headlessui/react";
import { convertToTitleCase } from "@packages/shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import { Fragment, useState } from "react";

type PcbFabSpecsModalProps = {
	fabSpecs: RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType;
};

type TableRowProps = {
	label: string;
	value: string | number;
	isVisible: boolean;
};

export default function PcbFabSpecsModal(props: PcbFabSpecsModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { fabSpecs } = props;
	const specKeys: Array<string> = Object.keys(fabSpecs);
	return (
		<>
			<div>
				<Button
					variant={"link"}
					className="-ml-4"
					onClick={() => setIsOpen(true)}>
					View Specs
				</Button>
			</div>
			<Transition
				appear
				show={isOpen}
				as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full h-96 max-w-md transform border dark:border-gray-700 bg-white dark:bg-gray-950 overflow-y-auto no-scrollbar rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6">
										Fabrication Specifications
									</Dialog.Title>
									<div className="mt-2">
										<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
											<thead>
												<tr>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
														Specification
													</th>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
														Value
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-300 dark:divide-gray-700">
												{specKeys.map((specName, specIdx) => {
													const titleCaseSpecName = convertToTitleCase(specName);
													return (
														<TableRow
															key={specIdx}
															label={titleCaseSpecName}
															isVisible={
																fabSpecs[specName as keyof typeof fabSpecs] !== null
															}
															value={fabSpecs[specName as keyof typeof fabSpecs]}
														/>
													);
												})}
											</tbody>
										</table>
									</div>

									<div className="mt-4">
										<Button
											type="button"
											onClick={() => setIsOpen(false)}>
											Got it, thanks!
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

function TableRow(props: TableRowProps) {
	const { isVisible, label, value } = props;
	return isVisible ? (
		<tr>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{label}</td>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{value}</td>
		</tr>
	) : null;
}
