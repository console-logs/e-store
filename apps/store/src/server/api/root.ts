import { partRouter } from "@/server/api/routers/part";
import { rigidPcbRouter } from "@/server/api/routers/rigidPcb";
import { createTRPCRouter } from "@/server/api/trpc";

// This is the primary router for your server.
// All routers added in /api/routers should be manually added here.
export const appRouter = createTRPCRouter({
	part: partRouter,
	rigidPcb: rigidPcbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
