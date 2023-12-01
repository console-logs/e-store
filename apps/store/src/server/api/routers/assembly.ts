import { assemblyRateCard } from "@/lib/rateCards";
import { PcbAssemblyFabSpecsTypeSchema } from "@/schema/pcb";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const pcbAssemblyRouter = createTRPCRouter({
	getPrice: publicProcedure.input(PcbAssemblyFabSpecsTypeSchema).query(({ input }) => {
		// Calculate the cost based on the input parameters and rate card
		let finalCost = 0;
		let setupCharges = 0;

		// set unused fields to null
		if (input.boardType === "Single PCB") {
			input.pcbsPerPanel = null;
		}

		// Add board type cost (base charge)
		if (input.boardType === "Single PCB") {
			finalCost += assemblyRateCard.boardType.single;
		} else if (input.boardType === "Panel" && input.pcbsPerPanel) {
			if (input.pcbsPerPanel <= 2) {
				finalCost += assemblyRateCard.boardType.panel[2];
			} else if (input.pcbsPerPanel >= 3 && input.pcbsPerPanel <= 5) {
				finalCost += assemblyRateCard.boardType.panel[3_5];
			} else if (input.pcbsPerPanel >= 6 && input.pcbsPerPanel <= 10) {
				finalCost += assemblyRateCard.boardType.panel[6_10];
			} else {
				finalCost += assemblyRateCard.boardType.panel.above10;
			}
		}

		// Add assembly sides cost
		if (input.boardType === "Single PCB") {
			finalCost += assemblyRateCard.assemblySides[input.assemblySides];
		} else if (input.boardType === "Panel" && input.pcbsPerPanel) {
			finalCost += assemblyRateCard.assemblySides[input.assemblySides] * input.pcbsPerPanel;
		}

		// Add quantity cost
		if (input.quantity <= 10) {
			finalCost += assemblyRateCard.quantity.upTo10 * input.quantity;
		} else if (input.quantity >= 11 && input.quantity <= 50) {
			finalCost += assemblyRateCard.quantity[11_50] * input.quantity;
		} else if (input.quantity >= 51 && input.quantity <= 100) {
			finalCost += assemblyRateCard.quantity[51_100] * input.quantity;
		} else if (input.quantity >= 101 && input.quantity <= 500) {
			finalCost += assemblyRateCard.quantity[101_500] * input.quantity;
		} else {
			finalCost += assemblyRateCard.quantity.above500 * input.quantity;
		}

		// Add unique components cost
		if (input.numOfUniqueComponents <= 5) {
			finalCost += assemblyRateCard.uniqueComponents.upTo5;
		} else if (input.numOfUniqueComponents >= 6 && input.numOfUniqueComponents <= 10) {
			finalCost += assemblyRateCard.uniqueComponents[6_10];
		} else if (input.numOfUniqueComponents >= 11 && input.numOfUniqueComponents <= 20) {
			finalCost += assemblyRateCard.uniqueComponents[11_20];
		} else {
			finalCost += assemblyRateCard.uniqueComponents.above20;
		}

		// Add SMD parts cost
		if (input.numOfSmdComponents >= 11 && input.numOfSmdComponents <= 20) {
			finalCost += assemblyRateCard.smdParts[11_20];
		} else if (input.numOfSmdComponents >= 21 && input.numOfSmdComponents <= 50) {
			finalCost += assemblyRateCard.smdParts[21_50];
		} else if (input.numOfSmdComponents > 50) {
			finalCost += assemblyRateCard.smdParts.above50;
		}

		// Add BGA/QFP parts cost
		if (input.numOfBgaComponents >= 3 && input.numOfBgaComponents <= 5) {
			finalCost += assemblyRateCard.bgaQfpParts[3_5];
		} else if (input.numOfBgaComponents > 5) {
			finalCost += assemblyRateCard.bgaQfpParts.above5;
		}

		// Add through-hole parts cost
		if (input.numOfThroughHoleComponents >= 6 && input.numOfThroughHoleComponents <= 10) {
			finalCost += assemblyRateCard.throughHoleParts[6_10];
		} else if (input.numOfThroughHoleComponents >= 11 && input.numOfThroughHoleComponents <= 20) {
			finalCost += assemblyRateCard.throughHoleParts[11_20];
		} else if (input.numOfThroughHoleComponents > 20) {
			finalCost += assemblyRateCard.throughHoleParts.above20;
		}

		// Add temperature and humidity-sensitive components cost
		if (input.tempHumiditySensitivity) {
			if (input.tempHumiditySensitivity === "Low") {
				finalCost += assemblyRateCard.tempHumiditySensitive.low;
			} else if (input.tempHumiditySensitivity === "Medium") {
				finalCost += assemblyRateCard.tempHumiditySensitive.moderate;
			} else if (input.tempHumiditySensitivity === "High") {
				finalCost += assemblyRateCard.tempHumiditySensitive.high;
			}
		}

		// Add de-panel cost
		if (input.dePanel === "Yes" && input.pcbsPerPanel) {
			if (input.pcbsPerPanel <= 1) {
				finalCost += assemblyRateCard.dePanel[1];
			} else if (input.pcbsPerPanel >= 2 && input.pcbsPerPanel <= 5) {
				finalCost += assemblyRateCard.dePanel[2_5];
			} else if (input.pcbsPerPanel >= 6 && input.pcbsPerPanel <= 10) {
				finalCost += assemblyRateCard.dePanel[6_10];
			} else {
				finalCost += assemblyRateCard.dePanel.above10;
			}
		}

		// Add conformal coating cost
		if (input.boardType === "Single PCB") {
			finalCost += assemblyRateCard.conformalCoating[input.conformalCoating] * input.quantity;
		} else if (input.boardType === "Panel" && input.pcbsPerPanel) {
			finalCost +=
				assemblyRateCard.conformalCoating[input.conformalCoating] * input.quantity * input.pcbsPerPanel;
		}

		// Add functional testing cost
		if (input.boardType === "Single PCB") {
			if (input.functionalTest === "Yes") {
				finalCost += assemblyRateCard.functionalTesting * input.quantity;
			}
		} else if (input.boardType === "Panel" && input.pcbsPerPanel) {
			if (input.functionalTest === "Yes") {
				finalCost += assemblyRateCard.functionalTesting * input.quantity * input.pcbsPerPanel;
			}
		}

		// Add turnaround time cost
		if (input.turnaroundTime === "Standard 5-7 days") {
			finalCost += assemblyRateCard.turnaroundTime.standard;
		} else if (input.turnaroundTime === "Expedited 3-4 days") {
			finalCost += assemblyRateCard.turnaroundTime.expedited;
		}

		// Add one-time setup charges
		if (input.boardType === "Single PCB") {
			setupCharges += assemblyRateCard.oneTimeSetupCharges.single;
		} else if (input.boardType === "Panel" && input.pcbsPerPanel) {
			if (input.pcbsPerPanel <= 2) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel2;
			} else if (input.pcbsPerPanel >= 3 && input.pcbsPerPanel <= 5) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel3_5;
			} else if (input.pcbsPerPanel >= 6 && input.pcbsPerPanel <= 10) {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel6_10;
			} else {
				setupCharges += assemblyRateCard.oneTimeSetupCharges.panel10_above;
			}
		}

		// TODO: componentsProcurement

		return { assemblyCost: finalCost, setupCost: setupCharges };
	}),
});
