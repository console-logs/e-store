import { SignupEmailTemplate } from "@/email-templates/signup-email-template";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(env.RESEND_API_KEY);

export const signupEmailRouter = createTRPCRouter({
	sendSignupEmail: publicProcedure
		.input(z.object({ email: z.string(), firstName: z.string() }))
		.mutation(async ({ input }) => {
			try {
				const { email, firstName } = input;
				const response = await resend.emails.send({
					from: "E-Store <hello@consolelogs.in>",
					to: [email],
					subject: "Thanks for signing up!",
					react: SignupEmailTemplate({ firstName }),
				});
        return response;
			} catch (error) {
				throw error; // Rethrow the error for TRPC [src/api/trpc/[trpc].ts] to handle
			}
		}),
});
