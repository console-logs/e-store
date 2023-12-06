import { fetchCartItemsAction } from "@/actions";
import CheckoutBtn from "@/app/cart/_components/checkout";
import ContinueShoppingBtn from "@/app/cart/_components/continue";
import NaComponentsAlert from "@/app/cart/_components/naAlert";
import BasketPartsTable from "@/app/cart/_components/partsTable";
import BasketPcbsTable from "@/app/cart/_components/pcbsTable";
import CartSummary from "@/app/cart/_components/summary";
import { calculateCartTotal } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shopping Cart",
};

export default async function ShoppingCart() {
	const cart = await fetchCartItemsAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	const cartValue = calculateCartTotal(cart);

	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
			<div className="mt-8 grid grid-cols-1 gap-y-3 xl:grid-cols-3 xl:gap-x-10">
				<div className="space-y-10 sm:col-span-2">
					<BasketPartsTable />
					<BasketPcbsTable />
				</div>

				<div className="space-y-4">
					<CartSummary cartValue={cartValue} />
					<NaComponentsAlert cart={cart} />
					<CheckoutBtn cartValue={cartValue} />
					<ContinueShoppingBtn />
				</div>
			</div>
		</div>
	);
}
