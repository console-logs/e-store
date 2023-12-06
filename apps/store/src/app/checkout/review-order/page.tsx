import { fetchAddressesAction, fetchCartItemsAction } from "@/actions";
import BasketPartsTable from "@/app/cart/_components/partsTable";
import BasketPcbsTable from "@/app/cart/_components/pcbsTable";
import CartSummary from "@/app/cart/_components/summary";
import ViewSavedAddresses from "@/app/checkout/_components/address/viewAddress";
import PayButton from "@/app/checkout/_components/pay";
import { calculateCartTotal } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Review Order",
};
export default async function ReviewOrder() {
	const cart = await fetchCartItemsAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	const cartValue = calculateCartTotal(cart);

	const { billingAddresses, shippingAddresses } = await fetchAddressesAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
			<h1 className="text-3xl font-bold tracking-tight">Review Order</h1>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-10">
				<ViewSavedAddresses
					billingAddresses={billingAddresses}
					shippingAddresses={shippingAddresses}
				/>
			</div>

			<div className="space-y-10">
				<BasketPartsTable />
				<BasketPcbsTable />
			</div>

			<div className="mt-10 flex justify-end">
				<div className="w-full sm:w-1/2">
					<CartSummary cartValue={cartValue} />
					<PayButton cartValue={cartValue} />
				</div>
			</div>
		</div>
	);
}
