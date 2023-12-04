import { flexPcbRateCard } from "@/lib/rateCards";
import { FlexPcbFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const flexPcbRouter = createTRPCRouter({
	getPrice: publicProcedure.input(FlexPcbFabSpecsTypeSchema).query(({ input }) => {
		// set inactive fields to null
		if (input.DesignFormat !== "Single PCB") {
			input.PcbQty = null;
		}
		if (input.DesignFormat === "Single PCB") {
			input.SinglePiecesQty = null;
			input.Columns = null;
			input.Rows = null;
		}
		if (input.DesignFormat === "Single PCB" || input.DesignFormat === "Panel by Customer") {
			input.EdgeRails = null;
		}
		if (
			input.DesignFormat === "Single PCB" ||
			input.DesignFormat === "Panel by Customer" ||
			input.EdgeRails === "No"
		) {
			input.EdgeRailSize = null;
		}
		if (input.SurfaceFinish !== "ENIG") {
			input.GoldThickness = null;
		}
		if (!input.Stiffner.includes("Polyimide")) {
			input.PolyimideThickness = null;
		}
		if (!input.Stiffner.includes("3M Tape")) {
			input.ThreeMTapeThickness = null;
		}
		if (!input.Stiffner.includes("Stainless Steel")) {
			input.StainlessSteelThickness = null;
		}
		if (!input.Stiffner.includes("FR4")) {
			input.FR4Thickness = null;
		}
		if (input.Layer < 2) {
			input.BoardOutlineTolerance = null;
		}

		// use active fields for price calculation.
		let unitCost = 0;
		let netCost = 0;

		const areaInSquareMilliMeters = input.BoardSizeX * input.BoardSizeY;
		const areaInSquareInches = areaInSquareMilliMeters / 645.2; // divide the area value by 645.2

		// base material
		if (input.BaseMaterial === "Flex (Polyimide)") {
			unitCost += flexPcbRateCard.baseMaterial.flex * areaInSquareInches; // per sq.inch
		}

		// layer
		if (input.Layer === 1) {
			unitCost += flexPcbRateCard.layer[1];
		} else if (input.Layer === 2) {
			unitCost += flexPcbRateCard.layer[2];
		}

		// size
		unitCost += input.BoardSizeX * flexPcbRateCard.dimensions.boardSizeX; // per mm
		unitCost += input.BoardSizeY * flexPcbRateCard.dimensions.boardSizeY; // per mm

		// different designs
		if (input.DifferentDesignsInPanel === 1) {
			unitCost += flexPcbRateCard.differentDesigns["1 Design"];
		} else if (input.DifferentDesignsInPanel === 2) {
			unitCost += flexPcbRateCard.differentDesigns["2 Designs"];
		} else if (input.DifferentDesignsInPanel === 3) {
			unitCost += flexPcbRateCard.differentDesigns["3 Designs"];
		} else {
			unitCost += flexPcbRateCard.differentDesigns["4 Designs"];
		}

		// design format
		if (input.DesignFormat === "Single PCB") {
			unitCost += flexPcbRateCard.designFormat["Single PCB"];
		} else if (input.DesignFormat === "Panel by Customer") {
			unitCost += flexPcbRateCard.designFormat["Panel by Customer"];
		} else {
			unitCost += flexPcbRateCard.designFormat["Panel by Manufacturer"];
		}

		// board thickness
		if (input.BoardThickness === 0.07) {
			unitCost += flexPcbRateCard.boardThickness["0.07"];
		} else if (input.BoardThickness === 0.11) {
			unitCost += flexPcbRateCard.boardThickness["0.11"];
		} else if (input.BoardThickness === 0.12) {
			unitCost += flexPcbRateCard.boardThickness["0.12"];
		} else if (input.BoardThickness === 0.2) {
			unitCost += flexPcbRateCard.boardThickness["0.2"];
		}

		// coverlay color
		if (input.Coverlay === "Yellow") {
			unitCost += flexPcbRateCard.coverlay.Yellow * areaInSquareInches; // per sq.inch
		}

		// silkscreen
		if (input.Silkscreen === "White") {
			unitCost += flexPcbRateCard.silkscreenColor.White * areaInSquareInches; // per sq.inch
		}

		// gold thickness
		if (input.GoldThickness === '1 U"') {
			unitCost += flexPcbRateCard.goldThickness['1 U"'] * areaInSquareInches;
		} else if (input.GoldThickness === '2 U"') {
			unitCost += flexPcbRateCard.goldThickness['2 U"'] * areaInSquareInches;
		}

		// outer cu weight
		if (input.OuterCuWeight === "0.5 oz") {
			unitCost += flexPcbRateCard.outerCuWeight["0.5 oz"] * areaInSquareInches; // per sq.inch
		} else {
			unitCost += flexPcbRateCard.outerCuWeight["1/3 oz"] * areaInSquareInches; // per sq.inch
		}

		// copper type
		if (input.CopperType === "Electro-deposited") {
			unitCost += flexPcbRateCard.copperType.Electrodeposited;
		}

		// surface finish
		if (input.SurfaceFinish === "ENIG") {
			unitCost += flexPcbRateCard.surfaceFinish.ENIG * areaInSquareInches; // per sq.inch
		}

		// coverlay thickness
		if (input.CoverlayThickness === "PI:12.5um/AD:15um") {
			unitCost += flexPcbRateCard.coverlayThickness["PI:12.5um/AD:15um"];
		}

		// stiffener and options
		if (input.Stiffner.includes("Polyimide")) {
			if (input.PolyimideThickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.1"];
			}
			if (input.PolyimideThickness === 0.15) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.15"];
			}
			if (input.PolyimideThickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.2"];
			}
			if (input.PolyimideThickness === 0.225) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.225"];
			}
			if (input.PolyimideThickness === 0.25) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.25"];
			}
		}
		if (input.Stiffner.includes("3M Tape")) {
			if (input.ThreeMTapeThickness === "3M468 (0.13mm)") {
				unitCost += flexPcbRateCard.stiffner.threeMTape["3M468 (0.13mm)"];
			}
			if (input.ThreeMTapeThickness === "3M9077 (HT, 0.05mm)") {
				unitCost += flexPcbRateCard.stiffner.threeMTape["3M9077 (HT, 0.05mm)"];
			}
		}
		if (input.Stiffner.includes("Stainless Steel")) {
			if (input.StainlessSteelThickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.1"];
			}
			if (input.StainlessSteelThickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.2"];
			}
			if (input.StainlessSteelThickness === 0.3) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.3"];
			}
		}
		if (input.Stiffner.includes("FR4")) {
			if (input.FR4Thickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.fr4["0.1"];
			}
			if (input.FR4Thickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.fr4["0.2"];
			}
		}

		// emi shielding
		if (input.EMIShieldingFilm === "Single side (Black, 18um)") {
			unitCost += flexPcbRateCard.emiShielding["Single side (Black, 18um)"] * areaInSquareInches; // per sq.inch
		} else if (input.EMIShieldingFilm === "Both sides (Black, 18um)") {
			unitCost += flexPcbRateCard.emiShielding["Both sides (Black, 18um)"] * areaInSquareInches; // per sq.inch
		}

		// cutting method
		if (input.CuttingMethod === "Laser Cutting") {
			unitCost += flexPcbRateCard.cuttingMethod.laser;
		}

		// edge rails and size
		if (input.EdgeRails === "On 2 Sides") {
			if (input.EdgeRailSize === "5mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["5mm"];
			} else if (input.EdgeRailSize === "7mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["7mm"];
			} else if (input.EdgeRailSize === "10mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["10mm"];
			}
		} else if (input.EdgeRails === "On 4 Sides") {
			if (input.EdgeRailSize === "5mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["5mm"];
			} else if (input.EdgeRailSize === "7mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["7mm"];
			} else if (input.EdgeRailSize === "10mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["10mm"];
			}
		}

		// leadtime
		if (input.LeadTime === "3 Working days") {
			unitCost += flexPcbRateCard.leadTime["3 Working days"];
		} else if (input.LeadTime === "5 Working days") {
			unitCost += flexPcbRateCard.leadTime["5 Working days"];
		} else if (input.LeadTime === "7 Working days") {
			unitCost += flexPcbRateCard.leadTime["7 Working days"];
		} else if (input.LeadTime === "10 Working days") {
			unitCost += flexPcbRateCard.leadTime["10 Working days"];
		}

		// board outline tolerance
		if (input.BoardOutlineTolerance === "±0.1mm") {
			unitCost += flexPcbRateCard.boardOutlineTolerance.regularCncRouting;
		} else if (input.BoardOutlineTolerance === "±0.05mm") {
			unitCost += flexPcbRateCard.boardOutlineTolerance.precisionCncRouting;
		}

		// dispatch unit
		if (input.DispatchUnit === "Panel") {
			unitCost += flexPcbRateCard.dispatchUnit.Panel;
		} else if (input.DispatchUnit === "PCB" && input.SinglePiecesQty) {
			if (input.SinglePiecesQty === 1) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[1];
			} else if (input.SinglePiecesQty >= 2 && input.SinglePiecesQty <= 5) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[25];
			} else if (input.SinglePiecesQty >= 6 && input.SinglePiecesQty <= 10) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[610];
			} else {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb.above10;
			}
		}

		// pcb quantity
		if (input.DesignFormat === "Single PCB" && input.PcbQty) {
			const orderedQty = input.PcbQty;
			netCost = unitCost * orderedQty;
		} else if (input.DesignFormat !== "Single PCB" && input.SinglePiecesQty) {
			const orderedQty = input.SinglePiecesQty;
			netCost = unitCost * orderedQty;
		}
		return netCost;
	}),
});
