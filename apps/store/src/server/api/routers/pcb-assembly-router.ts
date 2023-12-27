import { assemblyRateCard } from "@/lib/rate-cards";
import { PcbAssemblyFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const pcbAssemblyRouter = createTRPCRouter({
	getPrice: publicProcedure.input(PcbAssemblyFabSpecsTypeSchema).query(({ input }) => {
		// Calculate the cost based on the input parameters and rate card
		let finalCost = 0;
		let setupCharges = 0;

		// set unused fields to null
		if (input.BoardType === "Single PCB") {
			input.PcbsPerPanel = null;
		}

		// Add board type cost (base charge)
		if (input.BoardType === "Single PCB") {
			finalCost += assemblyRateCard.boardType.single;
		} else if (input.BoardType === "Panel" && input.PcbsPerPanel) {
			if (input.PcbsPerPanel <= 2) {
				finalCost += assemblyRateCard.boardType.panel[2];
			} else if (input.PcbsPerPanel >= 3 && input.PcbsPerPanel <= 5) {
				finalCost += assemblyRateCard.boardType.panel[3_5];
			} else if (input.PcbsPerPanel >= 6 && input.PcbsPerPanel <= 10) {
				finalCost += assemblyRateCard.boardType.panel[6_10];
			} else {
				finalCost += assemblyRateCard.boardType.panel.above10;
			}
		}

		// Add assembly sides cost
		if (input.BoardType === "Single PCB") {
			finalCost += assemblyRateCard.assemblySides[input.AssemblySides];
		} else if (input.BoardType === "Panel" && input.PcbsPerPanel) {
			finalCost += assemblyRateCard.assemblySides[input.AssemblySides] * input.PcbsPerPanel;
		}

		// Add quantity cost
		if (input.OrderedQty <= 10) {
			finalCost += assemblyRateCard.quantity.upTo10 * input.OrderedQty;
		} else if (input.OrderedQty >= 11 && input.OrderedQty <= 50) {
			finalCost += assemblyRateCard.quantity[11_50] * input.OrderedQty;
		} else if (input.OrderedQty >= 51 && input.OrderedQty <= 100) {
			finalCost += assemblyRateCard.quantity[51_100] * input.OrderedQty;
		} else if (input.OrderedQty >= 101 && input.OrderedQty <= 500) {
			finalCost += assemblyRateCard.quantity[101_500] * input.OrderedQty;
		} else {
			finalCost += assemblyRateCard.quantity.above500 * input.OrderedQty;
		}

		// Add unique components cost
		if (input.NumOfUniqueComponents <= 5) {
			finalCost += assemblyRateCard.uniqueComponents.upTo5;
		} else if (input.NumOfUniqueComponents >= 6 && input.NumOfUniqueComponents <= 10) {
			finalCost += assemblyRateCard.uniqueComponents[6_10];
		} else if (input.NumOfUniqueComponents >= 11 && input.NumOfUniqueComponents <= 20) {
			finalCost += assemblyRateCard.uniqueComponents[11_20];
		} else {
			finalCost += assemblyRateCard.uniqueComponents.above20;
		}

		// Add SMD parts cost
		if (input.NumOfSmdComponents >= 11 && input.NumOfSmdComponents <= 20) {
			finalCost += assemblyRateCard.smdParts[11_20];
		} else if (input.NumOfSmdComponents >= 21 && input.NumOfSmdComponents <= 50) {
			finalCost += assemblyRateCard.smdParts[21_50];
		} else if (input.NumOfSmdComponents > 50) {
			finalCost += assemblyRateCard.smdParts.above50;
		}

		// Add BGA/QFP parts cost
		if (input.NumOfBgaComponents >= 3 && input.NumOfBgaComponents <= 5) {
			finalCost += assemblyRateCard.bgaQfpParts[3_5];
		} else if (input.NumOfBgaComponents > 5) {
			finalCost += assemblyRateCard.bgaQfpParts.above5;
		}

		// Add through-hole parts cost
		if (input.NumOfThroughHoleComponents >= 6 && input.NumOfThroughHoleComponents <= 10) {
			finalCost += assemblyRateCard.throughHoleParts[6_10];
		} else if (input.NumOfThroughHoleComponents >= 11 && input.NumOfThroughHoleComponents <= 20) {
			finalCost += assemblyRateCard.throughHoleParts[11_20];
		} else if (input.NumOfThroughHoleComponents > 20) {
			finalCost += assemblyRateCard.throughHoleParts.above20;
		}

		// Add temperature and humidity-sensitive components cost
		if (input.TempHumiditySensitivity) {
			if (input.TempHumiditySensitivity === "Low") {
				finalCost += assemblyRateCard.tempHumiditySensitive.low;
			} else if (input.TempHumiditySensitivity === "Medium") {
				finalCost += assemblyRateCard.tempHumiditySensitive.moderate;
			} else if (input.TempHumiditySensitivity === "High") {
				finalCost += assemblyRateCard.tempHumiditySensitive.high;
			}
		}

		// Add de-panel cost
		if (input.DePanel === "Yes" && input.PcbsPerPanel) {
			if (input.PcbsPerPanel <= 1) {
				finalCost += assemblyRateCard.dePanel[1];
			} else if (input.PcbsPerPanel >= 2 && input.PcbsPerPanel <= 5) {
				finalCost += assemblyRateCard.dePanel[2_5];
			} else if (input.PcbsPerPanel >= 6 && input.PcbsPerPanel <= 10) {
				finalCost += assemblyRateCard.dePanel[6_10];
			} else {
				finalCost += assemblyRateCard.dePanel.above10;
			}
		}

		// Add conformal coating cost
		if (input.BoardType === "Single PCB") {
			finalCost += assemblyRateCard.conformalCoating[input.ConformalCoating] * input.OrderedQty;
		} else if (input.BoardType === "Panel" && input.PcbsPerPanel) {
			finalCost +=
				assemblyRateCard.conformalCoating[input.ConformalCoating] * input.OrderedQty * input.PcbsPerPanel;
		}

		// Add functional testing cost
		if (input.BoardType === "Single PCB") {
			if (input.FunctionalTest === "Yes") {
				finalCost += assemblyRateCard.functionalTesting * input.OrderedQty;
			}
		} else if (input.BoardType === "Panel" && input.PcbsPerPanel) {
			if (input.FunctionalTest === "Yes") {
				finalCost += assemblyRateCard.functionalTesting * input.OrderedQty * input.PcbsPerPanel;
			}
		}

		// Add turnaround time cost
		if (input.TurnaroundTime === "Standard 5-7 days") {
			finalCost += assemblyRateCard.turnaroundTime.standard;
		} else if (input.TurnaroundTime === "Expedited 3-4 days") {
			finalCost += assemblyRateCard.turnaroundTime.expedited;
		}

		// Add one-time setup charges
		if (input.BoardType === "Single PCB") {
			setupCharges += assemblyRateCard.oneTimeSetupCharges.single;
		} else if (input.BoardType === "Panel" && input.PcbsPerPanel) {
			if (input.PcbsPerPanel <= 2) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel2;
			} else if (input.PcbsPerPanel >= 3 && input.PcbsPerPanel <= 5) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel3_5;
			} else if (input.PcbsPerPanel >= 6 && input.PcbsPerPanel <= 10) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel6_10;
			} else {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel10_above;
			}
		}

		// TODO: componentsProcurement

		return { assemblyCost: finalCost, setupCost: setupCharges };
	}),
});
