"use client";
import { Icons } from "@packages/shared/components/Icons";
import { Alert, AlertDescription, AlertTitle } from "@shared/components/ui/alert";

export default function NaComponentsAlert(props: { cart: CartDataType | null }) {
	const { cart } = props;
	const parts = cart ? cart.cartItems.filter((item): item is PartDataType => item.Type === "Part") : [];
	const naParts = parts.filter(part => part.Availability === "None" || part.Availability === "On Order");
	return (
		<Alert hidden={!naParts.length}>
			<Icons.ImWarning className="h-4 w-4" />
			<AlertTitle className="font-semibold">Heads up!</AlertTitle>
			<AlertDescription>
				Parts that are not in stock will be removed at checkout. Please make a note of them.
			</AlertDescription>
		</Alert>
	);
}
