import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: RigidPcbStoreStateType = {
	/* mandatory fields */
	pcbname: "",
	baseMaterial: "FR4",
	layer: 1,
	boardSizeX: 44,
	boardSizeY: 44,
	differentDesignsInPanel: 1,
	designFormat: "Single PCB",
	boardThickness: 0.8,
	soldermask: "Green",
	silkscreen: "White",
	surfaceFinish: "HASL(with lead)",
	outerCuWeight: "1 oz",
	goldFingers: "No",
	castellatedHoles: "No",
	leadTime: "7 Working days",
	dispatchUnit: "PCB",
	calculatedPrice: 2640.19,
	tentativeDispatchDate: getFutureDate(7),
	designFile: "",

	/* conditional fields */
	pcbQty: 5,
	viaCovering: "Tented",
	material: "FR4-Standard TG 135-140",
	boardOutlineTolerance: "±0.2mm(Regular)",
	viaHoles: 10,
	panelQty: 5,
	columns: 1,
	rows: 1,
	singlePiecesQty: 5,
	goldThickness: '1 U"',
	edgeRails: "No",
	edgeRailSize: "5mm",
	panelSizeX: 44,
	panelSizeY: 44,
	thermalConductivity: 1,
	breakDownVoltage: 3000,
	innerCuWeight: "0.5 oz",
	impedenceControl: "No",
	minViaHoleSizeAndDiameter: "0.3mm/(0.4/0.45mm)",
	castellatedHolesEdges: 1,
	chamferedGoldFingers: "No",

	/* dropdown menu options */
	layerOptions: [1, 2, 4, 6, 8, 10],
	baseMaterialOptions: ["FR4", "Aluminum", "CopperCore", "Rogers"],
	designFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	differentDesignsInPanelOptions: [1, 2, 3, 4],
	materialOptions: ["FR4-Standard TG 135-140", "FR-4 TG155"],
	panelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	pcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	boardThicknessOptions: [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0],
	soldermaskOptions: ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"],
	silkscreenOptions: ["White"],
	surfaceFinishOptions: ["HASL(with lead)", "LeadFree HASL", "ENIG"],
	goldFingersOptions: ["No", "Yes"],
	goldThicknessOptions: ['1 U"', '2 U"'],
	edgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	edgeRailSizeOptions: ["5mm", "7mm", "10mm"],
	outerCuWeightOptions: ["1 oz", "2 oz"],
	copperStructure: "Direct Heatsink",
	copperStructureOptions: ["Direct Heatsink"],
	thermalConductivityOptions: [1],
	breakDownVoltageOptions: [3000],
	innerCuWeightOptions: ["0.5 oz", "1 oz", "2 oz"],
	impedenceControlOptions: ["No", "Yes"],
	viaCoveringOptions: ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"],
	minViaHoleSizeAndDiameterOptions: [
		"0.3mm/(0.4/0.45mm)",
		"0.25mm/(0.35/0.40mm)",
		"0.2mm/(0.3/0.35mm)",
		"0.15mm/(0.25/0.3mm)",
	],
	boardOutlineToleranceOptions: ["±0.2mm(Regular)", "±0.1mm(Precision)"],
	castellatedHolesOptions: ["No", "Yes"],
	castellatedHolesEdgesOptions: [1, 2, 3, 4],
	chamferedGoldFingersOptions: ["No", "Yes"],
	leadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	dispatchUnitOptions: ["PCB", "Panel"],
};

