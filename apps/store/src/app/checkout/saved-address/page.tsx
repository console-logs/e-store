import { fetchAddressesAction } from "@/actions";
import { EditAddressForm } from "@/components/checkout/address/edit-address-form";
import { ViewSavedAddresses } from "@/components/checkout/address/view-saved-address";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Saved Addresses",
};

export default async function SavedAddress() {
	const addresses = await fetchAddressesAction().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	if (!addresses?.billingAddresses || !addresses.shippingAddresses) {
		return (
			<div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 lg:px-8">
				<EditAddressForm />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
			<ViewSavedAddresses
				billingAddresses={addresses.billingAddresses}
				shippingAddresses={addresses.shippingAddresses}
			/>
		</div>
	);
}
