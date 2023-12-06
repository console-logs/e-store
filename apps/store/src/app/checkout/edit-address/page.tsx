import EditAddressForm from "@/app/checkout/_components/address/editAddress";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Addresses",
};

export default function EditAddress() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 lg:px-8">
			<EditAddressForm />
		</div>
	);
}