const rigidPcbSlice = createSlice({
	name: "rigidPcb",
	initialState,
	reducers: {
		setPcbName: (state, action: PayloadAction<string>) => {
			state.pcbname = action.payload;
		},
		setLayer: (state, action: PayloadAction<1 | 10 | 6 | 8 | 2 | 4>) => {
			state.layer = action.payload;
		},
		setBaseMaterial: (state, action: PayloadAction<"FR4" | "Aluminum" | "CopperCore" | "Rogers">) => {
			state.baseMaterial = action.payload;
		},
		setDesignFormat: (
			state,
			action: PayloadAction<"Single PCB" | "Panel by Customer" | "Panel by Manufacturer">
		) => {
			state.designFormat = action.payload;
		},
		setDifferentDesignsInPanel: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
			state.differentDesignsInPanel = action.payload;
		},
		setMaterial: (
			state,
			action: PayloadAction<
				"FR4-Standard TG 135-140" | "FR-4 TG155" | "RO4350B (Dk=3.48, Df=0.0037)" | "FR-4 TG170"
			>
		) => {
			state.material = action.payload;
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.boardSizeX = action.payload;
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.boardSizeY = action.payload;
		},
		setPanelQty: (
			state,
			action: PayloadAction<
				| 5
				| 10
				| 15
				| 20
				| 25
				| 30
				| 50
				| 75
				| 100
				| 125
				| 150
				| 200
				| 250
				| 300
				| 400
				| 450
				| 500
				| 600
				| 700
				| 800
				| 900
				| 1000
				| 1500
				| 2000
			>
		) => {
			state.panelQty = action.payload;
		},
		setColumns: (state, action: PayloadAction<number>) => {
			state.columns = action.payload;
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.rows = action.payload;
		},
		setPcbQty: (
			state,
			action: PayloadAction<
				| 5
				| 10
				| 15
				| 20
				| 25
				| 30
				| 50
				| 75
				| 100
				| 125
				| 150
				| 200
				| 250
				| 300
				| 400
				| 450
				| 500
				| 600
				| 700
				| 800
				| 900
				| 1000
				| 1500
				| 2000
			>
		) => {
			state.pcbQty = action.payload;
		},
		setBoardThickness: (
			state,
			action: PayloadAction<0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0>
		) => {
			state.boardThickness = action.payload;
		},
		setSoldermask: (
			state,
			action: PayloadAction<"Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White">
		) => {
			state.soldermask = action.payload;
		},
		setSilkscreen: (state, action: PayloadAction<"White" | "Black">) => {
			state.silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<"HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP">) => {
			state.surfaceFinish = action.payload;
		},
		setGoldFingers: (state, action: PayloadAction<"Yes" | "No">) => {
			state.goldFingers = action.payload;
		},
		setGoldThickness: (state, action: PayloadAction<'1 U"' | '2 U"'>) => {
			state.goldThickness = action.payload;
		},
		setEdgeRails: (state, action: PayloadAction<"No" | "On 2 Sides" | "On 4 Sides">) => {
			state.edgeRails = action.payload;
		},
		setEdgeRailSize: (state, action: PayloadAction<"5mm" | "7mm" | "10mm">) => {
			state.edgeRailSize = action.payload;
		},
		setOuterCuWeight: (state, action: PayloadAction<"1 oz" | "2 oz">) => {
			state.outerCuWeight = action.payload;
		},
		setCopperStructure: (state, action: PayloadAction<"Direct Heatsink">) => {
			state.copperStructure = action.payload;
		},
		setThermalConductivity: (state, action: PayloadAction<1 | 380>) => {
			state.thermalConductivity = action.payload;
		},
		setBreakdownVoltage: (state, action: PayloadAction<3000>) => {
			state.breakDownVoltage = action.payload;
		},
		setInnerCuWeight: (state, action: PayloadAction<"0.5 oz" | "1 oz" | "2 oz">) => {
			state.innerCuWeight = action.payload;
		},
		setImpedenceControl: (state, action: PayloadAction<"Yes" | "No">) => {
			state.impedenceControl = action.payload;
		},
		setViaCovering: (
			state,
			action: PayloadAction<
				| "Tented"
				| "Untented"
				| "Plugged"
				| "Epoxy Filled & Capped"
				| "Epoxy Filled & Untented"
				| "Copper paste Filled & Capped"
			>
		) => {
			state.viaCovering = action.payload;
		},
		setMinViaHoleSizeAndDiameter: (
			state,
			action: PayloadAction<
				"0.3mm/(0.4/0.45mm)" | "0.25mm/(0.35/0.40mm)" | "0.2mm/(0.3/0.35mm)" | "0.15mm/(0.25/0.3mm)"
			>
		) => {
			state.minViaHoleSizeAndDiameter = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<"±0.2mm(Regular)" | "±0.1mm(Precision)">) => {
			state.boardOutlineTolerance = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.viaHoles = action.payload;
		},
		setCastellatedHoles: (state, action: PayloadAction<"Yes" | "No">) => {
			state.castellatedHoles = action.payload;
		},
		setCastellatedHolesEdges: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
			state.castellatedHolesEdges = action.payload;
		},
		setChamferedGoldFingers: (state, action: PayloadAction<"Yes" | "No">) => {
			state.chamferedGoldFingers = action.payload;
		},
		setLeadTime: (
			state,
			action: PayloadAction<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">
		) => {
			state.leadTime = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<"PCB" | "Panel">) => {
			state.dispatchUnit = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.calculatedPrice = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.tentativeDispatchDate = action.payload;
		},
		setDesignFile: (state, action: PayloadAction<string>) => {
			state.designFile = action.payload;
		},
		/***************** Dependent fields update	**********************/

		updateMaterial: state => {
			if (state.baseMaterial === "FR4") {
				if (state.layer <= 6) {
					state.materialOptions = ["FR4-Standard TG 135-140", "FR-4 TG155"];
				} else if (state.layer === 8) {
					state.materialOptions = ["FR-4 TG155"];
				} else {
					state.materialOptions = ["FR-4 TG170"];
				}
			} else if (state.baseMaterial === "Rogers") {
				state.materialOptions = ["RO4350B (Dk=3.48, Df=0.0037)"];
			}
			state.material = state.materialOptions[0]!;
		},
		updateSurfaceFinish: state => {
			if (state.baseMaterial === "FR4") {
				if (state.layer >= 6 || state.goldFingers === "Yes") {
					state.surfaceFinishOptions = ["ENIG"];
				} else {
					state.surfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL", "ENIG"];
				}
			}
			if (state.baseMaterial === "Aluminum") {
				state.surfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL"];
			}
			if (state.baseMaterial === "CopperCore") {
				state.surfaceFinishOptions = ["OSP"];
			}
			if (state.baseMaterial === "Rogers") {
				state.surfaceFinishOptions = ["ENIG"];
			}
			state.surfaceFinish = state.surfaceFinishOptions[0]!;
		},
		updateBoardThickness: state => {
			if (state.baseMaterial === "FR4") {
				switch (state.layer) {
					case 1:
					case 4:
					case 6:
					case 8:
						state.boardThicknessOptions = [0.8, 1.0, 1.2, 1.6, 2.0];
						break;
					case 10:
						state.boardThicknessOptions = [1.0, 1.2, 1.6, 2.0];
						break;
					case 2:
					default:
						state.boardThicknessOptions = [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0];
						break;
				}
			}
			if (state.baseMaterial === "Aluminum" || state.baseMaterial === "CopperCore") {
				state.boardThicknessOptions = [1.0, 1.2, 1.6];
			}
			if (state.baseMaterial === "Rogers") {
				state.boardThicknessOptions = [0.51, 0.76, 1.52];
			}
			state.boardThickness = state.boardThicknessOptions[0]!;
		},
		updateLayer: state => {
			switch (state.baseMaterial) {
				case "Aluminum":
				case "CopperCore":
					state.layerOptions = [1];
					break;
				case "Rogers":
					state.layerOptions = [2];
					break;
				default: // FR4
					state.layerOptions = [1, 2, 4, 6, 8, 10];
					break;
			}
			state.layer = state.layerOptions[0]!;
		},
		updateSoldermask: state => {
			if (state.baseMaterial === "FR4") {
				state.soldermaskOptions = ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"];
			}
			if (state.baseMaterial === "Aluminum") {
				state.soldermaskOptions = ["White"];
			}
			if (state.baseMaterial === "CopperCore") {
				state.soldermaskOptions = ["White"];
			}
			if (state.baseMaterial === "Rogers") {
				state.soldermaskOptions = ["Green"];
			}
			state.soldermask = state.soldermaskOptions[0]!;
		},
		updateSilkscreen: state => {
			if (state.baseMaterial === "FR4") {
				state.silkscreenOptions = ["White"];
			}
			if (state.baseMaterial === "Aluminum") {
				state.silkscreenOptions = ["Black"];
			}
			if (state.baseMaterial === "CopperCore") {
				state.silkscreenOptions = ["Black"];
			}
			if (state.baseMaterial === "Rogers") {
				state.silkscreenOptions = ["White"];
			}
			state.silkscreen = state.silkscreenOptions[0]!;

			// based on soldermask
			if (state.soldermask !== "White") {
				state.silkscreenOptions = ["White"];
			} else {
				state.silkscreenOptions = ["Black"];
			}
			state.silkscreen = state.silkscreenOptions[0]!;
		},
		updateGoldFingers: state => {
			if (state.baseMaterial === "FR4") {
				state.goldFingersOptions = ["No", "Yes"];
			}
			if (state.baseMaterial === "Aluminum") {
				state.goldFingersOptions = ["No"];
			}
			if (state.baseMaterial === "CopperCore") {
				state.goldFingersOptions = ["No"];
			}
			if (state.baseMaterial === "Rogers") {
				state.goldFingersOptions = ["No"];
			}
			state.goldFingers = state.goldFingersOptions[0]!;
		},
		updateDifferentDesignsInPanel: state => {
			if (state.designFormat === "Panel by Manufacturer" || state.designFormat === "Single PCB") {
				state.differentDesignsInPanelOptions = [1];
			}
			if (state.designFormat === "Panel by Customer") {
				state.differentDesignsInPanelOptions = [1, 2, 3, 4];
			}
			state.differentDesignsInPanel = state.differentDesignsInPanelOptions[0]!;
		},
		updateDesignFormatOption: state => {
			if (state.differentDesignsInPanel > 1) {
				state.designFormatOptions = ["Panel by Customer"];
			} else {
				state.designFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
			}
			state.designFormat = state.designFormatOptions[0]!;
		},
		updateSinglePiecesQty: state => {
			state.singlePiecesQty = state.panelQty * state.columns * state.rows;
		},
		updatePanelSize: state => {
			if (state.edgeRails === "No") {
				state.panelSizeX = state.boardSizeX * state.columns;
				state.panelSizeY = state.boardSizeY * state.rows;
			} else if (state.edgeRails === "On 2 Sides") {
				state.panelSizeX = state.boardSizeX * state.columns + parseInt(state.edgeRailSize, 10) * 2;
				state.panelSizeY = state.boardSizeY * state.rows;
			} else if (state.edgeRails === "On 4 Sides") {
				state.panelSizeX = state.boardSizeX * state.columns + parseInt(state.edgeRailSize, 10) * 2;
				state.panelSizeY = state.boardSizeY * state.rows + parseInt(state.edgeRailSize, 10) * 2;
			}
		},
		updateOuterCuWeight: state => {
			if (state.baseMaterial === "FR4") {
				if (state.layer === 2 || state.layer === 4 || state.layer === 6) {
					state.outerCuWeightOptions = ["1 oz", "2 oz"];
				} else {
					state.outerCuWeightOptions = ["1 oz"];
				}
			} else if (
				state.baseMaterial === "Aluminum" ||
				state.baseMaterial === "CopperCore" ||
				state.baseMaterial === "Rogers"
			) {
				state.outerCuWeightOptions = ["1 oz"];
			}
			state.outerCuWeight = state.outerCuWeightOptions[0]!;
		},
		updateThermalConductivity: state => {
			if (state.baseMaterial === "Aluminum") {
				state.thermalConductivityOptions = [1];
			}
			if (state.baseMaterial === "CopperCore") {
				state.thermalConductivityOptions = [380];
			}
			state.thermalConductivity = state.thermalConductivityOptions[0]!;
		},
		updateInnerCuWeight: state => {
			if (state.layer === 4 || state.layer === 6) {
				state.innerCuWeightOptions = ["0.5 oz", "1 oz", "2 oz"];
			} else {
				state.innerCuWeightOptions = ["0.5 oz", "1 oz"];
			}
			state.innerCuWeight = state.innerCuWeightOptions[0]!;
		},
		updateViaCovering: state => {
			if (state.baseMaterial === "FR4") {
				if (state.layer === 1) {
					state.viaCoveringOptions = ["Tented", "Untented"];
				}
				if (state.layer === 2) {
					state.viaCoveringOptions = ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"];
				}
				if (state.layer === 4) {
					state.viaCoveringOptions = [
						"Tented",
						"Untented",
						"Epoxy Filled & Capped",
						"Copper paste Filled & Capped",
					];
				}
				if (state.layer >= 6) {
					state.viaCoveringOptions = [
						"Epoxy Filled & Untented",
						"Epoxy Filled & Capped",
						"Copper paste Filled & Capped",
					];
				}
			}
			if (state.baseMaterial === "Rogers") {
				state.viaCoveringOptions = ["Tented", "Untented"];
			}
			state.viaCovering = state.viaCoveringOptions[0]!;
		},
		updateCastellatedHoles: state => {
			if (state.baseMaterial === "FR4") {
				if (state.layer < 2) {
					state.castellatedHolesOptions = ["No"];
				} else {
					state.castellatedHolesOptions = ["Yes", "No"];
				}
			} else if (
				state.baseMaterial === "Aluminum" ||
				state.baseMaterial === "CopperCore" ||
				state.baseMaterial === "Rogers"
			) {
				state.castellatedHolesOptions = ["No"];
			}
			state.castellatedHoles = state.castellatedHolesOptions[0]!;
		},
		updateChamferedGoldFingers: state => {
			if (state.designFormat === "Panel by Customer") {
				state.chamferedGoldFingersOptions = ["No"];
			} else {
				state.chamferedGoldFingersOptions = ["Yes", "No"];
			}
			state.chamferedGoldFingers = state.chamferedGoldFingersOptions[0]!;
		},
	},
});

