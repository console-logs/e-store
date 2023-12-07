"use client";
import { AddressDisplayCard } from "@/app/checkout/_components/address/displayAddress";
import { EDIT_ADDRESSES_PAGE, REVIEW_ORDER_PAGE } from "@/lib/routes";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ViewSavedAddresses({
	billingAddresses,
	shippingAddresses,
}: {
	billingAddresses: Array<AddressType>;
	shippingAddresses: Array<AddressType>;
}) {
	const [isLoading, startTransition] = useTransition();
	const router = useRouter();

	const billingAddress = billingAddresses[0]!;
	const shippingAddress = shippingAddresses[0]!;
	return (
		<div>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold tracking-tight">Last used Addresses</h1>
				<Button asChild>
					<Link href={EDIT_ADDRESSES_PAGE}>Add new address</Link>
				</Button>
			</div>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-10">
				<AddressDisplayCard address={billingAddress} />
				<AddressDisplayCard address={shippingAddress} />
			</div>
			<Button
				className="mt-8 w-full"
				disabled={isLoading}
				onClick={() => {
					startTransition(() => {
						router.push(REVIEW_ORDER_PAGE);
					});
				}}>
				{isLoading ? (
					<Icons.spinner
						className="animate-spin text-center"
						aria-hidden="true"
					/>
				) : (
					"Review Order"
				)}
			</Button>
		</div>
	);
}
