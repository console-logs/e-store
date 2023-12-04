"use client";
import { addItemToCartAction } from "@/actions";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addCart";
import PcbPriceEstimateAlert from "@/app/products/pcb/_components/common/priceAlert";
import BreakdownVoltage from "@/app/products/pcb/rigid-pcb/_components/fields/breakdown";
import CastellatedHolesEdges from "@/app/products/pcb/rigid-pcb/_components/fields/castEdge";
import CastellatedHoles from "@/app/products/pcb/rigid-pcb/_components/fields/castHole";
import ChamferedGoldFingers from "@/app/products/pcb/rigid-pcb/_components/fields/chamfGold";
import CopperStructure from "@/app/products/pcb/rigid-pcb/_components/fields/cuStruct";
import DesignFormat from "@/app/products/pcb/rigid-pcb/_components/fields/design";
import DifferentDesignsInPanel from "@/app/products/pcb/rigid-pcb/_components/fields/diffDesign";
import DispatchUnit from "@/app/products/pcb/rigid-pcb/_components/fields/dispatch";
import EdgeRails from "@/app/products/pcb/rigid-pcb/_components/fields/edgeRail";
import EdgeRailsSize from "@/app/products/pcb/rigid-pcb/_components/fields/edgeRailSize";
import UploadDesignFile from "@/app/products/pcb/rigid-pcb/_components/fields/file";
import GoldFingers from "@/app/products/pcb/rigid-pcb/_components/fields/gold";
import GoldThickness from "@/app/products/pcb/rigid-pcb/_components/fields/goldThick";
import ImpedenceControl from "@/app/products/pcb/rigid-pcb/_components/fields/impedence";
import InnerCuWeight from "@/app/products/pcb/rigid-pcb/_components/fields/innerCu";
import Layer from "@/app/products/pcb/rigid-pcb/_components/fields/layer";
import LeadTime from "@/app/products/pcb/rigid-pcb/_components/fields/leadTime";
import BaseMaterial from "@/app/products/pcb/rigid-pcb/_components/fields/material";
import MaterialType from "@/app/products/pcb/rigid-pcb/_components/fields/materialType";
import MinimumHoleSizeAndDiameter from "@/app/products/pcb/rigid-pcb/_components/fields/minViaHSize";
import PcbName from "@/app/products/pcb/rigid-pcb/_components/fields/name";
import OuterCuWeight from "@/app/products/pcb/rigid-pcb/_components/fields/outerCu";
import BoardOutlineTolerance from "@/app/products/pcb/rigid-pcb/_components/fields/outline";
import PanelFormat from "@/app/products/pcb/rigid-pcb/_components/fields/panelFormat";
import PanelQuantity from "@/app/products/pcb/rigid-pcb/_components/fields/panelQty";
import PanelSize from "@/app/products/pcb/rigid-pcb/_components/fields/panelSize";
import PcbQuantity from "@/app/products/pcb/rigid-pcb/_components/fields/quantity";
import Silkscreen from "@/app/products/pcb/rigid-pcb/_components/fields/silkscreen";
import SinglePiecesQuantity from "@/app/products/pcb/rigid-pcb/_components/fields/singlePieces";
import BoardSize from "@/app/products/pcb/rigid-pcb/_components/fields/size";
import Soldermask from "@/app/products/pcb/rigid-pcb/_components/fields/soldermask";
import SurfaceFinish from "@/app/products/pcb/rigid-pcb/_components/fields/surface";
import ThermalConductivity from "@/app/products/pcb/rigid-pcb/_components/fields/thermal";
import BoardThickness from "@/app/products/pcb/rigid-pcb/_components/fields/thickness";
import ViaCovering from "@/app/products/pcb/rigid-pcb/_components/fields/viaCover";
import ViaHoles from "@/app/products/pcb/rigid-pcb/_components/fields/viaHoles";
import RigidPcbPriceSummary from "@/app/products/pcb/rigid-pcb/_components/priceSum";
import { selectRigidPcbMemoized } from "@/redux/reducers/rigidPcbSlice";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function RigidPcbFabrication() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const rigidPcb: RigidPcbFabSpecsType = useSelector(selectRigidPcbMemoized);

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			await addItemToCartAction(rigidPcb);
			toast({
				variant: "default",
				title: "Rigid PCB added to cart",
				description: "We've successfully added your pcb to cart!",
				duration: 4000,
			});
		});
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1 className=" text-3xl font-bold tracking-tight">Rigid Pcb Fabrication</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-8 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<PcbName />
						<BaseMaterial />
						<Layer />
						<MaterialType />
						<BoardSize />
						<PcbQuantity />
						<DifferentDesignsInPanel />
						<DesignFormat />
						<PanelQuantity />
						<PanelFormat />
						<PanelSize />
						<SinglePiecesQuantity />
						<BoardThickness />
						<Soldermask />
						<Silkscreen />
						<SurfaceFinish />
						<GoldThickness />
						<EdgeRails />
						<EdgeRailsSize />
						<OuterCuWeight />
						<CopperStructure />
						<ThermalConductivity />
						<BreakdownVoltage />
						<InnerCuWeight />
						<ImpedenceControl />
						<ViaCovering />
						<MinimumHoleSizeAndDiameter />
						<BoardOutlineTolerance />
						<GoldFingers />
						<ChamferedGoldFingers />
						<CastellatedHoles />
						<CastellatedHolesEdges />
						<ViaHoles />
						<LeadTime />
						<DispatchUnit />
						<UploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<RigidPcbPriceSummary />
						<PcbPriceEstimateAlert />
						<AddPcbToCartBtn isLoading={isLoading} />
					</div>
				</div>
			</div>
		</form>
	);
}