export const {
	setPcbName,
	setLayer,
	setBaseMaterial,
	setDesignFormat,
	setDifferentDesignsInPanel,
	setMaterial,
	setBoardSizeX,
	setBoardSizeY,
	setPanelQty,
	setColumns,
	setRows,
	setPcbQty,
	setBoardThickness,
	setSoldermask,
	setSilkscreen,
	setSurfaceFinish,
	setGoldFingers,
	setGoldThickness,
	setEdgeRails,
	setEdgeRailSize,
	setOuterCuWeight,
	setCopperStructure,
	setThermalConductivity,
	setBreakdownVoltage,
	setInnerCuWeight,
	setImpedenceControl,
	setViaCovering,
	setMinViaHoleSizeAndDiameter,
	setBoardOutlineTolerance,
	setViaHoles,
	setCastellatedHoles,
	setCastellatedHolesEdges,
	setChamferedGoldFingers,
	setLeadTime,
	setDispatchUnit,
	setPcbPrice,
	setTentativeDispatchDate,
	setDesignFile,
	updateBoardThickness,
	updateMaterial,
	updateSurfaceFinish,
	updateLayer,
	updateGoldFingers,
	updateSilkscreen,
	updateSoldermask,
	updateDifferentDesignsInPanel,
	updateDesignFormatOption,
	updateSinglePiecesQty,
	updatePanelSize,
	updateOuterCuWeight,
	updateThermalConductivity,
	updateInnerCuWeight,
	updateViaCovering,
	updateCastellatedHoles,
	updateChamferedGoldFingers,
} = rigidPcbSlice.actions;

