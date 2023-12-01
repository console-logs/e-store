import { flexPcbRateCard } from "@/lib/rateCards";
import { FlexPcbFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const flexPcbRouter = createTRPCRouter({
	getPrice: publicProcedure.input(FlexPcbFabSpecsTypeSchema).query(({ input }) => {
		// set inactive fields to null
		if (input.designFormat !== "Single PCB") {
			input.pcbQty = null;
		}
		if (input.designFormat === "Single PCB") {
			input.singlePiecesQty = null;
			input.columns = null;
			input.rows = null;
		}
		if (input.designFormat === "Single PCB" || input.designFormat === "Panel by Customer") {
			input.edgeRails = null;
		}
		if (
			input.designFormat === "Single PCB" ||
			input.designFormat === "Panel by Customer" ||
			input.edgeRails === "No"
		) {
			input.edgeRailSize = null;
		}
		if (input.surfaceFinish !== "ENIG") {
			input.goldThickness = null;
		}
		if (!input.stiffner.includes("Polyimide")) {
			input.polyimideThickness = null;
		}
		if (!input.stiffner.includes("3M Tape")) {
			input.threeMTapeThickness = null;
		}
		if (!input.stiffner.includes("Stainless Steel")) {
			input.stainlessSteelThickness = null;
		}
		if (!input.stiffner.includes("FR4")) {
			input.fr4Thickness = null;
		}
		if (input.layer < 2) {
			input.boardOutlineTolerance = null;
		}

		// use active fields for price calculation.
		let unitCost = 0;
		let finalCost = 0;

		const areaInSquareMilliMeters = input.boardSizeX * input.boardSizeY;
		const areaInSquareInches = areaInSquareMilliMeters / 645.2; // divide the area value by 645.2

		// base material
		if (input.baseMaterial === "Flex (Polyimide)") {
			unitCost += flexPcbRateCard.baseMaterial.flex * areaInSquareInches; // per sq.inch
		}

		// layer
		if (input.layer === 1) {
			unitCost += flexPcbRateCard.layer[1];
		} else if (input.layer === 2) {
			unitCost += flexPcbRateCard.layer[2];
		}

		// size
		unitCost += input.boardSizeX * flexPcbRateCard.dimensions.boardSizeX; // per mm
		unitCost += input.boardSizeY * flexPcbRateCard.dimensions.boardSizeY; // per mm

		// different designs
		if (input.differentDesignsInPanel === 1) {
			unitCost += flexPcbRateCard.differentDesigns["1 Design"];
		} else if (input.differentDesignsInPanel === 2) {
			unitCost += flexPcbRateCard.differentDesigns["2 Designs"];
		} else if (input.differentDesignsInPanel === 3) {
			unitCost += flexPcbRateCard.differentDesigns["3 Designs"];
		} else {
			unitCost += flexPcbRateCard.differentDesigns["4 Designs"];
		}

		// design format
		if (input.designFormat === "Single PCB") {
			unitCost += flexPcbRateCard.designFormat["Single PCB"];
		} else if (input.designFormat === "Panel by Customer") {
			unitCost += flexPcbRateCard.designFormat["Panel by Customer"];
		} else {
			unitCost += flexPcbRateCard.designFormat["Panel by Manufacturer"];
		}

		// board thickness
		if (input.boardThickness === 0.07) {
			unitCost += flexPcbRateCard.boardThickness["0.07"];
		} else if (input.boardThickness === 0.11) {
			unitCost += flexPcbRateCard.boardThickness["0.11"];
		} else if (input.boardThickness === 0.12) {
			unitCost += flexPcbRateCard.boardThickness["0.12"];
		} else if (input.boardThickness === 0.2) {
			unitCost += flexPcbRateCard.boardThickness["0.2"];
		}

		// coverlay color
		if (input.coverlay === "Yellow") {
			unitCost += flexPcbRateCard.coverlay.Yellow * areaInSquareInches; // per sq.inch
		}

		// silkscreen
		if (input.silkscreen === "White") {
			unitCost += flexPcbRateCard.silkscreenColor.White * areaInSquareInches; // per sq.inch
		}

		// gold thickness
		if (input.goldThickness === '1 U"') {
			unitCost += flexPcbRateCard.goldThickness['1 U"'] * areaInSquareInches;
		} else if (input.goldThickness === '2 U"') {
			unitCost += flexPcbRateCard.goldThickness['2 U"'] * areaInSquareInches;
		}

		// outer cu weight
		if (input.outerCuWeight === "0.5 oz") {
			unitCost += flexPcbRateCard.outerCuWeight["0.5 oz"] * areaInSquareInches; // per sq.inch
		} else {
			unitCost += flexPcbRateCard.outerCuWeight["1/3 oz"] * areaInSquareInches; // per sq.inch
		}

		// copper type
		if (input.copperType === "Electro-deposited") {
			unitCost += flexPcbRateCard.copperType.Electrodeposited;
		}

		// surface finish
		if (input.surfaceFinish === "ENIG") {
			unitCost += flexPcbRateCard.surfaceFinish.ENIG * areaInSquareInches; // per sq.inch
		}

		// coverlay thickness
		if (input.coverlayThickness === "PI:12.5um/AD:15um") {
			unitCost += flexPcbRateCard.coverlayThickness["PI:12.5um/AD:15um"];
		}

		// stiffener and options
		if (input.stiffner.includes("Polyimide")) {
			if (input.polyimideThickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.1"];
			}
			if (input.polyimideThickness === 0.15) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.15"];
			}
			if (input.polyimideThickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.2"];
			}
			if (input.polyimideThickness === 0.225) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.225"];
			}
			if (input.polyimideThickness === 0.25) {
				unitCost += flexPcbRateCard.stiffner.polyimide["0.25"];
			}
		}
		if (input.stiffner.includes("3M Tape")) {
			if (input.threeMTapeThickness === "3M468 (0.13mm)") {
				unitCost += flexPcbRateCard.stiffner.threeMTape["3M468 (0.13mm)"];
			}
			if (input.threeMTapeThickness === "3M9077 (HT, 0.05mm)") {
				unitCost += flexPcbRateCard.stiffner.threeMTape["3M9077 (HT, 0.05mm)"];
			}
		}
		if (input.stiffner.includes("Stainless Steel")) {
			if (input.stainlessSteelThickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.1"];
			}
			if (input.stainlessSteelThickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.2"];
			}
			if (input.stainlessSteelThickness === 0.3) {
				unitCost += flexPcbRateCard.stiffner.stainlessSteel["0.3"];
			}
		}
		if (input.stiffner.includes("FR4")) {
			if (input.fr4Thickness === 0.1) {
				unitCost += flexPcbRateCard.stiffner.fr4["0.1"];
			}
			if (input.fr4Thickness === 0.2) {
				unitCost += flexPcbRateCard.stiffner.fr4["0.2"];
			}
		}

		// emi shielding
		if (input.emiShieldingFilm === "Single side (Black, 18um)") {
			unitCost += flexPcbRateCard.emiShielding["Single side (Black, 18um)"] * areaInSquareInches; // per sq.inch
		} else if (input.emiShieldingFilm === "Both sides (Black, 18um)") {
			unitCost += flexPcbRateCard.emiShielding["Both sides (Black, 18um)"] * areaInSquareInches; // per sq.inch
		}

		// cutting method
		if (input.cuttingMethod === "Laser Cutting") {
			unitCost += flexPcbRateCard.cuttingMethod.laser;
		}

		// edge rails and size
		if (input.edgeRails === "On 2 Sides") {
			if (input.edgeRailSize === "5mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["5mm"];
			} else if (input.edgeRailSize === "7mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["7mm"];
			} else if (input.edgeRailSize === "10mm") {
				unitCost += 2 * flexPcbRateCard.edgeRailSize["10mm"];
			}
		} else if (input.edgeRails === "On 4 Sides") {
			if (input.edgeRailSize === "5mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["5mm"];
			} else if (input.edgeRailSize === "7mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["7mm"];
			} else if (input.edgeRailSize === "10mm") {
				unitCost += 4 * flexPcbRateCard.edgeRailSize["10mm"];
			}
		}

		// leadtime
		if (input.leadTime === "3 Working days") {
			unitCost += flexPcbRateCard.leadTime["3 Working days"];
		} else if (input.leadTime === "5 Working days") {
			unitCost += flexPcbRateCard.leadTime["5 Working days"];
		} else if (input.leadTime === "7 Working days") {
			unitCost += flexPcbRateCard.leadTime["7 Working days"];
		} else if (input.leadTime === "10 Working days") {
			unitCost += flexPcbRateCard.leadTime["10 Working days"];
		}

		// board outline tolerance
		if (input.boardOutlineTolerance === "±0.1mm") {
			unitCost += flexPcbRateCard.boardOutlineTolerance.regularCncRouting;
		} else if (input.boardOutlineTolerance === "±0.05mm") {
			unitCost += flexPcbRateCard.boardOutlineTolerance.precisionCncRouting;
		}

		// dispatch unit
		if (input.dispatchUnit === "Panel") {
			unitCost += flexPcbRateCard.dispatchUnit.Panel;
		} else if (input.dispatchUnit === "PCB" && input.singlePiecesQty) {
			if (input.singlePiecesQty === 1) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[1];
			} else if (input.singlePiecesQty >= 2 && input.singlePiecesQty <= 5) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[25];
			} else if (input.singlePiecesQty >= 6 && input.singlePiecesQty <= 10) {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb[610];
			} else {
				unitCost += flexPcbRateCard.dispatchUnit.Pcb.above10;
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
