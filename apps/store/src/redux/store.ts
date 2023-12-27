import flexPcbReducer from "@/redux/reducers/flex-pcb-slice";
import pcbAssemblyReducer from "@/redux/reducers/pcb-assembly-slice";
import rigidPcbReducer from "@/redux/reducers/rigid-pcb-slice";
import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
	type TypedUseSelectorHook,
} from "react-redux";

export const reduxStore = configureStore({
	reducer: {
		rigidPcb: rigidPcbReducer,
		flexPcb: flexPcbReducer,
		pcbAssembly: pcbAssemblyReducer,
	},

	devTools: process.env.NODE_ENV === "development",
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;
