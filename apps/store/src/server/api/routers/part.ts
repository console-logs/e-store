import { PARTS_API, PART_REQUEST_RATE_LIMIT } from "@/lib/constants";
import { redis } from "@/lib/redis";
import { rateLimiter } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

let requestCount = 0;

export const partRouter = createTRPCRouter({
	getParts: publicProcedure.input(z.object({ mpn: z.string() })).query(async ({ input }) => {
		try {
			const mpn = input.mpn;
			const cachedData = await redis.get(mpn);
			// check cache first
			if (cachedData) {
				console.log("GETTING DATA FROM CACHE");
				return JSON.parse(cachedData) as PartResultsType;
			}
			// no cached data available
			console.log("FETCHING DATA FROM API");

			await rateLimiter(requestCount, PART_REQUEST_RATE_LIMIT); // 1 request every 2 seconds.
			requestCount = (requestCount + 1) % PART_REQUEST_RATE_LIMIT; // reset request count after 30 requests

			const response = await fetch(PARTS_API + mpn);
			if (!response.ok) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Cannot process request:" + response.statusText,
				});
			}
			const data = (await response.json()) as PartResultsType;
			// cache data
			await redis.set(mpn, JSON.stringify(data));
			await redis.expire(mpn, 60 * 60 * 24); // 1 day
			return data;
		} catch (error) {
			throw error; // Rethrow the error for TRPC [src/api/trpc/[trpc].ts] to handle
		}
	}),
});
