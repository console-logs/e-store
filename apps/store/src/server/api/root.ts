import { pcbAssemblyRouter } from "@/server/api/routers/assembly";
import { flexPcbRouter } from "@/server/api/routers/flex";
import { partRouter } from "@/server/api/routers/part";
import { razorpayRouter } from "@/server/api/routers/razorpay";
import { rigidPcbRouter } from "@/server/api/routers/rigid";
import { createTRPCRouter } from "@/server/api/trpc";

// This is the primary router for your server.
// All routers added in /api/routers should be manually added here.
export const appRouter = createTRPCRouter({
	part: partRouter,
	rigidPcb: rigidPcbRouter,
	flexPcb: flexPcbRouter,
	pcbAssembly: pcbAssemblyRouter,
	razorpay: razorpayRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
