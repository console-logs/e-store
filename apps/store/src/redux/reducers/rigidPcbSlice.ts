import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: RigidPcbStoreStateType = {
	/* mandatory fields */
	Type: "Rigid PCB",
	Category: "PCB",
	Name: "",
	OrderedQty: 5,
	BaseMaterial: "FR4",
	Layer: 1,
	BoardSizeX: 44,
	BoardSizeY: 44,
	DifferentDesignsInPanel: 1,
	DesignFormat: "Single PCB",
	BoardThickness: 0.8,
	Soldermask: "Green",
	Silkscreen: "White",
	SurfaceFinish: "HASL(with lead)",
	OuterCuWeight: "1 oz",
	GoldFingers: "No",
	CastellatedHoles: "No",
	LeadTime: "7 Working days",
	DispatchUnit: "PCB",
	NetPrice: 2640.19,
	TentativeDispatchDate: getFutureDate(7),
	UploadedFileName: "",
	UploadedFileUrl: "",

	/* conditional fields */
	PcbQty: 5,
	ViaCovering: "Tented",
	Material: "FR4-Standard TG 135-140",
	BoardOutlineTolerance: "±0.2mm(Regular)",
	ViaHoles: 10,
	PanelQty: 5,
	Columns: 1,
	Rows: 1,
	SinglePiecesQty: 5,
	GoldThickness: '1 U"',
	EdgeRails: "No",
	EdgeRailSize: "5mm",
	PanelSizeX: 44,
	PanelSizeY: 44,
	ThermalConductivity: 1,
	BreakDownVoltage: 3000,
	InnerCuWeight: "0.5 oz",
	ImpedanceControl: "No",
	MinViaHoleSizeAndDiameter: "0.3mm/(0.4/0.45mm)",
	CastellatedHolesEdges: 1,
	ChamferedGoldFingers: "No",

	/* dropdown menu options */
	LayerOptions: [1, 2, 4, 6, 8, 10],
	BaseMaterialOptions: ["FR4", "Aluminum", "CopperCore", "Rogers"],
	DesignFormatOptions: ["Single PCB", "Panel by Customer", "Panel by Manufacturer"],
	DifferentDesignsInPanelOptions: [1, 2, 3, 4],
	MaterialOptions: ["FR4-Standard TG 135-140", "FR-4 TG155"],
	PanelQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	PcbQtyOptions: [
		5, 10, 15, 20, 25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 450, 500, 600, 700, 800, 900, 1000, 1500,
		2000,
	],
	BoardThicknessOptions: [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0],
	SoldermaskOptions: ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"],
	SilkscreenOptions: ["White"],
	SurfaceFinishOptions: ["HASL(with lead)", "LeadFree HASL", "ENIG"],
	GoldFingersOptions: ["No", "Yes"],
	GoldThicknessOptions: ['1 U"', '2 U"'],
	EdgeRailsOptions: ["No", "On 2 Sides", "On 4 Sides"],
	EdgeRailSizeOptions: ["5mm", "7mm", "10mm"],
	OuterCuWeightOptions: ["1 oz", "2 oz"],
	CopperStructure: "Direct Heatsink",
	CopperStructureOptions: ["Direct Heatsink"],
	ThermalConductivityOptions: [1],
	BreakDownVoltageOptions: [3000],
	InnerCuWeightOptions: ["0.5 oz", "1 oz", "2 oz"],
	ImpedanceControlOptions: ["No", "Yes"],
	ViaCoveringOptions: ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"],
	MinViaHoleSizeAndDiameterOptions: [
		"0.3mm/(0.4/0.45mm)",
		"0.25mm/(0.35/0.40mm)",
		"0.2mm/(0.3/0.35mm)",
		"0.15mm/(0.25/0.3mm)",
	],
	BoardOutlineToleranceOptions: ["±0.2mm(Regular)", "±0.1mm(Precision)"],
	CastellatedHolesOptions: ["No", "Yes"],
	CastellatedHolesEdgesOptions: [1, 2, 3, 4],
	ChamferedGoldFingersOptions: ["No", "Yes"],
	LeadTimeOptions: ["3 Working days", "5 Working days", "7 Working days", "10 Working days"],
	DispatchUnitOptions: ["PCB", "Panel"],
};

