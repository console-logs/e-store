import { RigidPcbRateCard } from "@/lib/rateCards";
import { RigidPcbFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const rigidPcbRouter = createTRPCRouter({
	getPrice: publicProcedure.input(RigidPcbFabSpecsTypeSchema).query(async ({ input }) => {
		
		// set inactive fields to null.
		if (input.designFormat !== "Single PCB") {
			input.pcbQty = null;
		}
		if (input.designFormat === "Single PCB") {
			input.singlePiecesQty = null;
		}
		if (input.baseMaterial === "Aluminum" || input.baseMaterial === "CopperCore") {
			input.viaCovering = null;
			input.viaHoles = null;
		}
		if ((input.baseMaterial === "FR4" && input.layer < 2) || input.baseMaterial === "Rogers") {
			input.boardOutlineTolerance = null;
		}
		if (!(input.baseMaterial === "FR4" && input.layer >= 4) && !(input.baseMaterial === "Rogers")) {
			input.material = null;
		}
		if (input.surfaceFinish !== "ENIG") {
			input.goldThickness = null;
		}
		if (input.designFormat !== "Panel by Manufacturer" || input.edgeRails === "No") {
			input.edgeRails = null;
			input.edgeRailSize = null;
		}
		if (input.baseMaterial !== "Aluminum" && input.baseMaterial !== "CopperCore") {
			input.thermalConductivity = null;
		}
		if (input.baseMaterial !== "Aluminum") {
			input.breakDownVoltage = null;
		}
		if (input.layer < 4) {
			input.innerCuWeight = null;
			input.impedenceControl = null;
			input.minViaHoleSizeAndDiameter = null;
		}
		if (input.castellatedHoles === "No") {
			input.castellatedHolesEdges = null;
		}
		if (input.goldFingers === "No") {
			input.chamferedGoldFingers = null;
		}
		if (input.baseMaterial !== "CopperCore") {
			input.copperStructure = null;
		}

		// use the remaining fields to calculate the price.
		let unitCost = 0;
		let finalCost = 0;

		const areaInSquareMilliMeters = input.boardSizeX * input.boardSizeY;
		const areaInSquareInches = areaInSquareMilliMeters / 645.2; // divide the area value by 645.2

		// base material
		if (input.baseMaterial === "FR4") {
			unitCost += RigidPcbRateCard.baseMaterial.FR4 * areaInSquareInches; // per sq.inch
		} else if (input.baseMaterial === "Aluminum") {
			unitCost += RigidPcbRateCard.baseMaterial.Aluminum * areaInSquareInches; // per sq.inch
		} else if (input.baseMaterial === "CopperCore") {
			unitCost += RigidPcbRateCard.baseMaterial.CopperCore * areaInSquareInches; // per sq.inch
		} else if (input.baseMaterial === "Rogers") {
			unitCost += RigidPcbRateCard.baseMaterial.Rogers * areaInSquareInches; // per sq.inch
		}

		// layer
		if (input.layer === 1) {
			unitCost += RigidPcbRateCard.layer[1];
		} else if (input.layer === 2) {
			unitCost += RigidPcbRateCard.layer[2];
		} else if (input.layer === 4) {
			unitCost += RigidPcbRateCard.layer[4];
		} else if (input.layer === 6) {
			unitCost += RigidPcbRateCard.layer[6];
		} else if (input.layer === 8) {
			unitCost += RigidPcbRateCard.layer[8];
		} else if (input.layer === 10) {
			unitCost += RigidPcbRateCard.layer[10];
		}

		// material type
		if (input.material === "FR4-Standard TG 135-140") {
			unitCost += RigidPcbRateCard.material["FR4-Standard TG 135-140"];
		} else if (input.material === "FR-4 TG155") {
			unitCost += RigidPcbRateCard.material["FR-4 TG155"];
		}

		// board size
		unitCost += input.boardSizeX * RigidPcbRateCard.dimensions.boardSizeX; // per mm
		unitCost += input.boardSizeY * RigidPcbRateCard.dimensions.boardSizeY; // per mm

		// different designs in panel
		if (input.differentDesignsInPanel === 1) {
			unitCost += RigidPcbRateCard.differentDesigns["1 Design"];
		} else if (input.differentDesignsInPanel === 2) {
			unitCost += RigidPcbRateCard.differentDesigns["2 Designs"];
		} else if (input.differentDesignsInPanel === 3) {
			unitCost += RigidPcbRateCard.differentDesigns["3 Designs"];
		} else {
			unitCost += RigidPcbRateCard.differentDesigns["4 Designs"];
		}

		// design format
		if (input.designFormat === "Single PCB") {
			unitCost += RigidPcbRateCard.designFormat["Single PCB"];
		} else if (input.designFormat === "Panel by Customer") {
			unitCost += RigidPcbRateCard.designFormat["Panel by Customer"];
		} else {
			unitCost += RigidPcbRateCard.designFormat["Panel by Manufacturer"];
		}

		// board thickness
		if (input.boardThickness === 0.4) {
			unitCost += RigidPcbRateCard.pcbThickness["0.4"];
		} else if (input.boardThickness === 0.6) {
			unitCost += RigidPcbRateCard.pcbThickness["0.6"];
		} else if (input.boardThickness === 0.8) {
			unitCost += RigidPcbRateCard.pcbThickness["0.8"];
		} else if (input.boardThickness === 1) {
			unitCost += RigidPcbRateCard.pcbThickness[1];
		} else if (input.boardThickness === 1.2) {
			unitCost += RigidPcbRateCard.pcbThickness["1.2"];
		} else if (input.boardThickness === 1.6) {
			unitCost += RigidPcbRateCard.pcbThickness["1.6"];
		} else {
			unitCost += RigidPcbRateCard.pcbThickness[2];
		}

		// soldermask
		if (input.soldermask === "Green") {
			unitCost += RigidPcbRateCard.soldermaskColor.Green * areaInSquareInches; // per sq.inch
		} else if (input.soldermask === "Purple") {
			unitCost += RigidPcbRateCard.soldermaskColor.Purple * areaInSquareInches; // per sq.inch
		} else if (input.soldermask === "Red") {
			unitCost += RigidPcbRateCard.soldermaskColor.Red * areaInSquareInches; // per sq.inch
		} else if (input.soldermask === "Yellow") {
			unitCost += RigidPcbRateCard.soldermaskColor.Yellow * areaInSquareInches; // per sq.inch
		} else if (input.soldermask === "Blue") {
			unitCost += RigidPcbRateCard.soldermaskColor.Blue * areaInSquareInches; // per sq.inch
		} else if (input.soldermask === "Black") {
			unitCost += RigidPcbRateCard.soldermaskColor.Black * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.soldermaskColor.White * areaInSquareInches; // per sq.inch
		}

		// silkscreen
		if (input.silkscreen === "Black") {
			unitCost += RigidPcbRateCard.silkscreenColor.Black * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.silkscreenColor.White * areaInSquareInches; // per sq.inch
		}

		// surface finish
		if (input.surfaceFinish === "HASL(with lead)") {
			unitCost += RigidPcbRateCard.surfaceFinish["HASL(with lead)"] * areaInSquareInches; // per sq.inch
		} else if (input.surfaceFinish === "ENIG") {
			unitCost += RigidPcbRateCard.surfaceFinish.ENIG * areaInSquareInches; // per sq.inch
		} else if (input.surfaceFinish === "OSP") {
			unitCost += RigidPcbRateCard.surfaceFinish.OSP * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.surfaceFinish["LeadFree HASL"] * areaInSquareInches; // per sq.inch
		}

		// gold thickness
		if (input.goldThickness === '1 U"') {
			unitCost += RigidPcbRateCard.goldThickness['1 U"'] * areaInSquareInches;
		} else if (input.goldThickness === '2 U"') {
			unitCost += RigidPcbRateCard.goldThickness['2 U"'] * areaInSquareInches;
		}

		// outer cu weight
		if (input.outerCuWeight === "1 oz") {
			unitCost += RigidPcbRateCard.outerCuWeight["1 oz"] * areaInSquareInches; // per sq.inch
		} else {
			unitCost += RigidPcbRateCard.outerCuWeight["2 oz"] * areaInSquareInches; // per sq.inch
		}

		// thermal conductivity
		if (input.thermalConductivity === 1) {
			unitCost += RigidPcbRateCard.thermalConductivity[1];
		} else if (input.thermalConductivity === 380) {
			unitCost += RigidPcbRateCard.thermalConductivity[380];
		}

		// breakdown voltage
		if (input.breakDownVoltage) {
			unitCost += RigidPcbRateCard.breakDownVoltage[3000];
		}

		// copper structure
		if (input.copperStructure === "Direct Heatsink") {
			unitCost += RigidPcbRateCard.copperStructure.directHeatSink;
		}

		// inner cu weight
		if (input.innerCuWeight === "0.5 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["0.5 oz"] * areaInSquareInches;
		} else if (input.innerCuWeight === "1 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["1 oz"] * areaInSquareInches;
		} else if (input.innerCuWeight === "2 oz") {
			unitCost += RigidPcbRateCard.innerCuWeight["2 oz"] * areaInSquareInches;
		}

		// immpedence control
		if (input.impedenceControl === "Yes") {
			unitCost += RigidPcbRateCard.impedenceControl.Yes;
		} else {
			unitCost += RigidPcbRateCard.impedenceControl.No;
		}

		if (input.viaHoles) {
			// via covering
			if (input.viaCovering === "Tented") {
				unitCost += RigidPcbRateCard.viaCovering.tented * input.viaHoles;
			} else if (input.viaCovering === "Untented") {
				unitCost += RigidPcbRateCard.viaCovering.untented * input.viaHoles;
			} else if (input.viaCovering === "Plugged") {
				unitCost += RigidPcbRateCard.viaCovering.plugged * input.viaHoles;
			} else if (input.viaCovering === "Epoxy Filled & Capped") {
				unitCost += RigidPcbRateCard.viaCovering.epoxyFilledCapped * input.viaHoles;
			}

			// minimum hole size and diameter
			if (input.minViaHoleSizeAndDiameter === "0.3mm/(0.4/0.45mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.3mm/(0.4/0.45mm)"] * input.viaHoles;
			} else if (input.minViaHoleSizeAndDiameter === "0.25mm/(0.35/0.40mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.25mm/(0.35/0.40mm)"] * input.viaHoles;
			} else if (input.minViaHoleSizeAndDiameter === "0.2mm/(0.3/0.35mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.2mm/(0.3/0.35mm)"] * input.viaHoles;
			} else if (input.minViaHoleSizeAndDiameter === "0.15mm/(0.25/0.3mm)") {
				unitCost += RigidPcbRateCard.minViaHoleSizeAndDiameter["0.15mm/(0.25/0.3mm)"] * input.viaHoles;
			}
		}

		// gold fingers
		if (input.goldFingers === "Yes") {
			unitCost += RigidPcbRateCard.goldFingers.Yes;
		} else {
			unitCost += RigidPcbRateCard.goldFingers.No;
		}

		// chamfered gold fingers
		if (input.chamferedGoldFingers === "Yes") {
			unitCost += RigidPcbRateCard.chamferedGoldFingers.Yes;
		} else {
			unitCost += RigidPcbRateCard.chamferedGoldFingers.No;
		}

		// castellated holes & castellated holes edges
		if (input.castellatedHolesEdges) {
			if (input.castellatedHoles === "Yes") {
				unitCost += RigidPcbRateCard.castellatedHoles.Yes * input.castellatedHolesEdges; // per hole
			} else {
				unitCost += RigidPcbRateCard.castellatedHoles.No * input.castellatedHolesEdges; // per hole;
			}
		}

		// dipatch unit
		if (input.dispatchUnit === "Panel") {
			unitCost += RigidPcbRateCard.dispatchUnit.Panel;
		} else if (input.dispatchUnit === "PCB" && input.singlePiecesQty) {
			if (input.singlePiecesQty === 1) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[1];
			} else if (input.singlePiecesQty >= 2 && input.singlePiecesQty <= 5) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[25];
			} else if (input.singlePiecesQty >= 6 && input.singlePiecesQty <= 10) {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb[610];
			} else {
				unitCost += RigidPcbRateCard.dispatchUnit.Pcb.above10;
			}
		}

		// board outline tolerance
		if (input.boardOutlineTolerance === "±0.2mm(Regular)") {
			unitCost += RigidPcbRateCard.boardOutlineTolerance.regularCncRouting;
		} else if (input.boardOutlineTolerance === "±0.1mm(Precision)") {
			unitCost += RigidPcbRateCard.boardOutlineTolerance.precisionCncRouting;
		}

		// leadtime
		if (input.leadTime === "3 Working days") {
			unitCost += RigidPcbRateCard.leadTime["3 Working days"];
		} else if (input.leadTime === "5 Working days") {
			unitCost += RigidPcbRateCard.leadTime["5 Working days"];
		} else if (input.leadTime === "7 Working days") {
			unitCost += RigidPcbRateCard.leadTime["7 Working days"];
		} else if (input.leadTime === "10 Working days") {
			unitCost += RigidPcbRateCard.leadTime["10 Working days"];
		}

		// edge rails & edge rails size
		if (input.edgeRails === "On 2 Sides") {
			if (input.edgeRailSize === "5mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["5mm"];
			} else if (input.edgeRailSize === "7mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["7mm"];
			} else if (input.edgeRailSize === "10mm") {
				unitCost += 2 * RigidPcbRateCard.edgeRailSize["10mm"];
			}
		} else if (input.edgeRails === "On 4 Sides") {
			if (input.edgeRailSize === "5mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["5mm"];
			} else if (input.edgeRailSize === "7mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["7mm"];
			} else if (input.edgeRailSize === "10mm") {
				unitCost += 4 * RigidPcbRateCard.edgeRailSize["10mm"];
			}
		}

		// pcb quantity
		if (input.designFormat === "Single PCB" && input.pcbQty) {
			finalCost = unitCost * input.pcbQty;
		} else if (input.designFormat !== "Single PCB" && input.singlePiecesQty) {
			finalCost = unitCost * input.singlePiecesQty;
		}
		return finalCost;
	}),
});
