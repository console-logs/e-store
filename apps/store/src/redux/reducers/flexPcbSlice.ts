import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: FlexPcbStoreStateType = {
	Type: "Flex PCB",
	PcbName: "",
	BaseMaterial: "Flex (Polyimide)",
	BaseMaterialOptions: ["Flex (Polyimide)"],
	Layer: 1,
	LayerOptions: [1, 2],
	BoardSizeX: 44,
	BoardSizeY: 44,
	PcbQty: 5,
	PcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	PanelQty: 5,
	PanelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	SinglePiecesQty: 5,
	DesignFormat: "Single PCB",
	DesignFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	DifferentDesignsInPanel: 1,
	DifferentDesignsInPanelOptions: [1, 2, 3, 4],
	Columns: 1,
	Rows: 1,
	EdgeRails: "No",
	EdgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	EdgeRailSize: "5mm",
	PanelSizeX: 44,
	PanelSizeY: 44,
	BoardThickness: 0.07,
	BoardThicknessOptions: [0.07, 0.11],
	Coverlay: "Yellow",
	CoverlayOptions: ["Yellow"],
	Silkscreen: "White",
	SilkscreenOptions: ["White"],
	SurfaceFinish: "ENIG",
	SurfaceFinishOptions: ["ENIG"],
	CopperType: "Electro-deposited",
	CopperTypeOptions: ["Electro-deposited"],
	GoldThickness: '1 U"',
	GoldThicknessOptions: ['1 U"', '2 U"'],
	OuterCuWeight: "0.5 oz",
	OuterCuWeightOptions: ["0.5 oz"],
	CoverlayThickness: "PI:12.5um/AD:15um",
	CoverlayThicknessOptions: ["PI:12.5um/AD:15um"],
	Stiffner: ["Without"],
	StiffnerOptions: ["Without", "Polyimide", "FR4", "Stainless Steel", "3M Tape"],
	PolyimideThickness: 0.1,
	PolyimideThicknessOptions: [0.1, 0.15, 0.2, 0.225, 0.25],
	ThreeMTapeThickness: "3M468 (0.13mm)",
	ThreeMTapeThicknessOptions: ["3M468 (0.13mm)", "3M9077 (HT, 0.05mm)"],
	StainlessSteelThickness: 0.1,
	StainlessSteelThicknessOptions: [0.1, 0.2, 0.3],
	FR4Thickness: 0.1,
	FR4ThicknessOptions: [0.1, 0.2],
	EMIShieldingFilm: "Without",
	EMIShieldingFilmOptions: ["Without", "Both sides (Black, 18um)", "Single side (Black, 18um)"],
	CuttingMethod: "Laser Cutting",
	CuttingMethodOptions: ["Laser Cutting"],
	BoardOutlineTolerance: "±0.1mm",
	BoardOutlineToleranceOptions: ["±0.1mm", "±0.05mm"],
	DesignFile: "",
	DispatchUnit: "PCB",
	DispatchUnitOptions: ["PCB", "Panel"],
	LeadTime: "3 Working days",
	LeadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	ViaHoles: 4,
	EdgeRailSizeOptions: ["5mm", "7mm", "10mm"],
	NetPrice: 1165.11,
	TentativeDispatchDate: getFutureDate(3),
};