export default rigidPcbSlice.reducer;

/* Selectors */
export const selectRigidPcbState = (state: ReduxState) => state.rigidPcb;
export const selectPanelSizeX = (state: ReduxState) => state.rigidPcb.panelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.rigidPcb.panelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.rigidPcb.calculatedPrice;
export const selectPanelQty = (state: ReduxState) => state.rigidPcb.panelQty;
export const selectDesignFile = (state: ReduxState) => state.rigidPcb.designFile;
export const selectPcbName = (state: ReduxState) => state.rigidPcb.pcbname;
export const selectBaseMaterial = (state: ReduxState) => state.rigidPcb.baseMaterial;
export const selectLayer = (state: ReduxState) => state.rigidPcb.layer;
export const selectBoardSizeX = (state: ReduxState) => state.rigidPcb.boardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.rigidPcb.boardSizeY;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.rigidPcb.differentDesignsInPanel;
export const selectDesignFormat = (state: ReduxState) => state.rigidPcb.designFormat;
export const selectBoardThickness = (state: ReduxState) => state.rigidPcb.boardThickness;
export const selectSoldermask = (state: ReduxState) => state.rigidPcb.soldermask;
export const selectSilkscreen = (state: ReduxState) => state.rigidPcb.silkscreen;
export const selectSurfaceFinish = (state: ReduxState) => state.rigidPcb.surfaceFinish;
export const selectOuterCuWeight = (state: ReduxState) => state.rigidPcb.outerCuWeight;
export const selectGoldFingers = (state: ReduxState) => state.rigidPcb.goldFingers;
export const selectCastellatedHoles = (state: ReduxState) => state.rigidPcb.castellatedHoles;
export const selectLeadTime = (state: ReduxState) => state.rigidPcb.leadTime;
export const selectDispatchUnit = (state: ReduxState) => state.rigidPcb.dispatchUnit;
export const selectPcbQty = (state: ReduxState) => state.rigidPcb.pcbQty;
export const selectSinglePiecesQty = (state: ReduxState) => state.rigidPcb.singlePiecesQty;
export const selectViaCovering = (state: ReduxState) => state.rigidPcb.viaCovering;
export const selectViaHoles = (state: ReduxState) => state.rigidPcb.viaHoles;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.rigidPcb.boardOutlineTolerance;
export const selectMaterial = (state: ReduxState) => state.rigidPcb.material;
export const selectGoldThickness = (state: ReduxState) => state.rigidPcb.goldThickness;
export const selectEdgeRails = (state: ReduxState) => state.rigidPcb.edgeRails;
export const selectThermalConductivity = (state: ReduxState) => state.rigidPcb.thermalConductivity;
export const selectBreakDownVoltage = (state: ReduxState) => state.rigidPcb.breakDownVoltage;
export const selectInnerCuWeight = (state: ReduxState) => state.rigidPcb.innerCuWeight;
export const selectImpedenceControl = (state: ReduxState) => state.rigidPcb.impedenceControl;
export const selectMinViaHoleSizeAndDiameter = (state: ReduxState) => state.rigidPcb.minViaHoleSizeAndDiameter;
export const selectCastellatedHolesEdges = (state: ReduxState) => state.rigidPcb.castellatedHolesEdges;
export const selectChamferedGoldFingers = (state: ReduxState) => state.rigidPcb.chamferedGoldFingers;
export const selectEdgeRailSize = (state: ReduxState) => state.rigidPcb.edgeRailSize;
export const selectCopperStructure = (state: ReduxState) => state.rigidPcb.copperStructure;
export const selectColumns = (state: ReduxState) => state.rigidPcb.columns;
export const selectRows = (state: ReduxState) => state.rigidPcb.rows;
export const selectTentativeDispatchDate = (state: ReduxState) => state.rigidPcb.tentativeDispatchDate;

