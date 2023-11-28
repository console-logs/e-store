"use client";
import { addFlexPcbToCartAction } from "@/actions/pcb";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addToCart";
import PcbPriceEstimateAlert from "@/app/products/pcb/_components/common/priceAlert";
import BaseMaterial from "@/app/products/pcb/_components/flex/fields/baseMaterial";
import BoardOutlineTolerance from "@/app/products/pcb/_components/flex/fields/boardOutlineTolerance";
import BoardSize from "@/app/products/pcb/_components/flex/fields/boardSize";
import BoardThickness from "@/app/products/pcb/_components/flex/fields/boardThickness";
import CopperType from "@/app/products/pcb/_components/flex/fields/copperType";
import CoverlayColor from "@/app/products/pcb/_components/flex/fields/coverlay-color";
import CoverlayThickness from "@/app/products/pcb/_components/flex/fields/coverlayThickness";
import CuttingMethod from "@/app/products/pcb/_components/flex/fields/cuttingMethod";
import DesignFormat from "@/app/products/pcb/_components/flex/fields/designFormat";
import DifferentDesignsInPanel from "@/app/products/pcb/_components/flex/fields/differentDesigns";
import DispatchUnit from "@/app/products/pcb/_components/flex/fields/dispatchUnit";
import EdgeRails from "@/app/products/pcb/_components/flex/fields/edgeRails";
import EdgeRailsSize from "@/app/products/pcb/_components/flex/fields/edgerailSize";
import EMIShieldingFilm from "@/app/products/pcb/_components/flex/fields/emiShieldingFilm";
import FR4Thickness from "@/app/products/pcb/_components/flex/fields/fr4Thickness";
import GoldThickness from "@/app/products/pcb/_components/flex/fields/goldThickness";
import Layer from "@/app/products/pcb/_components/flex/fields/layer";
import LeadTime from "@/app/products/pcb/_components/flex/fields/leadTime";
import OuterCuWeight from "@/app/products/pcb/_components/flex/fields/outerCuWeight";
import PanelFormat from "@/app/products/pcb/_components/flex/fields/panelFormat";
import PanelQuantity from "@/app/products/pcb/_components/flex/fields/panelQty";
import PanelSize from "@/app/products/pcb/_components/flex/fields/panelSize";
import PcbName from "@/app/products/pcb/_components/flex/fields/pcbName";
import PolyimideThickness from "@/app/products/pcb/_components/flex/fields/polyimideThickness";
import Silkscreen from "@/app/products/pcb/_components/flex/fields/silkscreen";
import SinglePiecesQuantity from "@/app/products/pcb/_components/flex/fields/singlePiecesQty";
import StainlessSteelThickness from "@/app/products/pcb/_components/flex/fields/stainlessSteelThickness";
import Stiffener from "@/app/products/pcb/_components/flex/fields/stiffener";
import SurfaceFinish from "@/app/products/pcb/_components/flex/fields/surfaceFinish";
import ThreeMTapeThickness from "@/app/products/pcb/_components/flex/fields/threeMTapeThickness";
import UploadDesignFile from "@/app/products/pcb/_components/flex/fields/uploadDesignFile";
import FlexPcbPriceSummary from "@/app/products/pcb/_components/flex/priceSummary";
import PcbQuantity from "@/app/products/pcb/_components/flex/fields/pcbQty";
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
