"use client";
import { addFlexPcbToCartAction } from "@/actions/pcb";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addCart";
import PcbPriceEstimateAlert from "@/app/products/pcb/_components/common/priceAlert";
import CoverlayColor from "@/app/products/pcb/_components/flex/fields/coverlay";
import CoverlayThickness from "@/app/products/pcb/_components/flex/fields/coverlayThick";
import CopperType from "@/app/products/pcb/_components/flex/fields/cuType";
import CuttingMethod from "@/app/products/pcb/_components/flex/fields/cutting";
import DifferentDesignsInPanel from "@/app/products/pcb/_components/flex/fields/diffDesigns";
import DispatchUnit from "@/app/products/pcb/_components/flex/fields/dispatch";
import EdgeRails from "@/app/products/pcb/_components/flex/fields/edgeRail";
import EdgeRailsSize from "@/app/products/pcb/_components/flex/fields/edgeRailSize";
import EMIShieldingFilm from "@/app/products/pcb/_components/flex/fields/emi";
import UploadDesignFile from "@/app/products/pcb/_components/flex/fields/file";
import DesignFormat from "@/app/products/pcb/_components/flex/fields/format";
import FR4Thickness from "@/app/products/pcb/_components/flex/fields/fr4";
import GoldThickness from "@/app/products/pcb/_components/flex/fields/gold";
import Layer from "@/app/products/pcb/_components/flex/fields/layer";
import LeadTime from "@/app/products/pcb/_components/flex/fields/leadTime";
import BaseMaterial from "@/app/products/pcb/_components/flex/fields/material";
import PcbName from "@/app/products/pcb/_components/flex/fields/name";
import OuterCuWeight from "@/app/products/pcb/_components/flex/fields/outerCu";
import PanelFormat from "@/app/products/pcb/_components/flex/fields/panelFormat";
import PanelQuantity from "@/app/products/pcb/_components/flex/fields/panelQty";
import PanelSize from "@/app/products/pcb/_components/flex/fields/panelSize";
import PcbQuantity from "@/app/products/pcb/_components/flex/fields/pcbQty";
import PolyimideThickness from "@/app/products/pcb/_components/flex/fields/polyimide";
import Silkscreen from "@/app/products/pcb/_components/flex/fields/silkscreen";
import SinglePiecesQuantity from "@/app/products/pcb/_components/flex/fields/singlePieces";
import BoardSize from "@/app/products/pcb/_components/flex/fields/size";
import StainlessSteelThickness from "@/app/products/pcb/_components/flex/fields/ssThick";
import Stiffener from "@/app/products/pcb/_components/flex/fields/stiffener";
import SurfaceFinish from "@/app/products/pcb/_components/flex/fields/surface";
import BoardThickness from "@/app/products/pcb/_components/flex/fields/thickness";
import ThreeMTapeThickness from "@/app/products/pcb/_components/flex/fields/threeM";
import BoardOutlineTolerance from "@/app/products/pcb/_components/flex/fields/tolerance";
import FlexPcbPriceSummary from "@/app/products/pcb/_components/flex/summary";
import { selectFlexPcbMemoized } from "@/redux/reducers/flexPcbSlice";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function FlexPcbFabrication() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const flexPcb: FlexPcbFabSpecsType = useSelector(selectFlexPcbMemoized);

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			await addFlexPcbToCartAction(flexPcb);
			toast({
				variant: "default",
				title: "Flex PCB added to cart",
				description: "We've successfully added your pcb to cart!",
				duration: 4000,
			});
		});
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1 className=" text-3xl font-bold tracking-tight">Flex Pcb Fabrication</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-8 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<PcbName />
						<BaseMaterial />
						<Layer />
						<BoardSize />
						<DifferentDesignsInPanel />
						<DesignFormat />
						<PanelQuantity />
						<PcbQuantity />
						<PanelFormat />
						<PanelSize />
						<SinglePiecesQuantity />
						<BoardThickness />
						<CoverlayColor />
						<Silkscreen />
						<CopperType />
						<SurfaceFinish />
						<GoldThickness />
						<OuterCuWeight />
						<CoverlayThickness />
						<Stiffener />
						<PolyimideThickness />
						<FR4Thickness />
						<StainlessSteelThickness />
						<ThreeMTapeThickness />
						<EMIShieldingFilm />
						<EdgeRails />
						<EdgeRailsSize />
						<BoardOutlineTolerance />
						<CuttingMethod />
						<LeadTime />
						<DispatchUnit />
						<UploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<FlexPcbPriceSummary />
						<PcbPriceEstimateAlert />
						<AddPcbToCartBtn isLoading={isLoading} />
					</div>
				</div>
			</div>
		</form>
	);
}
