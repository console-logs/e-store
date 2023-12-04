import { RigidPcbRateCard } from "@/lib/rateCards";
import { RigidPcbFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const rigidPcbRouter = createTRPCRouter({
	getPrice: publicProcedure.input(RigidPcbFabSpecsTypeSchema).query(({ input }) => {
		// set inactive fields to null.
		if (input.DesignFormat !== "Single PCB") {
			input.PcbQty = null;
		}
		if (input.DesignFormat === "Single PCB") {
			input.SinglePiecesQty = null;
		}
		if (input.BaseMaterial === "Aluminum" || input.BaseMaterial === "CopperCore") {
			input.ViaCovering = null;
			input.ViaHoles = null;
		}
		if ((input.BaseMaterial === "FR4" && input.Layer < 2) || input.BaseMaterial === "Rogers") {
			input.BoardOutlineTolerance = null;
		}
		if (!(input.BaseMaterial === "FR4" && input.Layer >= 4) && !(input.BaseMaterial === "Rogers")) {
			input.Material = null;
		}
		if (input.SurfaceFinish !== "ENIG") {
			input.GoldThickness = null;
		}
		if (input.DesignFormat !== "Panel by Manufacturer" || input.EdgeRails === "No") {
			input.EdgeRails = null;
			input.EdgeRailSize = null;
		}
		if (input.BaseMaterial !== "Aluminum" && input.BaseMaterial !== "CopperCore") {
			input.ThermalConductivity = null;
		}
		if (input.BaseMaterial !== "Aluminum") {
			input.BreakDownVoltage = null;
		}
		if (input.Layer < 4) {
			input.InnerCuWeight = null;
			input.ImpedanceControl = null;
			input.MinViaHoleSizeAndDiameter = null;
		}
		if (input.CastellatedHoles === "No") {
			input.CastellatedHolesEdges = null;
		}
		if (input.GoldFingers === "No") {
			input.ChamferedGoldFingers = null;
		}
		if (input.BaseMaterial !== "CopperCore") {
			input.CopperStructure = null;
		}

		// use the remaining fields to calculate the price.
		let unitCost = 0;
		let finalCost = 0;

		const areaInSquareMilliMeters = input.BoardSizeX * input.BoardSizeY;
		const areaInSquareInches = areaInSquareMilliMeters / 645.2; // divide the area value by 645.2

		// base material
		if (input.BaseMaterial === "FR4") {
			unitCost += RigidPcbRateCard.baseMaterial.FR4 * areaInSquareInches; // per sq.inch
		} else if (input.BaseMaterial === "Aluminum") {
			unitCost += RigidPcbRateCard.baseMaterial.Aluminum * areaInSquareInches; // per sq.inch
		} else if (input.BaseMaterial === "CopperCore") {
			unitCost += RigidPcbRateCard.baseMaterial.CopperCore * areaInSquareInches; // per sq.inch
		} else if (input.BaseMaterial === "Rogers") {
			unitCost += RigidPcbRateCard.baseMaterial.Rogers * areaInSquareInches; // per sq.inch
		}

		// layer
		if (input.Layer === 1) {
			unitCost += RigidPcbRateCard.layer[1];
		} else if (input.Layer === 2) {
			unitCost += RigidPcbRateCard.layer[2];
		} else if (input.Layer === 4) {
			unitCost += RigidPcbRateCard.layer[4];
		} else if (input.Layer === 6) {
			unitCost += RigidPcbRateCard.layer[6];
		} else if (input.Layer === 8) {
			unitCost += RigidPcbRateCard.layer[8];
		} else if (input.Layer === 10) {
			unitCost += RigidPcbRateCard.layer[10];
		}

		// material type
		if (input.Material === "FR4-Standard TG 135-140") {
			unitCost += RigidPcbRateCard.material["FR4-Standard TG 135-140"];
		} else if (input.Material === "FR-4 TG155") {
			unitCost += RigidPcbRateCard.material["FR-4 TG155"];
		}

		// board size
		unitCost += input.BoardSizeX * RigidPcbRateCard.dimensions.boardSizeX; // per mm
		unitCost += input.BoardSizeY * RigidPcbRateCard.dimensions.boardSizeY; // per mm

		// different designs in panel
		if (input.DifferentDesignsInPanel === 1) {
			unitCost += RigidPcbRateCard.differentDesigns["1 Design"];
		} else if (input.DifferentDesignsInPanel === 2) {
			unitCost += RigidPcbRateCard.differentDesigns["2 Designs"];
		} else if (input.DifferentDesignsInPanel === 3) {
			unitCost += RigidPcbRateCard.differentDesigns["3 Designs"];
		} else {
			unitCost += RigidPcbRateCard.differentDesigns["4 Designs"];
		}

		// design format
		if (input.DesignFormat === "Single PCB") {
			unitCost += RigidPcbRateCard.designFormat["Single PCB"];
		} else if (input.DesignFormat === "Panel by Customer") {
			unitCost += RigidPcbRateCard.designFormat["Panel by Customer"];
		} else {
			unitCost += RigidPcbRateCard.designFormat["Panel by Manufacturer"];
		}

		// board thickness
		if (input.BoardThickness === 0.4) {
			unitCost += RigidPcbRateCard.pcbThickness["0.4"];
		} else if (input.BoardThickness === 0.6) {
			unitCost += RigidPcbRateCard.pcbThickness["0.6"];
		} else if (input.BoardThickness === 0.8) {
			unitCost += RigidPcbRateCard.pcbThickness["0.8"];
		} else if (input.BoardThickness === 1) {
			unitCost += RigidPcbRateCard.pcbThickness[1];
		} else if (input.BoardThickness === 1.2) {
			unitCost += RigidPcbRateCard.pcbThickness["1.2"];
		} else if (input.BoardThickness === 1.6) {
			unitCost += RigidPcbRateCard.pcbThickness["1.6"];
		} else {
			unitCost += RigidPcbRateCard.pcbThickness[2];
		}

		// soldermask
		if (input.Soldermask === "Green") {
			unitCost += RigidPcbRateCard.soldermaskColor.Green * areaInSquareInches; // per sq.inch
		} else if (input.Soldermask === "Purple") {
			unitCost += RigidPcbRateCard.soldermaskColor.Purple * areaInSquareInches; // per sq.inch
		} else if (input.Soldermask === "Red") {
			unitCost += RigidPcbRateCard.soldermaskColor.Red * areaInSquareInches; // per sq.inch
		} else if (input.Soldermask === "Yellow") {
			unitCost += RigidPcbRateCard.soldermaskColor.Yellow * areaInSquareInches; // per sq.inch
		} else if (input.Soldermask === "Blue") {
			unitCost += RigidPcbRateCard.soldermaskColor.Blue * areaInSquareInches; // per sq.inch
		} else if (input.Soldermask === "Black") {
			unitCost += RigidPcbRateCard.soldermaskColor.Black * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.soldermaskColor.White * areaInSquareInches; // per sq.inch
		}

		// silkscreen
		if (input.Silkscreen === "Black") {
			unitCost += RigidPcbRateCard.silkscreenColor.Black * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.silkscreenColor.White * areaInSquareInches; // per sq.inch
		}

		// surface finish
		if (input.SurfaceFinish === "HASL(with lead)") {
			unitCost += RigidPcbRateCard.surfaceFinish["HASL(with lead)"] * areaInSquareInches; // per sq.inch
		} else if (input.SurfaceFinish === "ENIG") {
			unitCost += RigidPcbRateCard.surfaceFinish.ENIG * areaInSquareInches; // per sq.inch
		} else if (input.SurfaceFinish === "OSP") {
			unitCost += RigidPcbRateCard.surfaceFinish.OSP * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.surfaceFinish["LeadFree HASL"] * areaInSquareInches; // per sq.inch
		}

		// gold thickness
		if (input.GoldThickness === '1 U"') {
			unitCost += RigidPcbRateCard.goldThickness['1 U"'] * areaInSquareInches;
		} else if (input.GoldThickness === '2 U"') {
			unitCost += RigidPcbRateCard.goldThickness['2 U"'] * areaInSquareInches;
		}

		// outer cu weight
		if (input.OuterCuWeight === "1 oz") {
			unitCost += RigidPcbRateCard.outerCuWeight["1 oz"] * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.outerCuWeight["2 oz"] * areaInSquareInches; // per sq.inch
		}

		// thermal conductivity
		if (input.ThermalConductivity === 1) {
			unitCost += RigidPcbRateCard.thermalConductivity[1];
		} else if (input.ThermalConductivity === 380) {
			unitCost += RigidPcbRateCard.thermalConductivity[380];
		}

		// breakdown voltage
		if (input.BreakDownVoltage) {
			unitCost += RigidPcbRateCard.breakDownVoltage[3000];
		}

		// copper structure
		if (input.CopperStructure === "Direct Heatsink") {
			unitCost += RigidPcbRateCard.copperStructure.directHeatSink;
		}

		// inner cu weight
		if (input.InnerCuWeight === "0.5 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["0.5 oz"] * areaInSquareInches;
		} else if (input.InnerCuWeight === "1 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["1 oz"] * areaInSquareInches;
		} else if (input.InnerCuWeight === "2 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["2 oz"] * areaInSquareInches;
		}

		// immpedence control
		if (input.ImpedanceControl === "Yes") {
			unitCost += RigidPcbRateCard.impedenceControl.Yes;
		} else {
			unitCost += RigidPcbRateCard.impedenceControl.No;
		}

		if (input.ViaHoles) {
			// via covering
			if (input.ViaCovering === "Tented") {
				unitCost += RigidPcbRateCard.viaCovering.tented * input.ViaHoles;
			} else if (input.ViaCovering === "Untented") {
				unitCost += RigidPcbRateCard.viaCovering.untented * input.ViaHoles;
			} else if (input.ViaCovering === "Plugged") {
				unitCost += RigidPcbRateCard.viaCovering.plugged * input.ViaHoles;
			} else if (input.ViaCovering === "Epoxy Filled & Capped") {
				unitCost += RigidPcbRateCard.viaCovering.epoxyFilledCapped * input.ViaHoles;
			}

			// minimum hole size and diameter
			if (input.MinViaHoleSizeAndDiameter === "0.3mm/(0.4/0.45mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.3mm/(0.4/0.45mm)"] * input.ViaHoles;
			} else if (input.MinViaHoleSizeAndDiameter === "0.25mm/(0.35/0.40mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.25mm/(0.35/0.40mm)"] * input.ViaHoles;
			} else if (input.MinViaHoleSizeAndDiameter === "0.2mm/(0.3/0.35mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.2mm/(0.3/0.35mm)"] * input.ViaHoles;
			} else if (input.MinViaHoleSizeAndDiameter === "0.15mm/(0.25/0.3mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.15mm/(0.25/0.3mm)"] * input.ViaHoles;
			}
		}

		// gold fingers
		if (input.GoldFingers === "Yes") {
			unitCost += RigidPcbRateCard.goldFingers.Yes;
		} else {
			unitCost += RigidPcbRateCard.goldFingers.No;
		}

		// chamfered gold fingers
		if (input.ChamferedGoldFingers === "Yes") {
			unitCost += RigidPcbRateCard.chamferedGoldFingers.Yes;
		} else {
			unitCost += RigidPcbRateCard.chamferedGoldFingers.No;
		}

		// castellated holes & castellated holes edges
		if (input.CastellatedHolesEdges) {
			if (input.CastellatedHoles === "Yes") {
				unitCost += RigidPcbRateCard.castellatedHoles.Yes * input.CastellatedHolesEdges; // per hole
			} else {
				unitCost += RigidPcbRateCard.castellatedHoles.No * input.CastellatedHolesEdges; // per hole;
			}
		}

		// dipatch unit
		if (input.DispatchUnit === "Panel") {
			unitCost += RigidPcbRateCard.dispatchUnit.Panel;
		} else if (input.DispatchUnit === "PCB" && input.SinglePiecesQty) {
			if (input.SinglePiecesQty === 1) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[1];
			} else if (input.SinglePiecesQty >= 2 && input.SinglePiecesQty <= 5) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[25];
			} else if (input.SinglePiecesQty >= 6 && input.SinglePiecesQty <= 10) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[610];
			} else {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb.above10;
			}
		}

		// board outline tolerance
		if (input.BoardOutlineTolerance === "±0.2mm(Regular)") {
			unitCost += RigidPcbRateCard.boardOutlineTolerance.regularCncRouting;
		} else if (input.BoardOutlineTolerance === "±0.1mm(Precision)") {
			unitCost += RigidPcbRateCard.boardOutlineTolerance.precisionCncRouting;
		}

		// leadtime
		if (input.LeadTime === "3 Working days") {
			unitCost += RigidPcbRateCard.leadTime["3 Working days"];
		} else if (input.LeadTime === "5 Working days") {
			unitCost += RigidPcbRateCard.leadTime["5 Working days"];
		} else if (input.LeadTime === "7 Working days") {
			unitCost += RigidPcbRateCard.leadTime["7 Working days"];
		} else if (input.LeadTime === "10 Working days") {
			unitCost += RigidPcbRateCard.leadTime["10 Working days"];
		}

		// edge rails & edge rails size
		if (input.EdgeRails === "On 2 Sides") {
			if (input.EdgeRailSize === "5mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["5mm"];
			} else if (input.EdgeRailSize === "7mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["7mm"];
			} else if (input.EdgeRailSize === "10mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["10mm"];
			}
		} else if (input.EdgeRails === "On 4 Sides") {
			if (input.EdgeRailSize === "5mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["5mm"];
			} else if (input.EdgeRailSize === "7mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["7mm"];
			} else if (input.EdgeRailSize === "10mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["10mm"];
			}
		}

		// pcb quantity
		if (input.DesignFormat === "Single PCB" && input.PcbQty) {
			finalCost = unitCost * input.PcbQty;
		} else if (input.DesignFormat !== "Single PCB" && input.SinglePiecesQty) {
			finalCost = unitCost * input.SinglePiecesQty;
		}
		return finalCost;
	}),
});
