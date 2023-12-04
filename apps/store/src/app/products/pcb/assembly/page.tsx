"use client";
import { addItemToCartAction } from "@/actions";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addCart";
import PcbPriceEstimateAlert from "@/app/products/pcb/_components/common/priceAlert";
import BgaComponentsQuantity from "@/app/products/pcb/assembly/_components/fields/bga";
import UploadBomFile from "@/app/products/pcb/assembly/_components/fields/bom";
import ConformalCoating from "@/app/products/pcb/assembly/_components/fields/coat";
import Depanel from "@/app/products/pcb/assembly/_components/fields/depanel";
import FunctionalTest from "@/app/products/pcb/assembly/_components/fields/funcTest";
import UploadGerberFile from "@/app/products/pcb/assembly/_components/fields/gerber";
import TurnAroundTime from "@/app/products/pcb/assembly/_components/fields/leadTime";
import PcbName from "@/app/products/pcb/assembly/_components/fields/name";
import PcbsPerPanel from "@/app/products/pcb/assembly/_components/fields/pcbsPanel";
import UploadPickAndPlaceFile from "@/app/products/pcb/assembly/_components/fields/pickPlace";
import AssemblyQuantity from "@/app/products/pcb/assembly/_components/fields/quantity";
import AssemblySides from "@/app/products/pcb/assembly/_components/fields/sides";
import SmdComponentsQuantity from "@/app/products/pcb/assembly/_components/fields/smd";
import ComponentSourcing from "@/app/products/pcb/assembly/_components/fields/sourcing";
import TemperatureAndHumiditySensitivity from "@/app/products/pcb/assembly/_components/fields/temperature";
import ThroughHoleComponentsQuantity from "@/app/products/pcb/assembly/_components/fields/throughHole";
import BoardType from "@/app/products/pcb/assembly/_components/fields/type";
import UniqueComponentsQuantity from "@/app/products/pcb/assembly/_components/fields/uniqueComp";
import PcbAssemblyPriceSummary from "@/app/products/pcb/assembly/_components/priceSum";
import { selectPcbAssemblyMemomized } from "@/redux/reducers/pcbAssemblySlice";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function PcbAssembly() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const pcbAssembly: PcbAssemblyFabSpecsType = useSelector(selectPcbAssemblyMemomized);

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			await addItemToCartAction(pcbAssembly);
			toast({
				variant: "default",
				title: "PCB Assembly Project added to cart",
				description: "We've successfully added your assembly project to cart!",
				duration: 4000,
			});
		});
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1 className=" text-3xl font-bold tracking-tight">PCB Assembly</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-8 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<PcbName />
						<BoardType />
						<PcbsPerPanel />
						<AssemblyQuantity />
						<AssemblySides />
						<UniqueComponentsQuantity />
						<SmdComponentsQuantity />
						<BgaComponentsQuantity />
						<ThroughHoleComponentsQuantity />
						<TemperatureAndHumiditySensitivity />
						<Depanel />
						<ConformalCoating />
						<FunctionalTest />
						<ComponentSourcing />
						<TurnAroundTime />
						<UploadBomFile />
						<UploadGerberFile />
						<UploadPickAndPlaceFile />
					</div>
					<div className="mt-8 space-y-4">
						<PcbAssemblyPriceSummary />
						<PcbPriceEstimateAlert />
						<AddPcbToCartBtn isLoading={isLoading} />
					</div>
				</div>
			</div>
		</form>
	);
}
