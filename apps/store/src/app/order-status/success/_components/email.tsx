import { calculateGst, calculatePartNetPrice, calculatePartUnitPrice } from "@/lib/utils";
import { formatToInr } from "@packages/shared/lib/utils";

export default function OrderConfirmationEmailTemplate(order: OrderType) {
	const { billingAddress, shippingAddress, id, cart } = order;
	const orderValue = order.cartTotal;
	const orderValueInRupees = orderValue / 100;
	const tax = calculateGst(orderValueInRupees);
	const parts = cart ? cart.cartItems.filter((item): item is PartDataType => item.Type === "Part") : [];
	const pcbs = cart
		? cart.cartItems.filter(
				(item): item is RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType =>
					item.Type === "PCB"
		  )
		: [];

	return (
		<div
			style={{
				margin: "auto",
				maxWidth: "100%",
				padding: "1rem",
			}}>
			<h1>Your order was placed successfully! 🎉</h1>
			<h3>Order Number: {id}</h3>

			{/* Addresses */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: "1rem",
					marginBottom: "1rem",
				}}>
				<div>
					<h3>Shipping Address</h3>
					<p>First Name: {shippingAddress.firstName}</p>
					<p>Last Name: {shippingAddress.lastName}</p>
					<p>Address 1: {shippingAddress.address1}</p>
					<p>Address 2: {shippingAddress.address2}</p>
					<p>City: {shippingAddress.city}</p>
					<p>State: {shippingAddress.state}</p>
					<p>Pincode: {shippingAddress.pincode}</p>
					<p>Phone: {shippingAddress.phone}</p>
					<p>Email: {shippingAddress.email}</p>
				</div>
				<div>
					<h3>Billing Address</h3>
					<p>First Name: {billingAddress.firstName}</p>
					<p>Last Name: {billingAddress.lastName}</p>
					<p>Address 1: {billingAddress.address1}</p>
					<p>Address 2: {billingAddress.address2}</p>
					<p>City: {billingAddress.city}</p>
					<p>State: {billingAddress.state}</p>
					<p>Pincode: {billingAddress.pincode}</p>
					<p>Phone: {billingAddress.phone}</p>
					<p>Email: {billingAddress.email}</p>
				</div>
			</div>

			{/* Payement Summary */}
			<div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
				<h3>Payment Summary:</h3>
				<table style={{ tableLayout: "auto", width: "100%", border: "1px solid black" }}>
					<thead
						style={{
							fontWeight: "bold",
							border: "1px solid black",
						}}>
						<tr>
							<th style={{ border: "1px solid black", textAlign: "center" }}>Order Value</th>
							<th style={{ border: "1px solid black", textAlign: "center" }}>Discount</th>
							<th style={{ border: "1px solid black", textAlign: "center" }}>Tax</th>
							<th style={{ border: "1px solid black", textAlign: "center" }}>Shipping</th>
							<th style={{ border: "1px solid black", textAlign: "center" }}>Total</th>
						</tr>
					</thead>
					<tbody style={{ border: "1px solid black" }}>
						<tr>
							<td style={{ border: "1px solid black", textAlign: "center" }}>
								{formatToInr(order.cartValue)}
							</td>
							<td style={{ border: "1px solid black", textAlign: "center" }}>
								{formatToInr(order.discountValue)}
							</td>
							<td style={{ border: "1px solid black", textAlign: "center" }}>{formatToInr(tax)}</td>
							<td style={{ border: "1px solid black", textAlign: "center" }}>
								{formatToInr(order.shippingCost)}
							</td>
							<td style={{ border: "1px solid black", textAlign: "center" }}>
								{formatToInr(order.cartTotal)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Ordered Items */}
			<div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
				<h3>Ordered Items:</h3>
				{/* Parts */}
				{parts.length > 0 && (
					<div>
						<h4>Parts:</h4>
						{parts.map((part, partIdx) => {
							const { Name, Description, OrderedQty } = part;
							const serialNum = partIdx + 1;
							const unitPrice = calculatePartUnitPrice(parts, Name);
							const netPrice = calculatePartNetPrice(unitPrice, OrderedQty);
							return (
								<table style={{ tableLayout: "auto", width: "100%", border: "1px solid black" }}>
									<thead
										style={{
											fontWeight: "bold",
											backgroundColor: "#cbd5e1",
											border: "1px solid black",
										}}>
										<tr>
											<th style={{ border: "1px solid black", textAlign: "center" }}>S.No</th>
											<th style={{ border: "1px solid black", textAlign: "center" }}>Name</th>
											<th style={{ border: "1px solid black", textAlign: "center" }}>
												Description
											</th>
											<th style={{ border: "1px solid black", textAlign: "center" }}>Quantity</th>
											<th style={{ border: "1px solid black", textAlign: "center" }}>
												Unit Price
											</th>
											<th style={{ border: "1px solid black", textAlign: "center" }}>
												Net Price
											</th>
										</tr>
									</thead>
									<tbody style={{ border: "1px solid black" }}>
										<tr>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{serialNum}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>{Name}</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{Description}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{OrderedQty}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{unitPrice}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{netPrice}
											</td>
										</tr>
									</tbody>
								</table>
							);
						})}
					</div>
				)}

				{/* Pcbs */}
				{pcbs.length > 0 && (
					<div>
						<h4>PCBs:</h4>
						<table style={{ tableLayout: "auto", width: "100%", border: "1px solid black" }}>
							<thead
								style={{
									fontWeight: "bold",
									backgroundColor: "#cbd5e1",
									border: "1px solid black",
								}}>
								<tr>
									<th style={{ border: "1px solid black", textAlign: "center" }}>S.No</th>
									<th style={{ border: "1px solid black", textAlign: "center" }}>PCB Name</th>
									<th style={{ border: "1px solid black", textAlign: "center" }}>Category</th>
									<th style={{ border: "1px solid black", textAlign: "center" }}>Quantity</th>
									<th style={{ border: "1px solid black", textAlign: "center" }}>Unit Price</th>
									<th style={{ border: "1px solid black", textAlign: "center" }}>Net Price</th>
								</tr>
							</thead>
							{pcbs.map((pcb, pcbIdx) => {
								const serialNum = pcbIdx + 1;
								const { NetPrice, Category } = pcb;
								const isRigidOrFlex = Category === "Rigid PCB" || Category === "Flex PCB";
								const name = pcb.Name;
								const quantity = isRigidOrFlex
									? pcb.DesignFormat === "Single PCB"
										? pcb.PcbQty
										: pcb.SinglePiecesQty
									: pcb.OrderedQty;
								const netPrice = NetPrice;
								const unitPrice = netPrice / quantity;
								return (
									<tbody style={{ border: "1px solid black" }}>
										<tr>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{serialNum}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>{name}</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{Category}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{quantity} No&apos;s
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{formatToInr(unitPrice)}
											</td>
											<td style={{ border: "1px solid black", textAlign: "center" }}>
												{formatToInr(NetPrice)}
											</td>
										</tr>
									</tbody>
								);
							})}
						</table>
					</div>
				)}
			</div>

			<p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
				We appreciate your order, we&apos;re currently processing it. So hang tight our team will keep you
				updated!
			</p>
		</div>
	);
}
