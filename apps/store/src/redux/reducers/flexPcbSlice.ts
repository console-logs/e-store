import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: FlexPcbStoreStateType = {
	type: "Flex",
	pcbname: "",
	baseMaterial: "Flex (Polyimide)",
	baseMaterialOptions: ["Flex (Polyimide)"],
	layer: 1,
	layerOptions: [1, 2],
	boardSizeX: 44,
	boardSizeY: 44,
	pcbQty: 5,
	pcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	panelQty: 5,
	panelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	singlePiecesQty: 5,
	designFormat: "Single PCB",
	designFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	differentDesignsInPanel: 1,
	differentDesignsInPanelOptions: [1, 2, 3, 4],
	columns: 1,
	rows: 1,
	edgeRails: "No",
	edgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	edgeRailSize: "5mm",
	panelSizeX: 44,
	panelSizeY: 44,
	boardThickness: 0.07,
	boardThicknessOptions: [0.07, 0.11],
	coverlay: "Yellow",
	coverlayOptions: ["Yellow"],
	silkscreen: "White",
	silkscreenOptions: ["White"],
	surfaceFinish: "ENIG",
	surfaceFinishOptions: ["ENIG"],
	copperType: "Electro-deposited",
	copperTypeOptions: ["Electro-deposited"],
	goldThickness: '1 U"',
	goldThicknessOptions: ['1 U"', '2 U"'],
	outerCuWeight: "0.5 oz",
	outerCuWeightOptions: ["0.5 oz"],
	coverlayThickness: "PI:12.5um/AD:15um",
	coverlayThicknessOptions: ["PI:12.5um/AD:15um"],
	stiffner: ["Without"],
	stiffnerOptions: ["Without", "Polyimide", "FR4", "Stainless Steel", "3M Tape"],
	polyimideThickness: 0.1,
	polyimideThicknessOptions: [0.1, 0.15, 0.2, 0.225, 0.25],
	threeMTapeThickness: "3M468 (0.13mm)",
	threeMTapeThicknessOptions: ["3M468 (0.13mm)", "3M9077 (HT, 0.05mm)"],
	stainlessSteelThickness: 0.1,
	stainlessSteelThicknessOptions: [0.1, 0.2, 0.3],
	fr4Thickness: 0.1,
	fr4ThicknessOptions: [0.1, 0.2],
	emiShieldingFilm: "Without",
	emiShieldingFilmOptions: ["Without", "Both sides (Black, 18um)", "Single side (Black, 18um)"],
	cuttingMethod: "Laser Cutting",
	cuttingMethodOptions: ["Laser Cutting"],
	boardOutlineTolerance: "±0.1mm",
	boardOutlineToleranceOptions: ["±0.1mm", "±0.05mm"],
	designFile: "",
	dispatchUnit: "PCB",
	dispatchUnitOptions: ["PCB", "Panel"],
	leadTime: "3 Working days",
	leadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	viaHoles: 4,
	edgeRailSizeOptions: ["5mm", "7mm", "10mm"],
	calculatedPrice: 1165.11,
	tentativeDispatchDate: getFutureDate(3),
};

