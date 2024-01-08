import { flexPcbRouter } from "@/server/api/routers/flex-pcb-router";
import { partRouter } from "@/server/api/routers/part-router";
import { pcbAssemblyRouter } from "@/server/api/routers/pcb-assembly-router";
import { razorpayRouter } from "@/server/api/routers/razorpay-router";
import { rigidPcbRouter } from "@/server/api/routers/rigid-pcb-router";
import { signupEmailRouter } from "@/server/api/routers/signup-email-router";
import { createTRPCRouter } from "@/server/api/trpc";

// This is the primary router for your server.
// All routers added in /api/routers should be manually added here.
export const appRouter = createTRPCRouter({
	part: partRouter,
	rigidPcb: rigidPcbRouter,
	flexPcb: flexPcbRouter,
	pcbAssembly: pcbAssemblyRouter,
	razorpay: razorpayRouter,
	signup: signupEmailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
