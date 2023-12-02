import { formatToInr } from "@packages/shared/lib/utils";

export function calculatePartUnitPrice(parts: PartDataType[], partNum: string): string {
	const part = parts.find(item => item.PartNumber === partNum);
	if (!part) return "₹0.0"; // not found

	const sortedPricing = part.PriceBreaks.sort((a, b) => a.Quantity - b.Quantity);
	const priceSlab = sortedPricing.reduce((acc, curr) => {
		if (part.OrderedQty >= curr.Quantity) {
			return curr; // valid slab
		}
		return acc; //last slab
	}, sortedPricing[0]); // Default to the first slab if none are valid

	return priceSlab ? priceSlab.Price : "₹0.0";
}

export function calculatePartNetPrice(unitPrice: string, cartQty: number) {
	if (isNaN(cartQty)) {
		cartQty = 1;
	}
	const extPrice = Number(unitPrice.slice(1).replace(/,/g, "")) * cartQty;
	return formatToInr(extPrice);
}