/* dropdown menu selectors */
export const selectBaseMaterialOptions = (state: ReduxState) => state.rigidPcb.baseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.rigidPcb.boardOutlineToleranceOptions;
export const selectCastellatedHolesOptions = (state: ReduxState) => state.rigidPcb.castellatedHolesOptions;
export const selectChamferedGoldFingersOptions = (state: ReduxState) => state.rigidPcb.chamferedGoldFingersOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.rigidPcb.edgeRailsOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.rigidPcb.edgeRailSizeOptions;
export const selectMaterialOptions = (state: ReduxState) => state.rigidPcb.materialOptions;
export const selectThermalConductivityOptions = (state: ReduxState) => state.rigidPcb.thermalConductivityOptions;
export const selectViaCoveringOptions = (state: ReduxState) => state.rigidPcb.viaCoveringOptions;
export const selectCastellatedHolesEdgesOptions = (state: ReduxState) => state.rigidPcb.castellatedHolesEdgesOptions;
export const selectCopperStructureOptions = (state: ReduxState) => state.rigidPcb.copperStructureOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.rigidPcb.boardThicknessOptions;
export const selectBreakDownVoltageOptions = (state: ReduxState) => state.rigidPcb.breakDownVoltageOptions;
export const selectDesignFormatOptions = (state: ReduxState) => state.rigidPcb.designFormatOptions;
export const selectDifferentDesignsInPanelOptions = (state: ReduxState) =>
	state.rigidPcb.differentDesignsInPanelOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.rigidPcb.dispatchUnitOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.rigidPcb.goldThicknessOptions;