const rigidPcbSlice = createSlice({
	name: "rigidPcb",
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.Name = action.payload;
		},
		setLayer: (state, action: PayloadAction<1 | 10 | 6 | 8 | 2 | 4>) => {
			state.Layer = action.payload;
		},
		setBaseMaterial: (state, action: PayloadAction<"FR4" | "Aluminum" | "CopperCore" | "Rogers">) => {
			state.BaseMaterial = action.payload;
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
		setMaterial: (
			state,
			action: PayloadAction<
				"FR4-Standard TG 135-140" | "FR-4 TG155" | "RO4350B (Dk=3.48, Df=0.0037)" | "FR-4 TG170"
			>
		) => {
			state.Material = action.payload;
		},
		setBoardSizeX: (state, action: PayloadAction<number>) => {
			state.BoardSizeX = action.payload;
		},
		setBoardSizeY: (state, action: PayloadAction<number>) => {
			state.BoardSizeY = action.payload;
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
		setColumns: (state, action: PayloadAction<number>) => {
			state.Columns = action.payload;
		},
		setRows: (state, action: PayloadAction<number>) => {
			state.Rows = action.payload;
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
		setBoardThickness: (
			state,
			action: PayloadAction<0.51 | 0.76 | 1.52 | 0.4 | 0.6 | 0.8 | 1.0 | 1.2 | 1.6 | 2.0>
		) => {
			state.BoardThickness = action.payload;
		},
		setSoldermask: (
			state,
			action: PayloadAction<"Green" | "Purple" | "Red" | "Yellow" | "Blue" | "Black" | "White">
		) => {
			state.Soldermask = action.payload;
		},
		setSilkscreen: (state, action: PayloadAction<"White" | "Black">) => {
			state.Silkscreen = action.payload;
		},
		setSurfaceFinish: (state, action: PayloadAction<"HASL(with lead)" | "LeadFree HASL" | "ENIG" | "OSP">) => {
			state.SurfaceFinish = action.payload;
		},
		setGoldFingers: (state, action: PayloadAction<"Yes" | "No">) => {
			state.GoldFingers = action.payload;
		},
		setGoldThickness: (state, action: PayloadAction<'1 U"' | '2 U"'>) => {
			state.GoldThickness = action.payload;
		},
		setEdgeRails: (state, action: PayloadAction<"No" | "On 2 Sides" | "On 4 Sides">) => {
			state.EdgeRails = action.payload;
		},
		setEdgeRailSize: (state, action: PayloadAction<"5mm" | "7mm" | "10mm">) => {
			state.EdgeRailSize = action.payload;
		},
		setOuterCuWeight: (state, action: PayloadAction<"1 oz" | "2 oz">) => {
			state.OuterCuWeight = action.payload;
		},
		setCopperStructure: (state, action: PayloadAction<"Direct Heatsink">) => {
			state.CopperStructure = action.payload;
		},
		setThermalConductivity: (state, action: PayloadAction<1 | 380>) => {
			state.ThermalConductivity = action.payload;
		},
		setBreakdownVoltage: (state, action: PayloadAction<3000>) => {
			state.BreakDownVoltage = action.payload;
		},
		setInnerCuWeight: (state, action: PayloadAction<"0.5 oz" | "1 oz" | "2 oz">) => {
			state.InnerCuWeight = action.payload;
		},
		setImpedenceControl: (state, action: PayloadAction<"Yes" | "No">) => {
			state.ImpedanceControl = action.payload;
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
			state.ViaCovering = action.payload;
		},
		setMinViaHoleSizeAndDiameter: (
			state,
			action: PayloadAction<
				"0.3mm/(0.4/0.45mm)" | "0.25mm/(0.35/0.40mm)" | "0.2mm/(0.3/0.35mm)" | "0.15mm/(0.25/0.3mm)"
			>
		) => {
			state.MinViaHoleSizeAndDiameter = action.payload;
		},
		setBoardOutlineTolerance: (state, action: PayloadAction<"±0.2mm(Regular)" | "±0.1mm(Precision)">) => {
			state.BoardOutlineTolerance = action.payload;
		},
		setViaHoles: (state, action: PayloadAction<number>) => {
			state.ViaHoles = action.payload;
		},
		setCastellatedHoles: (state, action: PayloadAction<"Yes" | "No">) => {
			state.CastellatedHoles = action.payload;
		},
		setCastellatedHolesEdges: (state, action: PayloadAction<1 | 2 | 3 | 4>) => {
			state.CastellatedHolesEdges = action.payload;
		},
		setChamferedGoldFingers: (state, action: PayloadAction<"Yes" | "No">) => {
			state.ChamferedGoldFingers = action.payload;
		},
		setLeadTime: (
			state,
			action: PayloadAction<"3 Working days" | "5 Working days" | "7 Working days" | "10 Working days">
		) => {
			state.LeadTime = action.payload;
		},
		setDispatchUnit: (state, action: PayloadAction<"PCB" | "Panel">) => {
			state.DispatchUnit = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.NetPrice = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.TentativeDispatchDate = action.payload;
		},
		setUploadedFileUrl: (state, action: PayloadAction<string>) => {
			state.UploadedFileUrl = action.payload;
		},
		setUploadedFileName: (state, action: PayloadAction<string>) => {
			state.UploadedFileName = action.payload;
		},
		/***************** Dependent fields update	**********************/
		updateOrderedQty: state => {
			if (state.DesignFormat === "Single PCB") {
				state.OrderedQty = state.PcbQty;
			} else {
				state.OrderedQty = state.SinglePiecesQty;
			}
		},
		updateMaterial: state => {
			if (state.BaseMaterial === "FR4") {
				if (state.Layer <= 6) {
					state.MaterialOptions = ["FR4-Standard TG 135-140", "FR-4 TG155"];
				} else if (state.Layer === 8) {
					state.MaterialOptions = ["FR-4 TG155"];
				} else {
					state.MaterialOptions = ["FR-4 TG170"];
				}
			} else if (state.BaseMaterial === "Rogers") {
				state.MaterialOptions = ["RO4350B (Dk=3.48, Df=0.0037)"];
			}
			state.Material = state.MaterialOptions[0]!;
		},
		updateSurfaceFinish: state => {
			if (state.BaseMaterial === "FR4") {
				if (state.Layer >= 6 || state.GoldFingers === "Yes") {
					state.SurfaceFinishOptions = ["ENIG"];
				} else {
					state.SurfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL", "ENIG"];
				}
			}
			if (state.BaseMaterial === "Aluminum") {
				state.SurfaceFinishOptions = ["HASL(with lead)", "LeadFree HASL"];
			}
			if (state.BaseMaterial === "CopperCore") {
				state.SurfaceFinishOptions = ["OSP"];
			}
			if (state.BaseMaterial === "Rogers") {
				state.SurfaceFinishOptions = ["ENIG"];
			}
			state.SurfaceFinish = state.SurfaceFinishOptions[0]!;
		},
		updateBoardThickness: state => {
			if (state.BaseMaterial === "FR4") {
				switch (state.Layer) {
					case 1:
					case 4:
					case 6:
					case 8:
						state.BoardThicknessOptions = [0.8, 1.0, 1.2, 1.6, 2.0];
						break;
					case 10:
						state.BoardThicknessOptions = [1.0, 1.2, 1.6, 2.0];
						break;
					case 2:
					default:
						state.BoardThicknessOptions = [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0];
						break;
				}
			}
			if (state.BaseMaterial === "Aluminum" || state.BaseMaterial === "CopperCore") {
				state.BoardThicknessOptions = [1.0, 1.2, 1.6];
			}
			if (state.BaseMaterial === "Rogers") {
				state.BoardThicknessOptions = [0.51, 0.76, 1.52];
			}
			state.BoardThickness = state.BoardThicknessOptions[0]!;
		},
		updateLayer: state => {
			switch (state.BaseMaterial) {
				case "Aluminum":
				case "CopperCore":
					state.LayerOptions = [1];
					break;
				case "Rogers":
					state.LayerOptions = [2];
					break;
				default: // FR4
					state.LayerOptions = [1, 2, 4, 6, 8, 10];
					break;
			}
			state.Layer = state.LayerOptions[0]!;
		},
		updateSoldermask: state => {
			if (state.BaseMaterial === "FR4") {
				state.SoldermaskOptions = ["Green", "Purple", "Red", "Yellow", "Blue", "Black", "White"];
			}
			if (state.BaseMaterial === "Aluminum") {
				state.SoldermaskOptions = ["White"];
			}
			if (state.BaseMaterial === "CopperCore") {
				state.SoldermaskOptions = ["White"];
			}
			if (state.BaseMaterial === "Rogers") {
				state.SoldermaskOptions = ["Green"];
			}
			state.Soldermask = state.SoldermaskOptions[0]!;
		},
		updateSilkscreen: state => {
			if (state.BaseMaterial === "FR4") {
				state.SilkscreenOptions = ["White"];
			}
			if (state.BaseMaterial === "Aluminum") {
				state.SilkscreenOptions = ["Black"];
			}
			if (state.BaseMaterial === "CopperCore") {
				state.SilkscreenOptions = ["Black"];
			}
			if (state.BaseMaterial === "Rogers") {
				state.SilkscreenOptions = ["White"];
			}
			state.Silkscreen = state.SilkscreenOptions[0]!;

			// based on soldermask
			if (state.Soldermask !== "White") {
				state.SilkscreenOptions = ["White"];
			} else {
				state.SilkscreenOptions = ["Black"];
			}
			state.Silkscreen = state.SilkscreenOptions[0]!;
		},
		updateGoldFingers: state => {
			if (state.BaseMaterial === "FR4") {
				state.GoldFingersOptions = ["No", "Yes"];
			}
			if (state.BaseMaterial === "Aluminum") {
				state.GoldFingersOptions = ["No"];
			}
			if (state.BaseMaterial === "CopperCore") {
				state.GoldFingersOptions = ["No"];
			}
			if (state.BaseMaterial === "Rogers") {
				state.GoldFingersOptions = ["No"];
			}
			state.GoldFingers = state.GoldFingersOptions[0]!;
		},
		updateDifferentDesignsInPanel: state => {
			if (state.DesignFormat === "Panel by Manufacturer" || state.DesignFormat === "Single PCB") {
				state.DifferentDesignsInPanelOptions = [1];
			}
			if (state.DesignFormat === "Panel by Customer") {
				state.DifferentDesignsInPanelOptions = [1, 2, 3, 4];
			}
			state.DifferentDesignsInPanel = state.DifferentDesignsInPanelOptions[0]!;
		},
		updateDesignFormatOption: state => {
			if (state.DifferentDesignsInPanel > 1) {
				state.DesignFormatOptions = ["Panel by Customer"];
			} else {
				state.DesignFormatOptions = ["Single PCB", "Panel by Customer", "Panel by Manufacturer"];
			}
			state.DesignFormat = state.DesignFormatOptions[0]!;
		},
		updateSinglePiecesQty: state => {
			state.SinglePiecesQty = state.PanelQty * state.Columns * state.Rows;
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
		updateOuterCuWeight: state => {
			if (state.BaseMaterial === "FR4") {
				if (state.Layer === 2 || state.Layer === 4 || state.Layer === 6) {
					state.OuterCuWeightOptions = ["1 oz", "2 oz"];
				} else {
					state.OuterCuWeightOptions = ["1 oz"];
				}
			} else if (
				state.BaseMaterial === "Aluminum" ||
				state.BaseMaterial === "CopperCore" ||
				state.BaseMaterial === "Rogers"
			) {
				state.OuterCuWeightOptions = ["1 oz"];
			}
			state.OuterCuWeight = state.OuterCuWeightOptions[0]!;
		},
		updateThermalConductivity: state => {
			if (state.BaseMaterial === "Aluminum") {
				state.ThermalConductivityOptions = [1];
			}
			if (state.BaseMaterial === "CopperCore") {
				state.ThermalConductivityOptions = [380];
			}
			state.ThermalConductivity = state.ThermalConductivityOptions[0]!;
		},
		updateInnerCuWeight: state => {
			if (state.Layer === 4 || state.Layer === 6) {
				state.InnerCuWeightOptions = ["0.5 oz", "1 oz", "2 oz"];
			} else {
				state.InnerCuWeightOptions = ["0.5 oz", "1 oz"];
			}
			state.InnerCuWeight = state.InnerCuWeightOptions[0]!;
		},
		updateViaCovering: state => {
			if (state.BaseMaterial === "FR4") {
				if (state.Layer === 1) {
					state.ViaCoveringOptions = ["Tented", "Untented"];
				}
				if (state.Layer === 2) {
					state.ViaCoveringOptions = ["Tented", "Untented", "Plugged", "Epoxy Filled & Capped"];
				}
				if (state.Layer === 4) {
					state.ViaCoveringOptions = [
						"Tented",
						"Untented",
						"Epoxy Filled & Capped",
						"Copper paste Filled & Capped",
					];
				}
				if (state.Layer >= 6) {
					state.ViaCoveringOptions = [
						"Epoxy Filled & Untented",
						"Epoxy Filled & Capped",
						"Copper paste Filled & Capped",
					];
				}
			}
			if (state.BaseMaterial === "Rogers") {
				state.ViaCoveringOptions = ["Tented", "Untented"];
			}
			state.ViaCovering = state.ViaCoveringOptions[0]!;
		},
		updateCastellatedHoles: state => {
			if (state.BaseMaterial === "FR4") {
				if (state.Layer < 2) {
					state.CastellatedHolesOptions = ["No"];
				} else {
					state.CastellatedHolesOptions = ["Yes", "No"];
				}
			} else if (
				state.BaseMaterial === "Aluminum" ||
				state.BaseMaterial === "CopperCore" ||
				state.BaseMaterial === "Rogers"
			) {
				state.CastellatedHolesOptions = ["No"];
			}
			state.CastellatedHoles = state.CastellatedHolesOptions[0]!;
		},
		updateChamferedGoldFingers: state => {
			if (state.DesignFormat === "Panel by Customer") {
				state.ChamferedGoldFingersOptions = ["No"];
			} else {
				state.ChamferedGoldFingersOptions = ["Yes", "No"];
			}
			state.ChamferedGoldFingers = state.ChamferedGoldFingersOptions[0]!;
		},
	},
});

export const {
	setName,
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
	setUploadedFileUrl,
	setUploadedFileName,
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
	updateOrderedQty,
} = rigidPcbSlice.actions;

export default rigidPcbSlice.reducer;

/* Selectors */
export const selectRigidPcbState = (state: ReduxState) => state.rigidPcb;
export const selectPanelSizeX = (state: ReduxState) => state.rigidPcb.PanelSizeX;
export const selectPanelSizeY = (state: ReduxState) => state.rigidPcb.PanelSizeY;
export const selectCalculatedPrice = (state: ReduxState) => state.rigidPcb.NetPrice;
export const selectPanelQty = (state: ReduxState) => state.rigidPcb.PanelQty;
export const selectUploadedName = (state: ReduxState) => state.rigidPcb.UploadedFileName;
export const selectUploadedFileUrl = (state: ReduxState) => state.rigidPcb.UploadedFileUrl;
export const selectName = (state: ReduxState) => state.rigidPcb.Name;
export const selectBaseMaterial = (state: ReduxState) => state.rigidPcb.BaseMaterial;
export const selectLayer = (state: ReduxState) => state.rigidPcb.Layer;
export const selectBoardSizeX = (state: ReduxState) => state.rigidPcb.BoardSizeX;
export const selectBoardSizeY = (state: ReduxState) => state.rigidPcb.BoardSizeY;
export const selectDifferentDesignsInPanel = (state: ReduxState) => state.rigidPcb.DifferentDesignsInPanel;
export const selectDesignFormat = (state: ReduxState) => state.rigidPcb.DesignFormat;
export const selectBoardThickness = (state: ReduxState) => state.rigidPcb.BoardThickness;
export const selectSoldermask = (state: ReduxState) => state.rigidPcb.Soldermask;
export const selectSilkscreen = (state: ReduxState) => state.rigidPcb.Silkscreen;
export const selectSurfaceFinish = (state: ReduxState) => state.rigidPcb.SurfaceFinish;
export const selectOuterCuWeight = (state: ReduxState) => state.rigidPcb.OuterCuWeight;
export const selectGoldFingers = (state: ReduxState) => state.rigidPcb.GoldFingers;
export const selectCastellatedHoles = (state: ReduxState) => state.rigidPcb.CastellatedHoles;
export const selectLeadTime = (state: ReduxState) => state.rigidPcb.LeadTime;
export const selectDispatchUnit = (state: ReduxState) => state.rigidPcb.DispatchUnit;
export const selectPcbQty = (state: ReduxState) => state.rigidPcb.PcbQty;
export const selectSinglePiecesQty = (state: ReduxState) => state.rigidPcb.SinglePiecesQty;
export const selectViaCovering = (state: ReduxState) => state.rigidPcb.ViaCovering;
export const selectViaHoles = (state: ReduxState) => state.rigidPcb.ViaHoles;
export const selectBoardOutlineTolerance = (state: ReduxState) => state.rigidPcb.BoardOutlineTolerance;
export const selectMaterial = (state: ReduxState) => state.rigidPcb.Material;
export const selectGoldThickness = (state: ReduxState) => state.rigidPcb.GoldThickness;
export const selectEdgeRails = (state: ReduxState) => state.rigidPcb.EdgeRails;
export const selectThermalConductivity = (state: ReduxState) => state.rigidPcb.ThermalConductivity;
export const selectBreakDownVoltage = (state: ReduxState) => state.rigidPcb.BreakDownVoltage;
export const selectInnerCuWeight = (state: ReduxState) => state.rigidPcb.InnerCuWeight;
export const selectImpedenceControl = (state: ReduxState) => state.rigidPcb.ImpedanceControl;
export const selectMinViaHoleSizeAndDiameter = (state: ReduxState) => state.rigidPcb.MinViaHoleSizeAndDiameter;
export const selectCastellatedHolesEdges = (state: ReduxState) => state.rigidPcb.CastellatedHolesEdges;
export const selectChamferedGoldFingers = (state: ReduxState) => state.rigidPcb.ChamferedGoldFingers;
export const selectEdgeRailSize = (state: ReduxState) => state.rigidPcb.EdgeRailSize;
export const selectCopperStructure = (state: ReduxState) => state.rigidPcb.CopperStructure;
export const selectColumns = (state: ReduxState) => state.rigidPcb.Columns;
export const selectRows = (state: ReduxState) => state.rigidPcb.Rows;
export const selectTentativeDispatchDate = (state: ReduxState) => state.rigidPcb.TentativeDispatchDate;
export const selectOrderedQty = (state: ReduxState) => state.rigidPcb.OrderedQty;

/* dropdown menu selectors */
export const selectBaseMaterialOptions = (state: ReduxState) => state.rigidPcb.BaseMaterialOptions;
export const selectBoardOutlineToleranceOptions = (state: ReduxState) => state.rigidPcb.BoardOutlineToleranceOptions;
export const selectCastellatedHolesOptions = (state: ReduxState) => state.rigidPcb.CastellatedHolesOptions;
export const selectChamferedGoldFingersOptions = (state: ReduxState) => state.rigidPcb.ChamferedGoldFingersOptions;
export const selectEdgeRailsOptions = (state: ReduxState) => state.rigidPcb.EdgeRailsOptions;
export const selectEdgeRailSizeOptions = (state: ReduxState) => state.rigidPcb.EdgeRailSizeOptions;
export const selectMaterialOptions = (state: ReduxState) => state.rigidPcb.MaterialOptions;
export const selectThermalConductivityOptions = (state: ReduxState) => state.rigidPcb.ThermalConductivityOptions;
export const selectViaCoveringOptions = (state: ReduxState) => state.rigidPcb.ViaCoveringOptions;
export const selectCastellatedHolesEdgesOptions = (state: ReduxState) => state.rigidPcb.CastellatedHolesEdgesOptions;
export const selectCopperStructureOptions = (state: ReduxState) => state.rigidPcb.CopperStructureOptions;
export const selectBoardThicknessOptions = (state: ReduxState) => state.rigidPcb.BoardThicknessOptions;
export const selectBreakDownVoltageOptions = (state: ReduxState) => state.rigidPcb.BreakDownVoltageOptions;
export const selectDesignFormatOptions = (state: ReduxState) => state.rigidPcb.DesignFormatOptions;
export const selectDifferentDesignsInPanelOptions = (state: ReduxState) =>
	state.rigidPcb.DifferentDesignsInPanelOptions;
export const selectDispatchUnitOptions = (state: ReduxState) => state.rigidPcb.DispatchUnitOptions;
export const selectGoldThicknessOptions = (state: ReduxState) => state.rigidPcb.GoldThicknessOptions;
export const selectImpedenceControlOptions = (state: ReduxState) => state.rigidPcb.ImpedanceControlOptions;
export const selectInnerCuWeightOptions = (state: ReduxState) => state.rigidPcb.InnerCuWeightOptions;
export const selectLayerOptions = (state: ReduxState) => state.rigidPcb.LayerOptions;
export const selectMinViaHoleSizeAndDiameterOptions = (state: ReduxState) =>
	state.rigidPcb.MinViaHoleSizeAndDiameterOptions;
export const selectOuterCuWeightOptions = (state: ReduxState) => state.rigidPcb.OuterCuWeightOptions;
export const selectLeadTimeOptions = (state: ReduxState) => state.rigidPcb.LeadTimeOptions;
export const selectPcbQtyOptions = (state: ReduxState) => state.rigidPcb.PcbQtyOptions;
export const selectSilkscreenOptions = (state: ReduxState) => state.rigidPcb.SilkscreenOptions;
export const selectSurfaceFinishOptions = (state: ReduxState) => state.rigidPcb.SurfaceFinishOptions;
export const selectSoldermaskOptions = (state: ReduxState) => state.rigidPcb.SoldermaskOptions;
export const selectGoldFingersOptions = (state: ReduxState) => state.rigidPcb.GoldFingersOptions;
export const selectPanelQtyOptions = (state: ReduxState) => state.rigidPcb.PanelQtyOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectRigidPcbMemoized = createSelector([selectRigidPcbState], rigidPcb => {
	const rigidPcbFabSpecs: RigidPcbFabSpecsType = {
		Type: "Rigid PCB",
		Category: "PCB",
		Name: rigidPcb.Name,
		OrderedQty: rigidPcb.OrderedQty,
		Layer: rigidPcb.Layer,
		BaseMaterial: rigidPcb.BaseMaterial,
		DesignFormat: rigidPcb.DesignFormat,
		DifferentDesignsInPanel: rigidPcb.DifferentDesignsInPanel,
		Material: rigidPcb.Material,
		BoardSizeX: rigidPcb.BoardSizeX,
		BoardSizeY: rigidPcb.BoardSizeY,
		PanelQty: rigidPcb.PanelQty,
		Columns: rigidPcb.Columns,
		Rows: rigidPcb.Rows,
		SinglePiecesQty: rigidPcb.SinglePiecesQty,
		PcbQty: rigidPcb.PcbQty,
		BoardThickness: rigidPcb.BoardThickness,
		Soldermask: rigidPcb.Soldermask,
		Silkscreen: rigidPcb.Silkscreen,
		SurfaceFinish: rigidPcb.SurfaceFinish,
		GoldFingers: rigidPcb.GoldFingers,
		GoldThickness: rigidPcb.GoldThickness,
		EdgeRails: rigidPcb.EdgeRails,
		EdgeRailSize: rigidPcb.EdgeRailSize,
		PanelSizeX: rigidPcb.PanelSizeX,
		PanelSizeY: rigidPcb.PanelSizeY,
		OuterCuWeight: rigidPcb.OuterCuWeight,
		CopperStructure: rigidPcb.CopperStructure,
		ThermalConductivity: rigidPcb.ThermalConductivity,
		BreakDownVoltage: rigidPcb.BreakDownVoltage,
		InnerCuWeight: rigidPcb.InnerCuWeight,
		ImpedanceControl: rigidPcb.ImpedanceControl,
		ViaCovering: rigidPcb.ViaCovering,
		MinViaHoleSizeAndDiameter: rigidPcb.MinViaHoleSizeAndDiameter,
		BoardOutlineTolerance: rigidPcb.BoardOutlineTolerance,
		ViaHoles: rigidPcb.ViaHoles,
		CastellatedHoles: rigidPcb.CastellatedHoles,
		CastellatedHolesEdges: rigidPcb.CastellatedHolesEdges,
		ChamferedGoldFingers: rigidPcb.ChamferedGoldFingers,
		LeadTime: rigidPcb.LeadTime,
		DispatchUnit: rigidPcb.DispatchUnit,
		NetPrice: rigidPcb.NetPrice,
		UploadedFileName: rigidPcb.UploadedFileName,
		UploadedFileUrl: rigidPcb.UploadedFileUrl,
	};
	return rigidPcbFabSpecs;
});
