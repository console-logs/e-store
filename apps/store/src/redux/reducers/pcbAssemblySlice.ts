import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: PcbAssemblyStoreStateType = {
	Type: "PCB Assembly",
	Name: "",
	BoardType: "Single PCB",
	PcbsPerPanel: 1,
	OrderedQty: 10,
	AssemblySides: "Top Side",
	NumOfUniqueComponents: 5,
	NumOfSmdComponents: 10,
	NumOfBgaComponents: 2,
	NumOfThroughHoleComponents: 5,
	TempHumiditySensitivity: "Low",
	DePanel: "Yes",
	ConformalCoating: "Top Side",
	FunctionalTest: "No",
	ComponentsProcurement: "TurnKey",
	TurnaroundTime: "Standard 5-7 days",
	NetPrice: 4500,
	TentativeDispatchDate: getFutureDate(7),
	OneTimeSetupCosts: 5000,
	BOMFile: "",
	GerberFile: "",
	PickAndPlaceFile: "",

	// options
	BoardTypeOptions: ["Single PCB", "Panel"],
	AssemblySideOptions: ["Top Side", "Bottom Side", "Both Sides"],
	TempHumiditySensitivityOptions: ["Low", "Medium", "High"],
	DePanelOptions: ["Yes", "No"],
	ConformalCoatingOptions: ["Top Side", "Bottom Side", "Both Sides"],
	FunctionalTestOptions: ["Yes", "No"],
	ComponentsProcurementOptions: ["TurnKey", "Consigned", "Combo"],
	TurnaroundTimeOptions: ["Standard 5-7 days", "Expedited 3-4 days"],
};

const pcbAssemblySlice = createSlice({
	name: "pcbAssembly",
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.Name = action.payload;
		},
		setBoardType: (state, action: PayloadAction<"Single PCB" | "Panel">) => {
			state.BoardType = action.payload;
		},
		setPcbsPerPanel: (state, action: PayloadAction<number>) => {
			state.PcbsPerPanel = action.payload;
		},
		setOrderedQty: (state, action: PayloadAction<number>) => {
			state.OrderedQty = action.payload;
		},
		setAssemblySides: (state, action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">) => {
			state.AssemblySides = action.payload;
		},
		setNumOfUniqueComponents: (state, action: PayloadAction<number>) => {
			state.NumOfUniqueComponents = action.payload;
		},
		setNumOfSmdComponents: (state, action: PayloadAction<number>) => {
			state.NumOfSmdComponents = action.payload;
		},
		setNumOfBgaComponents: (state, action: PayloadAction<number>) => {
			state.NumOfBgaComponents = action.payload;
		},
		setNumOfThroughHoleComponents: (state, action: PayloadAction<number>) => {
			state.NumOfThroughHoleComponents = action.payload;
		},
		setTempHumiditySensitivity: (state, action: PayloadAction<"Low" | "Medium" | "High">) => {
			state.TempHumiditySensitivity = action.payload;
		},
		setDePanel: (state, action: PayloadAction<"Yes" | "No">) => {
			state.DePanel = action.payload;
		},
		setConformalCoating: (state, action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">) => {
			state.ConformalCoating = action.payload;
		},
		setFunctionalTest: (state, action: PayloadAction<"Yes" | "No">) => {
			state.FunctionalTest = action.payload;
		},
		setComponentsProcurement: (state, action: PayloadAction<"TurnKey" | "Consigned" | "Combo">) => {
			state.ComponentsProcurement = action.payload;
		},
		setLeadTime: (state, action: PayloadAction<"Standard 5-7 days" | "Expedited 3-4 days">) => {
			state.TurnaroundTime = action.payload;
		},
		setPcbAssemblyPrice: (state, action: PayloadAction<number>) => {
			state.NetPrice = action.payload;
		},
		setOneTimeSetupCost: (state, action: PayloadAction<number>) => {
			state.OneTimeSetupCosts = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.TentativeDispatchDate = action.payload;
		},
		setBomFile: (state, action: PayloadAction<string>) => {
			state.BOMFile = action.payload;
		},
		setGerberFile: (state, action: PayloadAction<string>) => {
			state.GerberFile = action.payload;
		},
		setPickAndPlaceFile: (state, action: PayloadAction<string>) => {
			state.PickAndPlaceFile = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.NetPrice = action.payload;
		},
	},
});

export const {
	setName,
	setBoardType,
	setPcbsPerPanel,
	setOrderedQty,
	setAssemblySides,
	setNumOfUniqueComponents,
	setNumOfSmdComponents,
	setNumOfBgaComponents,
	setNumOfThroughHoleComponents,
	setTempHumiditySensitivity,
	setDePanel,
	setConformalCoating,
	setFunctionalTest,
	setComponentsProcurement,
	setLeadTime,
	setPcbAssemblyPrice,
	setTentativeDispatchDate,
	setBomFile,
	setGerberFile,
	setPickAndPlaceFile,
	setOneTimeSetupCost,
	setPcbPrice,
} = pcbAssemblySlice.actions;

