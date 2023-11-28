import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "pcbApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: builder => ({
		calculateRigidPcbPrice: builder.mutation<number, RigidPcbFabSpecsType>({
			query: (fabSpecs: RigidPcbFabSpecsType) => ({
				url: "/rigid-pcb",
				method: "POST",
				body: fabSpecs,
			}),
		}),
		calculateFlexPcbPrice: builder.mutation<number, FlexPcbFabSpecsType>({
			query: (fabSpecs: FlexPcbFabSpecsType) => ({
				url: "/flex-pcb",
				method: "POST",
				body: fabSpecs,
			}),
		}),
		calculatePcbAssemblyPrice: builder.mutation<
			{ assemblyCost: number; setupCost: number },
			PcbAssemblyFabSpecsType
		>({
			query: (assemblySpecs: PcbAssemblyFabSpecsType) => ({
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