const flexPcbSlice = createSlice({
	name: "flexPcb",
	initialState,
	reducers: {
		setPcbName: (state, action: PayloadAction<string>) => {
			state.PcbName = action.payload;
		},
		setBaseMaterial: (state, action: PayloadAction<"Flex (Polyimide)">) => {
			state.BaseMaterial = action.payload;
		},
		setLayer: (state, action: PayloadAction<1 | 2>) => {
			state.Layer = action.payload;
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.BoardSizeX = action.payload;
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.BoardSizeY = action.payload;
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
			state.PcbQty = action.payload;
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
			state.PanelQty = action.payload;
		},
		setDesignFormat: (
			state,
			action: PayloadAction<"Single PCB" | "Panel by Customer" | "Panel by Manufacturer">
		) => {
			state.DesignFormat = action.payload;
		},
		setDifferentDesignsInPanel: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
			state.DifferentDesignsInPanel = action.payload;
		},
		setColumns: (state, action: PayloadAction<number>) => {
			state.Columns = action.payload;
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.Rows = action.payload;
		},
		setEdgeRails: (state, action: PayloadAction<"No" | "On 2 Sides" | "On 4 Sides">) => {
			state.EdgeRails = action.payload;
		},
		setEdgeRailSize: (state, action: PayloadAction<"5mm" | "7mm" | "10mm">) => {
			state.EdgeRailSize = action.payload;
		},
		setBoardThickness: (state, action: PayloadAction<0.07 | 0.11 | 0.12 | 0.2>) => {
			state.BoardThickness = action.payload;
		},
		setCoverlay: (state, action: PayloadAction<"Yellow">) => {
			state.Coverlay = action.payload;
		},
		setSilkscreen: (state, action: PayloadAction<"White">) => {
			state.Silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<"ENIG">) => {
			state.SurfaceFinish = action.payload;
		},
		setCopperType: (state, action: PayloadAction<"Electro-deposited">) => {
			state.CopperType = action.payload;
		},
		setGoldThickness: (state, action: PayloadAction<'1 U"' | '2 U"'>) => {
			state.GoldThickness = action.payload;
		},
		setOuterCuWeight: (state, action: PayloadAction<"0.5 oz" | "1/3 oz" | "1.0 oz">) => {
			state.OuterCuWeight = action.payload;
		},
		setCoverlayThickness: (state, action: PayloadAction<"PI:12.5um/AD:15um" | "PI:25um/AD:25um">) => {
			state.CoverlayThickness = action.payload;
		},
		setStiffner: (
			state,
			action: PayloadAction<Array<"Without" | "Polyimide" | "FR4" | "Stainless Steel" | "3M Tape">>
		) => {
			state.Stiffner = action.payload;
		},
		setPolyimideThickness: (state, action: PayloadAction<0.1 | 0.15 | 0.2 | 0.225 | 0.25>) => {
			state.PolyimideThickness = action.payload;
		},
		setThreeMTapeThickness: (state, action: PayloadAction<"3M468 (0.13mm)" | "3M9077 (HT, 0.05mm)">) => {
			state.ThreeMTapeThickness = action.payload;
		},
		setStainlessSteelThickness: (state, action: PayloadAction<0.1 | 0.2 | 0.3>) => {
			state.StainlessSteelThickness = action.payload;
		},
		setFr4Thickness: (state, action: PayloadAction<0.1 | 0.2>) => {
			state.FR4Thickness = action.payload;
		},
		setEmiShieldingFilm: (
			state,
			action: PayloadAction<"Without" | "Both sides (Black, 18um)" | "Single side (Black, 18um)">
		) => {
			state.EMIShieldingFilm = action.payload;
		},
		setCuttingMethod: (state, action: PayloadAction<"Laser Cutting">) => {
			state.CuttingMethod = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<"±0.1mm" | "±0.05mm">) => {
			state.BoardOutlineTolerance = action.payload;
		},
		setDesignFile: (state, action: PayloadAction<string>) => {
			state.DesignFile = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<"PCB" | "Panel">) => {
			state.DispatchUnit = action.payload;
		},
		setLeadTime: (
			state,
			action: PayloadAction<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">
		) => {
			state.LeadTime = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.ViaHoles = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.NetPrice = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.TentativeDispatchDate = action.payload;
		},
		/***********************************************************/
		updateDifferentDesignsInPanel: state => {
			if (state.DesignFormat === "Panel by Manufacturer" || state.DesignFormat === "Single PCB") {
				state.DifferentDesignsInPanelOptions = [1];
			}
			if (state.DesignFormat === "Panel by Customer") {
				state.DifferentDesignsInPanelOptions = [1, 2, 3, 4];
			}
			state.DifferentDesignsInPanel = state.DifferentDesignsInPanelOptions[0]!;
		},
		updatePanelSize: state => {
			if (state.EdgeRails === "No") {
				state.PanelSizeX = state.BoardSizeX * state.Columns;
				state.PanelSizeY = state.BoardSizeY * state.Rows;
			} else if (state.EdgeRails === "On 2 Sides") {
				state.PanelSizeX = state.BoardSizeX * state.Columns + parseInt(state.EdgeRailSize, 10) * 2;
				state.PanelSizeY = state.BoardSizeY * state.Rows;
			} else if (state.EdgeRails === "On 4 Sides") {
				state.PanelSizeX = state.BoardSizeX * state.Columns + parseInt(state.EdgeRailSize, 10) * 2;
				state.PanelSizeY = state.BoardSizeY * state.Rows + parseInt(state.EdgeRailSize, 10) * 2;
			}
		},
		updateSinglePiecesQty: state => {
			state.SinglePiecesQty = state.PanelQty * state.Columns * state.Rows;
		},
		updateDesignFormatOption: state => {
			if (state.DifferentDesignsInPanel > 1) {
				state.DesignFormatOptions = ["Panel by Customer"];
			} else {
				state.DesignFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
			}
			state.DesignFormat = state.DesignFormatOptions[0]!;
		},
		updatePcbThickness: state => {
			if (state.Layer === 1) {
				state.BoardThicknessOptions = [0.07, 0.11];
			} else {
				state.BoardThicknessOptions = [0.11, 0.12, 0.2];
			}
			state.BoardThickness = state.BoardThicknessOptions[0]!;
		},
		updateOuterCuWeight: state => {
			if (state.Layer === 1) {
				if (state.BoardThickness === 0.07) {
					state.OuterCuWeightOptions = ["0.5 oz"];
				} else {
					state.OuterCuWeightOptions = ["1.0 oz"];
				}
			}
			if (state.Layer === 2) {
				if (state.BoardThickness === 0.11) {
					state.OuterCuWeightOptions = ["1/3 oz"];
				}
				if (state.BoardThickness === 0.12) {
					state.OuterCuWeightOptions = ["0.5 oz"];
				}
				if (state.BoardThickness === 0.2) {
					state.OuterCuWeightOptions = ["1.0 oz"];
				}
			}
			state.OuterCuWeight = state.OuterCuWeightOptions[0]!;
		},
		updateCoverlayThickness: state => {
			if (state.Layer === 1) {
				if (state.BoardThickness === 0.07) {
					state.CoverlayThicknessOptions = ["PI:12.5um/AD:15um"];
				} else {
					state.CoverlayThicknessOptions = ["PI:25um/AD:25um"];
				}
			}
			if (state.Layer === 2) {
				if (state.BoardThickness === 0.11 || state.BoardThickness === 0.12) {
					state.CoverlayThicknessOptions = ["PI:12.5um/AD:15um"];
				}
				if (state.BoardThickness === 0.2) {
					state.CoverlayThicknessOptions = ["PI:25um/AD:25um"];
				}
			}
			state.CoverlayThickness = state.CoverlayThicknessOptions[0]!;
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
export const selectPcbName = (state: ReduxState) => state.flexPcb.PcbName;
export const selectDesignFormat = (state: ReduxState) => state.flexPcb.DesignFormat;
export const selectLayer = (state: ReduxState) => state.flexPcb.Layer;
export const selectBaseMaterial = (state: ReduxState) => state.flexPcb.BaseMaterial;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.flexPcb.BoardOutlineTolerance;
export const selectBoardSizeX = (state: ReduxState) => state.flexPcb.BoardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.flexPcb.BoardSizeY;
export const selectBoardThickness = (state: ReduxState) => state.flexPcb.BoardThickness;
export const selectColumns = (state: ReduxState) => state.flexPcb.Columns;
export const selectCopperType = (state: ReduxState) => state.flexPcb.CopperType;
export const selectCoverlay = (state: ReduxState) => state.flexPcb.Coverlay;
export const selectCoverlayThickness = (state: ReduxState) => state.flexPcb.CoverlayThickness;
export const selectCuttingMethod = (state: ReduxState) => state.flexPcb.CuttingMethod;
export const selectDesignFile = (state: ReduxState) => state.flexPcb.DesignFile;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.flexPcb.DifferentDesignsInPanel;
export const selectDispatchUnit = (state: ReduxState) => state.flexPcb.DispatchUnit;
export const selectEdgeRailSize = (state: ReduxState) => state.flexPcb.EdgeRailSize;
export const selectEdgeRails = (state: ReduxState) => state.flexPcb.EdgeRails;
export const selectEmiShieldingFilm = (state: ReduxState) => state.flexPcb.EMIShieldingFilm;
export const selectFr4Thickness = (state: ReduxState) => state.flexPcb.FR4Thickness;
export const selectGoldThickness = (state: ReduxState) => state.flexPcb.GoldThickness;
export const selectLeadTime = (state: ReduxState) => state.flexPcb.LeadTime;
export const selectOuterCuWeight = (state: ReduxState) => state.flexPcb.OuterCuWeight;
export const selectPanelQty = (state: ReduxState) => state.flexPcb.PanelQty;
export const selectPcbQty = (state: ReduxState) => state.flexPcb.PcbQty;
export const selectPolyimideThickness = (state: ReduxState) => state.flexPcb.PolyimideThickness;
export const selectRows = (state: ReduxState) => state.flexPcb.Rows;
export const selectSilkscreen = (state: ReduxState) => state.flexPcb.Silkscreen;
export const selectSinglePiecesQty = (state: ReduxState) => state.flexPcb.SinglePiecesQty;
export const selectStainlessSteelThickness = (state: ReduxState) => state.flexPcb.StainlessSteelThickness;
export const selectStiffner = (state: ReduxState) => state.flexPcb.Stiffner;
export const selectSurfaceFinish = (state: ReduxState) => state.flexPcb.SurfaceFinish;
export const selectThreeMTapeThickness = (state: ReduxState) => state.flexPcb.ThreeMTapeThickness;
export const selectViaHoles = (state: ReduxState) => state.flexPcb.ViaHoles;
export const selectPcbPrice = (state: ReduxState) => state.flexPcb.NetPrice;
export const selectTentativeDispatchDate = (state: ReduxState) => state.flexPcb.TentativeDispatchDate;
export const selectPanelSizeX = (state: ReduxState) => state.flexPcb.PanelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.flexPcb.PanelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.flexPcb.NetPrice;

/* dropdown menu selectors */
export const selectDesignFormatOptions = (state: ReduxState) => state.flexPcb.DesignFormatOptions;
export const selectLayerOptions = (state: ReduxState) => state.flexPcb.LayerOptions;
export const selectBaseMaterialOptions = (state: ReduxState) => state.flexPcb.BaseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.flexPcb.BoardOutlineToleranceOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.flexPcb.BoardThicknessOptions;
export const selectCopperTypeOptions = (state: ReduxState) => state.flexPcb.CopperTypeOptions;
export const selectCoverlayOptions = (state: ReduxState) => state.flexPcb.CoverlayOptions;
export const selectCoverlayThicknessOptions = (state: ReduxState) => state.flexPcb.CoverlayThicknessOptions;
export const selectCuttingMethodOptions = (state: ReduxState) => state.flexPcb.CuttingMethodOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.flexPcb.EdgeRailSizeOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.flexPcb.EdgeRailsOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.flexPcb.OuterCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.flexPcb.LeadTimeOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.flexPcb.DispatchUnitOptions;
export const selectStiffnerOptions = (state: ReduxState) => state.flexPcb.StiffnerOptions;
export const selectEmiShieldingFilmOptions = (state: ReduxState) => state.flexPcb.EMIShieldingFilmOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.flexPcb.SurfaceFinishOptions;
export const selectFr4ThicknessOptions = (state: ReduxState) => state.flexPcb.FR4ThicknessOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.flexPcb.GoldThicknessOptions;
export const selectPolyimideThicknessOptions = (state: ReduxState) => state.flexPcb.PolyimideThicknessOptions;
export const selectStainlessSteelThicknessOptions = (state: ReduxState) => state.flexPcb.StainlessSteelThicknessOptions;
export const selectThreeMTapeThicknessOptions = (state: ReduxState) => state.flexPcb.ThreeMTapeThicknessOptions;
export const selectPanelQtyOptions = (state: ReduxState) => state.flexPcb.PanelQtyOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.flexPcb.PcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.flexPcb.SilkscreenOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectFlexPcbMemoized = createSelector([selectFlexPcbState], flexPcb => {
	const flexPcbFabSpecs: FlexPcbFabSpecsType = {
		Type: "Flex PCB",
		BaseMaterial: flexPcb.BaseMaterial,
		BoardOutlineTolerance: flexPcb.BoardOutlineTolerance,
		BoardSizeX: flexPcb.BoardSizeX,
		BoardSizeY: flexPcb.BoardSizeY,
		PanelSizeX: flexPcb.PanelSizeX,
		PanelSizeY: flexPcb.PanelSizeY,
		BoardThickness: flexPcb.BoardThickness,
		NetPrice: flexPcb.NetPrice,
		Columns: flexPcb.Columns,
		CopperType: flexPcb.CopperType,
		Coverlay: flexPcb.Coverlay,
		CoverlayThickness: flexPcb.CoverlayThickness,
		CuttingMethod: flexPcb.CuttingMethod,
		DesignFormat: flexPcb.DesignFormat,
		DifferentDesignsInPanel: flexPcb.DifferentDesignsInPanel,
		DispatchUnit: flexPcb.DispatchUnit,
		EdgeRails: flexPcb.EdgeRails,
		EdgeRailSize: flexPcb.EdgeRailSize,
		EMIShieldingFilm: flexPcb.EMIShieldingFilm,
		FR4Thickness: flexPcb.FR4Thickness,
		GoldThickness: flexPcb.GoldThickness,
		Layer: flexPcb.Layer,
		LeadTime: flexPcb.LeadTime,
		OuterCuWeight: flexPcb.OuterCuWeight,
		PanelQty: flexPcb.PanelQty,
		PcbName: flexPcb.PcbName,
		PcbQty: flexPcb.PcbQty,
		PolyimideThickness: flexPcb.PolyimideThickness,
		Rows: flexPcb.Rows,
		Silkscreen: flexPcb.Silkscreen,
		SinglePiecesQty: flexPcb.SinglePiecesQty,
		StainlessSteelThickness: flexPcb.StainlessSteelThickness,
		Stiffner: flexPcb.Stiffner,
		SurfaceFinish: flexPcb.SurfaceFinish,
		ThreeMTapeThickness: flexPcb.ThreeMTapeThickness,
		ViaHoles: flexPcb.ViaHoles,
		DesignFile: flexPcb.DesignFile,
	};
	return flexPcbFabSpecs;
});