export default pcbAssemblySlice.reducer;

/* Selectors */
export const selectPcbAssemblyState = (state: ReduxState) => state.pcbAssembly;
export const selectName = (state: ReduxState) => state.pcbAssembly.Name;
export const selectBoardType = (state: ReduxState) => state.pcbAssembly.BoardType;
export const selectPcbsPerPanel = (state: ReduxState) => state.pcbAssembly.PcbsPerPanel;
export const selectOrderedQty = (state: ReduxState) => state.pcbAssembly.OrderedQty;
export const selectAssemblySides = (state: ReduxState) => state.pcbAssembly.AssemblySides;
export const selectNumOfUniqueComponents = (state: ReduxState) => state.pcbAssembly.NumOfUniqueComponents;
export const selectNumOfSmdComponents = (state: ReduxState) => state.pcbAssembly.NumOfSmdComponents;
export const selectNumOfBgaComponents = (state: ReduxState) => state.pcbAssembly.NumOfBgaComponents;
export const selectNumOfThroughHoleComponents = (state: ReduxState) => state.pcbAssembly.NumOfThroughHoleComponents;
export const selectTempHumiditySensitivity = (state: ReduxState) => state.pcbAssembly.TempHumiditySensitivity;
export const selectDePanel = (state: ReduxState) => state.pcbAssembly.DePanel;
export const selectConformalCoating = (state: ReduxState) => state.pcbAssembly.ConformalCoating;
export const selectFunctionalTest = (state: ReduxState) => state.pcbAssembly.FunctionalTest;
export const selectComponentsProcurement = (state: ReduxState) => state.pcbAssembly.ComponentsProcurement;
export const selectTurnaroundTime = (state: ReduxState) => state.pcbAssembly.TurnaroundTime;
export const selectCalculatedPrice = (state: ReduxState) => state.pcbAssembly.NetPrice;
export const selectTentativeDispatchDate = (state: ReduxState) => state.pcbAssembly.TentativeDispatchDate;
export const selectOneTimeSetupCost = (state: ReduxState) => state.pcbAssembly.OneTimeSetupCosts;
export const selectBomFile = (state: ReduxState) => state.pcbAssembly.BOMFile;
export const selectGerberFile = (state: ReduxState) => state.pcbAssembly.GerberFile;
export const selectPickAndPlaceFile = (state: ReduxState) => state.pcbAssembly.PickAndPlaceFile;

/* dropdown menu selectors */
export const selectBoardTypeOptions = (state: ReduxState) => state.pcbAssembly.BoardTypeOptions;
export const selectAssemblySideOptions = (state: ReduxState) => state.pcbAssembly.AssemblySideOptions;
export const selectTempHumiditySensitivityOptions = (state: ReduxState) =>
	state.pcbAssembly.TempHumiditySensitivityOptions;
export const selectDePanelOptions = (state: ReduxState) => state.pcbAssembly.DePanelOptions;
export const selectConformalCoatingOptions = (state: ReduxState) => state.pcbAssembly.ConformalCoatingOptions;
export const selectFunctionalTestOptions = (state: ReduxState) => state.pcbAssembly.FunctionalTestOptions;
export const selectComponentsProcurementOptions = (state: ReduxState) => state.pcbAssembly.ComponentsProcurementOptions;
export const selectTurnaroundTimeOptions = (state: ReduxState) => state.pcbAssembly.TurnaroundTimeOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectPcbAssemblyMemomized = createSelector([selectPcbAssemblyState], pcbAssembly => {
	const pcbAssemblyFabSpecs: PcbAssemblyFabSpecsType = {
		Type: "PCB Assembly",
		Name: pcbAssembly.Name,
		BoardType: pcbAssembly.BoardType,
		PcbsPerPanel: pcbAssembly.PcbsPerPanel,
		OrderedQty: pcbAssembly.OrderedQty,
		AssemblySides: pcbAssembly.AssemblySides,
		NumOfUniqueComponents: pcbAssembly.NumOfUniqueComponents,
		NumOfSmdComponents: pcbAssembly.NumOfSmdComponents,
		NumOfBgaComponents: pcbAssembly.NumOfBgaComponents,
		NumOfThroughHoleComponents: pcbAssembly.NumOfThroughHoleComponents,
		TempHumiditySensitivity: pcbAssembly.TempHumiditySensitivity,
		DePanel: pcbAssembly.DePanel,
		ConformalCoating: pcbAssembly.ConformalCoating,
		FunctionalTest: pcbAssembly.FunctionalTest,
		ComponentsProcurement: pcbAssembly.ComponentsProcurement,
		TurnaroundTime: pcbAssembly.TurnaroundTime,
		OneTimeSetupCosts: pcbAssembly.OneTimeSetupCosts,
		NetPrice: pcbAssembly.NetPrice,
		BOMFile: pcbAssembly.BOMFile,
		GerberFile: pcbAssembly.GerberFile,
		PickAndPlaceFile: pcbAssembly.PickAndPlaceFile,
	};
	return pcbAssemblyFabSpecs;
});
