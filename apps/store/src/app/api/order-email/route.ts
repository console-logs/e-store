import { OrderConfirmationEmailTemplate } from "@/email-templates/order-confirmation-email-template";
import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	const order = (await request.json()) as OrderType;
	try {
		const data = await resend.emails.send({
			from: "E-Store <updates@consolelogs.in>",
			to: [order.billingAddress.email],
			subject: `E-Store Order Confirmation: ${order.id}`,
			react: OrderConfirmationEmailTemplate(order),
		});
		return Response.json(data);
	} catch (error) {
		return Response.json({ error });
	}
}
