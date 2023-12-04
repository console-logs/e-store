import { type ReduxState } from "@/redux/store";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: PcbAssemblyStoreStateType = {
	type: "Assembly",
	projectName: "",
	boardType: "Single PCB",
	pcbsPerPanel: 1,
	quantity: 10,
	assemblySides: "Top Side",
	numOfUniqueComponents: 5,
	numOfSmdComponents: 10,
	numOfBgaComponents: 2,
	numOfThroughHoleComponents: 5,
	tempHumiditySensitivity: "Low",
	dePanel: "Yes",
	conformalCoating: "Top Side",
	functionalTest: "No",
	componentsProcurement: "TurnKey",
	turnaroundTime: "Standard 5-7 days",
	calculatedPrice: 4500,
	tentativeDispatchDate: getFutureDate(7),
	oneTimeSetupCosts: 5000,
	bomFile: "",
	gerberFile: "",
	pickAndPlaceFile: "",

	// options
	boardTypeOptions: ["Single PCB", "Panel"],
	assemblySideOptions: ["Top Side", "Bottom Side", "Both Sides"],
	tempHumiditySensitivityOptions: ["Low", "Medium", "High"],
	dePanelOptions: ["Yes", "No"],
	conformalCoatingOptions: ["Top Side", "Bottom Side", "Both Sides"],
	functionalTestOptions: ["Yes", "No"],
	componentsProcurementOptions: ["TurnKey", "Consigned", "Combo"],
	turnaroundTimeOptions: ["Standard 5-7 days", "Expedited 3-4 days"],
};

const pcbAssemblySlice = createSlice({
	name: "pcbAssembly",
	initialState,
	reducers: {
		setProjectName: (state, action: PayloadAction<string>) => {
			state.projectName = action.payload;
		},
		setBoardType: (state, action: PayloadAction<"Single PCB" | "Panel">) => {
			state.boardType = action.payload;
		},
		setPcbsPerPanel: (state, action: PayloadAction<number>) => {
			state.pcbsPerPanel = action.payload;
		},
		setQuantity: (state, action: PayloadAction<number>) => {
			state.quantity = action.payload;
		},
		setAssemblySides: (state, action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">) => {
			state.assemblySides = action.payload;
		},
		setNumOfUniqueComponents: (state, action: PayloadAction<number>) => {
			state.numOfUniqueComponents = action.payload;
		},
		setNumOfSmdComponents: (state, action: PayloadAction<number>) => {
			state.numOfSmdComponents = action.payload;
		},
		setNumOfBgaComponents: (state, action: PayloadAction<number>) => {
			state.numOfBgaComponents = action.payload;
		},
		setNumOfThroughHoleComponents: (state, action: PayloadAction<number>) => {
			state.numOfThroughHoleComponents = action.payload;
		},
		setTempHumiditySensitivity: (state, action: PayloadAction<"Low" | "Medium" | "High">) => {
			state.tempHumiditySensitivity = action.payload;
		},
		setDePanel: (state, action: PayloadAction<"Yes" | "No">) => {
			state.dePanel = action.payload;
		},
		setConformalCoating: (state, action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">) => {
			state.conformalCoating = action.payload;
		},
		setFunctionalTest: (state, action: PayloadAction<"Yes" | "No">) => {
			state.functionalTest = action.payload;
		},
		setComponentsProcurement: (state, action: PayloadAction<"TurnKey" | "Consigned" | "Combo">) => {
			state.componentsProcurement = action.payload;
		},
		setLeadTime: (state, action: PayloadAction<"Standard 5-7 days" | "Expedited 3-4 days">) => {
			state.turnaroundTime = action.payload;
		},
		setPcbAssemblyPrice: (state, action: PayloadAction<number>) => {
			state.calculatedPrice = action.payload;
		},
		setOneTimeSetupCost: (state, action: PayloadAction<number>) => {
			state.oneTimeSetupCosts = action.payload;
		},
		setTentativeDispatchDate: (state, action: PayloadAction<string>) => {
			state.tentativeDispatchDate = action.payload;
		},
		setBomFile: (state, action: PayloadAction<string>) => {
			state.bomFile = action.payload;
		},
		setGerberFile: (state, action: PayloadAction<string>) => {
			state.gerberFile = action.payload;
		},
		setPickAndPlaceFile: (state, action: PayloadAction<string>) => {
			state.pickAndPlaceFile = action.payload;
		},
		setPcbPrice: (state, action: PayloadAction<number>) => {
			state.calculatedPrice = action.payload;
		},
	},
});

