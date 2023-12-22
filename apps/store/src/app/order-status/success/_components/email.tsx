import { calculateGst } from "@/lib/utils";

export default function OrderConfirmationEmailTemplate(order: OrderType) {
	const { billingAddress, shippingAddress, id } = order;
	const orderValue = order.cartTotal;
	const orderValueInRupees = orderValue / 100;
	const tax = calculateGst(orderValueInRupees);

	return (
		<div
			style={{
				margin: "auto",
				maxWidth: "100%",
				padding: "0 1rem",
			}}>
			<h1>Thanks for your order!</h1>
			<h2>Order Number: {id}</h2>
		</div>
	);
}
