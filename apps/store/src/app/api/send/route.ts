import { Resend } from "resend";
import SignupEmailTemplate from "@/app/auth/signup/_components/email";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	const data = (await request.json()) as { email: string; firstName: string };
	const { email, firstName } = data;
	try {
		const data = await resend.emails.send({
			from: "E-Store <hello@consolelogs.in>",
			to: [email],
			subject: "Thanks for signing up!",
			react: SignupEmailTemplate({ firstName }),
		});
		return Response.json(data);
	} catch (error) {
		return Response.json({ error });
	}
}
