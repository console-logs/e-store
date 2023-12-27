"use client";
import { addItemToCartAction } from "@/actions";
import { AddPcbToCartButton } from "@/components/products/pcb/add-pcb-to-cart-button";
import { AssemblyQuantity } from "@/components/products/pcb/assembly/fields/assembly-quantity";
import { AssemblySides } from "@/components/products/pcb/assembly/fields/assembly-sides";
import { AssemblyBgaComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-bga-quantity";
import { AssemblyBoardType } from "@/components/products/pcb/assembly/fields/assembly-board-type";
import { AssemblyComponentSourcing } from "@/components/products/pcb/assembly/fields/assembly-components-sourcing";
import { AssemblyConformalCoating } from "@/components/products/pcb/assembly/fields/assembly-conformal-coat";
import { AssemblyDepanel } from "@/components/products/pcb/assembly/fields/assembly-depanel";
import { AssemblyFunctionalTest } from "@/components/products/pcb/assembly/fields/assembly-functional-test";
import { AssemblyPcbName } from "@/components/products/pcb/assembly/fields/assembly-pcb-name";
import { AssemblyPcbsPerPanel } from "@/components/products/pcb/assembly/fields/assembly-pcbs-per-panel";
import { AssemblySmdComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-smd-comps-quantity";
import { AssemblyTemperatureAndHumiditySensitivity } from "@/components/products/pcb/assembly/fields/assembly-temp-and-humidity-sensitivity";
import { AssemblyThroughHoleComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-through-hole-comps-quantity";
import { AssemblyTurnAroundTime } from "@/components/products/pcb/assembly/fields/assembly-turn-around-time";
import { AssemblyUniqueComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-unique-comps-quantity";
import { AssemblyUploadDesignFile } from "@/components/products/pcb/assembly/fields/assembly-upload-design-file";
import { AssemblyPcbPriceSummary } from "@/components/products/pcb/assembly/assembly-pcb-price-summary";
import { PcbPriceEstimateAlert } from "@/components/products/pcb/pcb-price-est-alert";
import { selectPcbAssemblyMemomized } from "@/redux/reducers/pcb-assembly-slice";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function PcbAssembly() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const pcbAssembly: PcbAssemblyFabSpecsType = useSelector(selectPcbAssemblyMemomized);
	const isFileUploaded = pcbAssembly.UploadedFileUrl ? true : false;

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			if (!isFileUploaded) {
				toast({
					variant: "destructive",
					title: "Please upload design file",
					description: "Click the upload button to upload your design file and then continue.",
					duration: 5000,
				});
			} else {
				// handle add to cart
				await addItemToCartAction(pcbAssembly);
				toast({
					variant: "default",
					title: "PCB Assembly added to cart",
					description: "We've successfully added your assembly to cart!",
					duration: 4000,
				});
			}
		});
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1 className=" text-3xl font-bold tracking-tight">PCB Assembly</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-8 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<AssemblyPcbName />
						<AssemblyBoardType />
						<AssemblyPcbsPerPanel />
						<AssemblyQuantity />
						<AssemblySides />
						<AssemblyUniqueComponentsQuantity />
						<AssemblySmdComponentsQuantity />
						<AssemblyBgaComponentsQuantity />
						<AssemblyThroughHoleComponentsQuantity />
						<AssemblyTemperatureAndHumiditySensitivity />
						<AssemblyDepanel />
						<AssemblyConformalCoating />
						<AssemblyFunctionalTest />
						<AssemblyComponentSourcing />
						<AssemblyTurnAroundTime />
						<AssemblyUploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<AssemblyPcbPriceSummary />
						<PcbPriceEstimateAlert />
						<AddPcbToCartButton isLoading={isLoading} />
					</div>
				</div>
			</div>
		</form>
	);
}
