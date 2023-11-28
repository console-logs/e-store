"use client";
import { addPcbAssemblyToCartAction } from "@/actions/pcb";
import AssemblyQuantity from "@/app/products/pcb/_components/assembly/fields/assemblyQty";
import AssemblySides from "@/app/products/pcb/_components/assembly/fields/assemblySides";
import BgaComponentsQuantity from "@/app/products/pcb/_components/assembly/fields/bgaComponentsQty";
import BoardType from "@/app/products/pcb/_components/assembly/fields/boardType";
import ComponentSourcing from "@/app/products/pcb/_components/assembly/fields/componentSourcing";
import ConformalCoating from "@/app/products/pcb/_components/assembly/fields/conformalCoating";
import Depanel from "@/app/products/pcb/_components/assembly/fields/dePanel";
import FunctionalTest from "@/app/products/pcb/_components/assembly/fields/functionalTest";
import PcbsPerPanel from "@/app/products/pcb/_components/assembly/fields/pcbsPerPanel";
import ProjectName from "@/app/products/pcb/_components/assembly/fields/projectName";
import SmdComponentsQuantity from "@/app/products/pcb/_components/assembly/fields/smdComponentsQty";
import TemperatureAndHumiditySensitivity from "@/app/products/pcb/_components/assembly/fields/temperatureSensitivity";
import ThroughHoleComponentsQuantity from "@/app/products/pcb/_components/assembly/fields/throughHoleComponentsQty";
import TurnAroundTime from "@/app/products/pcb/_components/assembly/fields/turnAroundTime";
import UniqueComponentsQuantity from "@/app/products/pcb/_components/assembly/fields/uniqueComponentsQty";
import UploadBomFile from "@/app/products/pcb/_components/assembly/fields/uploadBom";
import UploadGerberFile from "@/app/products/pcb/_components/assembly/fields/uploadGerber";
import UploadPickAndPlaceFile from "@/app/products/pcb/_components/assembly/fields/uploadPickAndPlace";
import PcbAssemblyPriceSummary from "@/app/products/pcb/_components/assembly/priceSummary";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addToCart";
import PcbPriceEstimateAlert from "@/app/products/pcb/_components/common/priceAlert";
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
			await addPcbAssemblyToCartAction(pcbAssembly);
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
						<ProjectName />
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