const flexPcbSlice = createSlice({
	name: "flexPcb",
	initialState,
	reducers: {
		setPcbName: (state, action: PayloadAction<string>) => {
			state.pcbname = action.payload;
		},
		setBaseMaterial: (state, action: PayloadAction<"Flex (Polyimide)">) => {
			state.baseMaterial = action.payload;
		},
		setLayer: (state, action: PayloadAction<1 | 2>) => {
			state.layer = action.payload;
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.boardSizeX = action.payload;
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.boardSizeY = action.payload;
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
		setDesignFormat: (
			state,
			action: PayloadAction<"Single PCB" | "Panel by Customer" | "Panel by Manufacturer">
		) => {
			state.designFormat = action.payload;
		},
		setDifferentDesignsInPanel: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
			state.differentDesignsInPanel = action.payload;
		},
		setColumns: (state, action: PayloadAction<number>) => {
			state.columns = action.payload;
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.rows = action.payload;
		},
		setEdgeRails: (state, action: PayloadAction<"No" | "On 2 Sides" | "On 4 Sides">) => {
			state.edgeRails = action.payload;
		},
		setEdgeRailSize: (state, action: PayloadAction<"5mm" | "7mm" | "10mm">) => {
			state.edgeRailSize = action.payload;
		},
		setBoardThickness: (state, action: PayloadAction<0.07 | 0.11 | 0.12 | 0.2>) => {
			state.boardThickness = action.payload;
		},
		setCoverlay: (state, action: PayloadAction<"Yellow">) => {
			state.coverlay = action.payload;
		},
		setSilkscreen: (state, action: PayloadAction<"White">) => {
			state.silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<"ENIG">) => {
			state.surfaceFinish = action.payload;
		},
		setCopperType: (state, action: PayloadAction<"Electro-deposited">) => {
			state.copperType = action.payload;
		},
		setGoldThickness: (state, action: PayloadAction<'1 U"' | '2 U"'>) => {
			state.goldThickness = action.payload;
		},
		setOuterCuWeight: (state, action: PayloadAction<"0.5 oz" | "1/3 oz" | "1.0 oz">) => {
			state.outerCuWeight = action.payload;
		},
		setCoverlayThickness: (state, action: PayloadAction<"PI:12.5um/AD:15um" | "PI:25um/AD:25um">) => {
			state.coverlayThickness = action.payload;
		},
		setStiffner: (
			state,
			action: PayloadAction<Array<"Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape">>
		) => {
			state.stiffner = action.payload;
		},
		setPolyimideThickness: (state, action: PayloadAction<0.1 | 0.15 | 0.2 | 0.225 | 0.25>) => {
			state.polyimideThickness = action.payload;
		},
		setThreeMTapeThickness: (state, action: PayloadAction<"3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)">) => {
			state.threeMTapeThickness = action.payload;
		},
		setStainlessSteelThickness: (state, action: PayloadAction<0.1 | 0.2 | 0.3>) => {
			state.stainlessSteelThickness = action.payload;
		},
		setFr4Thickness: (state, action: PayloadAction<0.1 | 0.2>) => {
			state.fr4Thickness = action.payload;
		},
		setEmiShieldingFilm: (
			state,
			action: PayloadAction<"Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)">
		) => {
			state.emiShieldingFilm = action.payload;
		},
		setCuttingMethod: (state, action: PayloadAction<"Laser Cutting">) => {
			state.cuttingMethod = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<"±0.1mm" | "±0.05mm">) => {
			state.boardOutlineTolerance = action.payload;
		},
		setDesignFile: (state, action: PayloadAction<string>) => {
			state.designFile = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<"PCB" | "Panel">) => {
			state.dispatchUnit = action.payload;
		},
		setLeadTime: (
			state,
			action: PayloadAction<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">
		) => {
			state.leadTime = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.viaHoles = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.calculatedPrice = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.tentativeDispatchDate = action.payload;
		},
		/***********************************************************/
		updateDifferentDesignsInPanel: state => {
			if (state.designFormat === "Panel by Manufacturer" || state.designFormat === "Single PCB") {
				state.differentDesignsInPanelOptions = [1];
			}
			if (state.designFormat === "Panel by Customer") {
				state.differentDesignsInPanelOptions = [1, 2, 3, 4];
			}
			state.differentDesignsInPanel = state.differentDesignsInPanelOptions[0]!;
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
		updateSinglePiecesQty: state => {
			state.singlePiecesQty = state.panelQty * state.columns * state.rows;
		},
		updateDesignFormatOption: state => {
			if (state.differentDesignsInPanel > 1) {
				state.designFormatOptions = ["Panel by Customer"];
			} else {
				state.designFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
			}
			state.designFormat = state.designFormatOptions[0]!;
		},
		updatePcbThickness: state => {
			if (state.layer === 1) {
				state.boardThicknessOptions = [0.07, 0.11];
			} else {
				state.boardThicknessOptions = [0.11, 0.12, 0.2];
			}
			state.boardThickness = state.boardThicknessOptions[0]!;
		},
		updateOuterCuWeight: state => {
			if (state.layer === 1) {
				if (state.boardThickness === 0.07) {
					state.outerCuWeightOptions = ["0.5 oz"];
				} else {
					state.outerCuWeightOptions = ["1.0 oz"];
				}
			}
			if (state.layer === 2) {
				if (state.boardThickness === 0.11) {
					state.outerCuWeightOptions = ["1/3 oz"];
				}
				if (state.boardThickness === 0.12) {
					state.outerCuWeightOptions = ["0.5 oz"];
				}
				if (state.boardThickness === 0.2) {
					state.outerCuWeightOptions = ["1.0 oz"];
				}
			}
			state.outerCuWeight = state.outerCuWeightOptions[0]!;
		},
		updateCoverlayThickness: state => {
			if (state.layer === 1) {
				if (state.boardThickness === 0.07) {
					state.coverlayThicknessOptions = ["PI:12.5um/AD:15um"];
				} else {
					state.coverlayThicknessOptions = ["PI:25um/AD:25um"];
				}
			}
			if (state.layer === 2) {
				if (state.boardThickness === 0.11 || state.boardThickness === 0.12) {
					state.coverlayThicknessOptions = ["PI:12.5um/AD:15um"];
				}
				if (state.boardThickness === 0.2) {
					state.coverlayThicknessOptions = ["PI:25um/AD:25um"];
				}
			}
			state.coverlayThickness = state.coverlayThicknessOptions[0]!;
		},
	},
});

export const {
	setPcbName,
	setDesignFormat,
	setLayer,
	setBaseMaterial,
	setBoardOutlineTolerance,
	setBoardSizeX,
	setBoardSizeY,
	setBoardThickness,
	setColumns,
	setCopperType,
	setCoverlay,
	setCoverlayThickness,
	setCuttingMethod,
	setDesignFile,
	setDifferentDesignsInPanel,
	setDispatchUnit,
	setEdgeRailSize,
	setEdgeRails,
	setEmiShieldingFilm,
	setFr4Thickness,
	setGoldThickness,
	setLeadTime,
	setOuterCuWeight,
	setPanelQty,
	setPcbQty,
	setPolyimideThickness,
	setRows,
	setSilkscreen,
	setStainlessSteelThickness,
	setStiffner,
	setSurfaceFinish,
	setThreeMTapeThickness,
	setViaHoles,
	setPcbPrice,
	setTentativeDispatchDate,
	updateDifferentDesignsInPanel,
	updatePanelSize,
	updateSinglePiecesQty,
	updateDesignFormatOption,
	updatePcbThickness,
	updateOuterCuWeight,
	updateCoverlayThickness,
} = flexPcbSlice.actions;

export default flexPcbSlice.reducer;

/* Selectors */
export const selectFlexPcbState = (state: ReduxState) => state.flexPcb;
export const selectPcbName = (state: ReduxState) => state.flexPcb.pcbname;
export const selectDesignFormat = (state: ReduxState) => state.flexPcb.designFormat;
export const selectLayer = (state: ReduxState) => state.flexPcb.layer;
export const selectBaseMaterial = (state: ReduxState) => state.flexPcb.baseMaterial;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.flexPcb.boardOutlineTolerance;
export const selectBoardSizeX = (state: ReduxState) => state.flexPcb.boardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.flexPcb.boardSizeY;
export const selectBoardThickness = (state: ReduxState) => state.flexPcb.boardThickness;
export const selectColumns = (state: ReduxState) => state.flexPcb.columns;
export const selectCopperType = (state: ReduxState) => state.flexPcb.copperType;
export const selectCoverlay = (state: ReduxState) => state.flexPcb.coverlay;
export const selectCoverlayThickness = (state: ReduxState) => state.flexPcb.coverlayThickness;
export const selectCuttingMethod = (state: ReduxState) => state.flexPcb.cuttingMethod;
export const selectDesignFile = (state: ReduxState) => state.flexPcb.designFile;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.flexPcb.differentDesignsInPanel;
export const selectDispatchUnit = (state: ReduxState) => state.flexPcb.dispatchUnit;
export const selectEdgeRailSize = (state: ReduxState) => state.flexPcb.edgeRailSize;
export const selectEdgeRails = (state: ReduxState) => state.flexPcb.edgeRails;
export const selectEmiShieldingFilm = (state: ReduxState) => state.flexPcb.emiShieldingFilm;
export const selectFr4Thickness = (state: ReduxState) => state.flexPcb.fr4Thickness;
export const selectGoldThickness = (state: ReduxState) => state.flexPcb.goldThickness;
export const selectLeadTime = (state: ReduxState) => state.flexPcb.leadTime;
export const selectOuterCuWeight = (state: ReduxState) => state.flexPcb.outerCuWeight;
export const selectPanelQty = (state: ReduxState) => state.flexPcb.panelQty;
export const selectPcbQty = (state: ReduxState) => state.flexPcb.pcbQty;
export const selectPolyimideThickness = (state: ReduxState) => state.flexPcb.polyimideThickness;
export const selectRows = (state: ReduxState) => state.flexPcb.rows;
export const selectSilkscreen = (state: ReduxState) => state.flexPcb.silkscreen;
export const selectSinglePiecesQty = (state: ReduxState) => state.flexPcb.singlePiecesQty;
export const selectStainlessSteelThickness = (state: ReduxState) => state.flexPcb.stainlessSteelThickness;
export const selectStiffner = (state: ReduxState) => state.flexPcb.stiffner;
export const selectSurfaceFinish = (state: ReduxState) => state.flexPcb.surfaceFinish;
export const selectThreeMTapeThickness = (state: ReduxState) => state.flexPcb.threeMTapeThickness;
export const selectViaHoles = (state: ReduxState) => state.flexPcb.viaHoles;
export const selectPcbPrice = (state: ReduxState) => state.flexPcb.calculatedPrice;
export const selectTentativeDispatchDate = (state: ReduxState) => state.flexPcb.tentativeDispatchDate;
export const selectPanelSizeX = (state: ReduxState) => state.flexPcb.panelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.flexPcb.panelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.flexPcb.calculatedPrice;

/* dropdown menu selectors */
export const selectDesignFormatOptions = (state: ReduxState) => state.flexPcb.designFormatOptions;
export const selectLayerOptions = (state: ReduxState) => state.flexPcb.layerOptions;
export const selectBaseMaterialOptions = (state: ReduxState) => state.flexPcb.baseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.flexPcb.boardOutlineToleranceOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.flexPcb.boardThicknessOptions;
export const selectCopperTypeOptions = (state: ReduxState) => state.flexPcb.copperTypeOptions;
export const selectCoverlayOptions = (state: ReduxState) => state.flexPcb.coverlayOptions;
export const selectCoverlayThicknessOptions = (state: ReduxState) => state.flexPcb.coverlayThicknessOptions;
export const selectCuttingMethodOptions = (state: ReduxState) => state.flexPcb.cuttingMethodOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.flexPcb.edgeRailSizeOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.flexPcb.edgeRailsOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.flexPcb.outerCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.flexPcb.leadTimeOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.flexPcb.dispatchUnitOptions;
export const selectStiffnerOptions = (state: ReduxState) => state.flexPcb.stiffnerOptions;
export const selectEmiShieldingFilmOptions = (state: ReduxState) => state.flexPcb.emiShieldingFilmOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.flexPcb.surfaceFinishOptions;
export const selectFr4ThicknessOptions = (state: ReduxState) => state.flexPcb.fr4ThicknessOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.flexPcb.goldThicknessOptions;
export const selectPolyimideThicknessOptions = (state: ReduxState) => state.flexPcb.polyimideThicknessOptions;
export const selectStainlessSteelThicknessOptions = (state: ReduxState) => state.flexPcb.stainlessSteelThicknessOptions;
export const selectThreeMTapeThicknessOptions = (state: ReduxState) => state.flexPcb.threeMTapeThicknessOptions;
export const selectPanelQtyOptions = (state: ReduxState) => state.flexPcb.panelQtyOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.flexPcb.pcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.flexPcb.silkscreenOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectFlexPcbMemoized = createSelector([selectFlexPcbState], flexPcb => {
	const flexPcbFabSpecs: FlexPcbFabSpecsType = {
		type: "Flex",
		baseMaterial: flexPcb.baseMaterial,
		boardOutlineTolerance: flexPcb.boardOutlineTolerance,
		boardSizeX: flexPcb.boardSizeX,
		boardSizeY: flexPcb.boardSizeY,
		boardThickness: flexPcb.boardThickness,
		calculatedPrice: flexPcb.calculatedPrice,
		columns: flexPcb.columns,
		copperType: flexPcb.copperType,
		coverlay: flexPcb.coverlay,
		coverlayThickness: flexPcb.coverlayThickness,
		cuttingMethod: flexPcb.cuttingMethod,
		designFormat: flexPcb.designFormat,
		differentDesignsInPanel: flexPcb.differentDesignsInPanel,
		dispatchUnit: flexPcb.dispatchUnit,
		edgeRails: flexPcb.edgeRails,
		edgeRailSize: flexPcb.edgeRailSize,
		emiShieldingFilm: flexPcb.emiShieldingFilm,
		fr4Thickness: flexPcb.fr4Thickness,
		goldThickness: flexPcb.goldThickness,
		layer: flexPcb.layer,
		leadTime: flexPcb.leadTime,
		outerCuWeight: flexPcb.outerCuWeight,
		panelQty: flexPcb.panelQty,
		pcbname: flexPcb.pcbname,
		pcbQty: flexPcb.pcbQty,
		polyimideThickness: flexPcb.polyimideThickness,
		rows: flexPcb.rows,
		silkscreen: flexPcb.silkscreen,
		singlePiecesQty: flexPcb.singlePiecesQty,
		stainlessSteelThickness: flexPcb.stainlessSteelThickness,
		stiffner: flexPcb.stiffner,
		surfaceFinish: flexPcb.surfaceFinish,
		threeMTapeThickness: flexPcb.threeMTapeThickness,
		viaHoles: flexPcb.viaHoles,
		designFile: flexPcb.designFile,
	};
	return flexPcbFabSpecs;
});