export const selectImpedenceControlOptions = (state: ReduxState) => state.rigidPcb.impedenceControlOptions;
export const selectInnerCuWeightOptions = (state: ReduxState) => state.rigidPcb.innerCuWeightOptions;
export const selectLayerOptions = (state: ReduxState) => state.rigidPcb.layerOptions;
export const selectMinViaHoleSizeAndDiameterOptions = (state: ReduxState) =>
	state.rigidPcb.minViaHoleSizeAndDiameterOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.rigidPcb.outerCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.rigidPcb.leadTimeOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.rigidPcb.pcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.rigidPcb.silkscreenOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.rigidPcb.surfaceFinishOptions;
export const selectSoldermaskOptions = (state: ReduxState) => state.rigidPcb.soldermaskOptions;
export const selectGoldFingersOptions = (state: ReduxState) => state.rigidPcb.goldFingersOptions;
export const selectPanelQtyOptions = (state: ReduxState) => state.rigidPcb.panelQtyOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectRigidPcbMemoized = createSelector([selectRigidPcbState], (rigidPcb) => {
	const rigidPcbFabSpecs: RigidPcbFabSpecsType = {
		pcbname: rigidPcb.pcbname,
		layer: rigidPcb.layer,
		baseMaterial: rigidPcb.baseMaterial,
		designFormat: rigidPcb.designFormat,
		differentDesignsInPanel: rigidPcb.differentDesignsInPanel,
		material: rigidPcb.material,
		boardSizeX: rigidPcb.boardSizeX,
		boardSizeY: rigidPcb.boardSizeY,
		panelQty: rigidPcb.panelQty,
		columns: rigidPcb.columns,
		rows: rigidPcb.rows,
		singlePiecesQty: rigidPcb.singlePiecesQty,
		pcbQty: rigidPcb.pcbQty,
		boardThickness: rigidPcb.boardThickness,
		soldermask: rigidPcb.soldermask,
		silkscreen: rigidPcb.silkscreen,
		surfaceFinish: rigidPcb.surfaceFinish,
		goldFingers: rigidPcb.goldFingers,
		goldThickness: rigidPcb.goldThickness,
		edgeRails: rigidPcb.edgeRails,
		edgeRailSize: rigidPcb.edgeRailSize,
		panelSizeX: rigidPcb.panelSizeX,
		panelSizeY: rigidPcb.panelSizeY,
		outerCuWeight: rigidPcb.outerCuWeight,
		copperStructure: rigidPcb.copperStructure,
		thermalConductivity: rigidPcb.thermalConductivity,
		breakDownVoltage: rigidPcb.breakDownVoltage,
		innerCuWeight: rigidPcb.innerCuWeight,
		impedenceControl: rigidPcb.impedenceControl,
		viaCovering: rigidPcb.viaCovering,
		minViaHoleSizeAndDiameter: rigidPcb.minViaHoleSizeAndDiameter,
		boardOutlineTolerance: rigidPcb.boardOutlineTolerance,
		viaHoles: rigidPcb.viaHoles,
		castellatedHoles: rigidPcb.castellatedHoles,
		castellatedHolesEdges: rigidPcb.castellatedHolesEdges,
		chamferedGoldFingers: rigidPcb.chamferedGoldFingers,
		leadTime: rigidPcb.leadTime,
		dispatchUnit: rigidPcb.dispatchUnit,
		calculatedPrice: rigidPcb.calculatedPrice,
		designFile: rigidPcb.designFile,
	};
	return rigidPcbFabSpecs;
});
