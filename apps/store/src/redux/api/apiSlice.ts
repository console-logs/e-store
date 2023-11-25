import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "pcbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    calculateRigidPcbPrice: builder.mutation<number, RigidPcbStoreStateType>({
      query: (fabSpecs: RigidPcbStoreStateType) => ({
        url: "/rigid-pcb",
        method: "POST",
        body: fabSpecs,
      }),
    }),
    calculateFlexPcbPrice: builder.mutation<number, FlexPcbStoreStateType>({
      query: (fabSpecs: FlexPcbStoreStateType) => ({
        url: "/flex-pcb",
        method: "POST",
        body: fabSpecs,
      }),
    }),
    calculatePcbAssemblyPrice: builder.mutation<
      number,
      PcbAssemblyStoreStateType
    >({
      query: (assemblySpecs: PcbAssemblyStoreStateType) => ({
        url: "/pcb-assembly",
        method: "POST",
        body: assemblySpecs,
      }),
    }),
  }),
});

export const {
  useCalculateRigidPcbPriceMutation,
  useCalculateFlexPcbPriceMutation,
  useCalculatePcbAssemblyPriceMutation,
} = apiSlice;
