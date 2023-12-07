import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		CLERK_SECRET_KEY: z.string().min(1),
		MONGODB_URL: z.string().url(),
		RAZORPAY_KEY_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
		NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
		MONGODB_URL: process.env.MONGODB_URL,
		RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
		NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
