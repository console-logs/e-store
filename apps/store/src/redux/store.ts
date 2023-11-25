import { apiSlice } from "@/redux/api/apiSlice";
import assemblyPcbReducer from "@/redux/reducers/assemblyPcbSlice";
import flexPcbReducer from "@/redux/reducers/flexPcbSlice";
import rigidPcbReducer from "@/redux/reducers/rigidPcbSlice";
import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const reduxStore = configureStore({
  reducer: {
    rigidPcb: rigidPcbReducer,
    flexPcb: flexPcbReducer,
    assemblyPcb: assemblyPcbReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === "development",
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
