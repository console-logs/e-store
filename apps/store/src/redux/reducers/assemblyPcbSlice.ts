import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFutureDate } from "@shared/lib/utils";

const initialState: AssemblyPcbStoreStateType = {
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

const assemblyPcbSlice = createSlice({
  name: "assemblyPcb",
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
    setAssemblySides: (
      state,
      action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">,
    ) => {
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
    setTempHumiditySensitivity: (
      state,
      action: PayloadAction<"Low" | "Medium" | "High">,
    ) => {
      state.tempHumiditySensitivity = action.payload;
    },
    setDePanel: (state, action: PayloadAction<"Yes" | "No">) => {
      state.dePanel = action.payload;
    },
    setConformalCoating: (
      state,
      action: PayloadAction<"Top Side" | "Bottom Side" | "Both Sides">,
    ) => {
      state.conformalCoating = action.payload;
    },
    setFunctionalTest: (state, action: PayloadAction<"Yes" | "No">) => {
      state.functionalTest = action.payload;
    },
    setComponentsProcurement: (
      state,
      action: PayloadAction<"TurnKey" | "Consigned" | "Combo">,
    ) => {
      state.componentsProcurement = action.payload;
    },
    setLeadTime: (
      state,
      action: PayloadAction<"Standard 5-7 days" | "Expedited 3-4 days">,
    ) => {
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
} = assemblyPcbSlice.actions;

export default assemblyPcbSlice.reducer;
