import { createTRPCRouter } from "@/server/api/trpc";
import { partRouter } from "@/server/api/routers/part";

// This is the primary router for your server.
// All routers added in /api/routers should be manually added here.
export const appRouter = createTRPCRouter({
  part: partRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
