"use client";
import { ADDRESSES_PAGE } from "@/lib/routes";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CheckoutBtn() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			onClick={() => {
				startTransition(() => {
					router.push(ADDRESSES_PAGE);
				});
			}}
			className="w-full">
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center"
					aria-hidden="true"
				/>
			) : (
				"Checkout"
			)}
		</Button>
	);
}
