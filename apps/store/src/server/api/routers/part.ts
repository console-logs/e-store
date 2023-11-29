import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const partRouter = createTRPCRouter({
	getParts: publicProcedure.input(z.object({ mpn: z.string() })).query(async ({ input }) => {
		try {
			const mpn = input.mpn;
			//TODO: REPLACE THE API URL
			const response = await fetch("/api/parts" + mpn);
			if (!response.ok) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Cannot process request:" + response.statusText,
				});
			}
			const data = (await response.json()) as PartResultsType;
			return data;
		} catch (error) {
			throw error; // Rethrow the error for TRPC [src/api/trpc/[trpc].ts] to handle
		}
	}),
});
