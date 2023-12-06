import { formatToInr } from "@packages/shared/lib/utils";

export function calculatePartUnitPrice(parts: PartDataType[], Name: string): string {
	const part = parts.find(item => item.Name === Name);
	if (!part) return "₹0.0"; // not found

	const sortedPricing = part.PriceBreaks.sort((a, b) => a.Quantity - b.Quantity);
	const priceSlab = sortedPricing.reduce((acc, curr) => {
		if (part.OrderedQty >= curr.Quantity) {
			return curr; // valid slab
		}
		return acc; //last slab
	}, sortedPricing[0]); // Default to the first slab if none are valid
	const price = priceSlab ? priceSlab.Price : "₹0.0";
	const formattedPrice = formatToInr(Number(price.slice(1).replace(/,/g, "")));
	return formattedPrice;
}

export function calculatePartNetPrice(unitPrice: string, cartQty: number) {
	if (isNaN(cartQty)) {
		cartQty = 1;
	}
	const extPrice = Number(unitPrice.slice(1).replace(/,/g, "")) * cartQty;
	return formatToInr(extPrice);
}

export function calculateCartTotal(cart: CartDataType | null): number {
	const pcbTypes = ["Rigid PCB", "Flex PCB", "PCB Assembly"];
	const parts = cart ? cart.cartItems.filter((item): item is PartDataType => item.Type === "Part") : [];
	const pcbs = cart
		? cart.cartItems.filter((item): item is RigidPcbFabSpecsType | FlexPcbFabSpecsType | PcbAssemblyFabSpecsType =>
				pcbTypes.includes(item.Type)
		  )
		: [];
	const partTotal = parts.reduce((acc, curr) => {
		const unitPrice = calculatePartUnitPrice(parts, curr.Name);
		const netPrice = calculatePartNetPrice(unitPrice, curr.OrderedQty);
		const total = Number(netPrice.slice(1).replace(/,/g, ""));
		return acc + total;
	}, 0);

	const pcbTotal = pcbs.reduce((acc, curr) => {
		const total = Number(curr.NetPrice);
		return acc + total;
	}, 0);

	const cartTotal = partTotal + pcbTotal;
	return cartTotal;
}

export function calculateGst(num: number): number {
	return Number((num * 0.18).toFixed(2));
}
