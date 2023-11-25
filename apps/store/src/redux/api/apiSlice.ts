import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "pcbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    calculatePcbPrice: builder.mutation({
      query: (fabSpecs: RigidPcbStoreStateType) => ({
        url: "/rigid-pcb",
        method: "POST",
        body: fabSpecs,
      }),
    }),
    calculateFlexPcbPrice: builder.mutation({
      query: (fabSpecs: FlexPcbStoreStateType) => ({
        url: "/flex-pcb",
        method: "POST",
        body: fabSpecs,
      }),
    }),
    calculateAssemblyPcbPrice: builder.mutation({
      query: (assemblySpecs: PcbAssemblyStoreStateType) => ({
        url: "/pcb-assembly",
        method: "POST",
        body: assemblySpecs,
      }),
    }),
  }),
});

export const {
  useCalculatePcbPriceMutation,
  useCalculateFlexPcbPriceMutation,
  useCalculateAssemblyPcbPriceMutation,
} = apiSlice;