export const {
	setProjectName,
	setBoardType,
	setPcbsPerPanel,
	setQuantity,
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
export const selectProjectName = (state: ReduxState) => state.pcbAssembly.projectName;
export const selectBoardType = (state: ReduxState) => state.pcbAssembly.boardType;
export const selectPcbsPerPanel = (state: ReduxState) => state.pcbAssembly.pcbsPerPanel;
export const selectQuantity = (state: ReduxState) => state.pcbAssembly.quantity;
export const selectAssemblySides = (state: ReduxState) => state.pcbAssembly.assemblySides;
export const selectNumOfUniqueComponents = (state: ReduxState) => state.pcbAssembly.numOfUniqueComponents;
export const selectNumOfSmdComponents = (state: ReduxState) => state.pcbAssembly.numOfSmdComponents;
export const selectNumOfBgaComponents = (state: ReduxState) => state.pcbAssembly.numOfBgaComponents;
export const selectNumOfThroughHoleComponents = (state: ReduxState) => state.pcbAssembly.numOfThroughHoleComponents;
export const selectTempHumiditySensitivity = (state: ReduxState) => state.pcbAssembly.tempHumiditySensitivity;
export const selectDePanel = (state: ReduxState) => state.pcbAssembly.dePanel;
export const selectConformalCoating = (state: ReduxState) => state.pcbAssembly.conformalCoating;
export const selectFunctionalTest = (state: ReduxState) => state.pcbAssembly.functionalTest;
export const selectComponentsProcurement = (state: ReduxState) => state.pcbAssembly.componentsProcurement;
export const selectTurnaroundTime = (state: ReduxState) => state.pcbAssembly.turnaroundTime;
export const selectCalculatedPrice = (state: ReduxState) => state.pcbAssembly.calculatedPrice;
export const selectTentativeDispatchDate = (state: ReduxState) => state.pcbAssembly.tentativeDispatchDate;
export const selectOneTimeSetupCost = (state: ReduxState) => state.pcbAssembly.oneTimeSetupCosts;
export const selectBomFile = (state: ReduxState) => state.pcbAssembly.bomFile;
export const selectGerberFile = (state: ReduxState) => state.pcbAssembly.gerberFile;
export const selectPickAndPlaceFile = (state: ReduxState) => state.pcbAssembly.pickAndPlaceFile;

/* dropdown menu selectors */
export const selectBoardTypeOptions = (state: ReduxState) => state.pcbAssembly.boardTypeOptions;
export const selectAssemblySideOptions = (state: ReduxState) => state.pcbAssembly.assemblySideOptions;
export const selectTempHumiditySensitivityOptions = (state: ReduxState) =>
	state.pcbAssembly.tempHumiditySensitivityOptions;
export const selectDePanelOptions = (state: ReduxState) => state.pcbAssembly.dePanelOptions;
export const selectConformalCoatingOptions = (state: ReduxState) => state.pcbAssembly.conformalCoatingOptions;
export const selectFunctionalTestOptions = (state: ReduxState) => state.pcbAssembly.functionalTestOptions;
export const selectComponentsProcurementOptions = (state: ReduxState) => state.pcbAssembly.componentsProcurementOptions;
export const selectTurnaroundTimeOptions = (state: ReduxState) => state.pcbAssembly.turnaroundTimeOptions;

/* Memoised Selector => Output selector performs type transformation */
export const selectPcbAssemblyMemomized = createSelector([selectPcbAssemblyState], pcbAssembly => {
	const pcbAssemblyFabSpecs: PcbAssemblyFabSpecsType = {
		type: "Assembly",
		projectName: pcbAssembly.projectName,
		boardType: pcbAssembly.boardType,
		pcbsPerPanel: pcbAssembly.pcbsPerPanel,
		quantity: pcbAssembly.quantity,
		assemblySides: pcbAssembly.assemblySides,
		numOfUniqueComponents: pcbAssembly.numOfUniqueComponents,
		numOfSmdComponents: pcbAssembly.numOfSmdComponents,
		numOfBgaComponents: pcbAssembly.numOfBgaComponents,
		numOfThroughHoleComponents: pcbAssembly.numOfThroughHoleComponents,
		tempHumiditySensitivity: pcbAssembly.tempHumiditySensitivity,
		dePanel: pcbAssembly.dePanel,
		conformalCoating: pcbAssembly.conformalCoating,
		functionalTest: pcbAssembly.functionalTest,
		componentsProcurement: pcbAssembly.componentsProcurement,
		turnaroundTime: pcbAssembly.turnaroundTime,
		oneTimeSetupCosts: pcbAssembly.oneTimeSetupCosts,
		calculatedPrice: pcbAssembly.calculatedPrice,
		bomFile: pcbAssembly.bomFile,
		gerberFile: pcbAssembly.gerberFile,
		pickAndPlaceFile: pcbAssembly.pickAndPlaceFile,
	};
	return pcbAssemblyFabSpecs;
});
