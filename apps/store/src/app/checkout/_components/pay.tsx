"use client";
import { OVERHEAD_SHIPPING_CHARGES } from "@/lib/constants";
import { calculateGst } from "@/lib/utils";
import { formatToInr } from "@packages/shared/lib/utils";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { useTransition } from "react";

export default function PayButton(props: { cartValue: number }) {
	const { cartValue } = props;
	const tax = calculateGst(cartValue);
	const [isLoading, startTransition] = useTransition();

	async function handlePaymentBtnClick() {
		startTransition(() => {
			throw new Error("Payment functionality not implemented");
		});
	}

	return (
		<Button
			disabled={isLoading}
			className="mt-8 w-full"
			onClick={async () => {
				await handlePaymentBtnClick();
			}}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center"
					aria-hidden="true"
				/>
			) : (
				`Pay ${formatToInr(cartValue + tax + OVERHEAD_SHIPPING_CHARGES)}`
			)}
		</Button>
	);
}
