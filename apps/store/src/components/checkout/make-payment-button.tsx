"use client";
import { captureOrderDetails } from "@/actions";
import { env } from "@/env";
import { OVERHEAD_SHIPPING_CHARGES } from "@/lib/constants";
import { ORDER_FAILED_PAGE, ORDER_SUCCESS_PAGE } from "@/lib/page-routes";
import { calculateGst, initializeRazorpay } from "@/lib/utils";
import { tRPCReactApi } from "@/trpc/react";
import { formatToInr } from "@packages/shared/lib/utils";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import useRazorpay, { type RazorpayOptions } from "react-razorpay";

export function MakePaymentButton(props: { cartValue: number }) {
	const { cartValue } = props;
	const tax = calculateGst(cartValue);
	const [isLoading, startTransition] = useTransition();
	const router = useRouter();
	const [Razorpay] = useRazorpay();
	const { data } = tRPCReactApi.razorpay.getOrder.useQuery();

	async function handlePaymentBtnClick() {
		startTransition(async () => {
			try {
				const res = await initializeRazorpay();
				if (!res) {
					throw new Error("Razorpay SDK failed to load");
				}

				if (!data) {
					throw new Error("Something went wrong with payment gateway. Please try again later");
				}
				const options: RazorpayOptions = {
					order_id: data.id,
					key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
					amount: data.amount,
					currency: data.currency,
					name: data.name,
					description: `ID-${data.id}-${data.currency}-${data.amount}`,
					prefill: {
						name: data.name,
						email: data.email,
						contact: data.phoneNumber,
					},
					handler: (razorpayResponse: RazorpayResponseType) => {
						captureOrderDetails({
							razorpayResponses: razorpayResponse,
							razorpayOrderValue: data.amount,
						}).catch((error: unknown) => {
							const unknownError = "Something went wrong, please try again later.";
							const errorMessage = error instanceof Error ? error.message : unknownError;
							throw new Error(errorMessage); // activates closest error.tsx file
						});
						router.push(ORDER_SUCCESS_PAGE);
					},
					theme: {
						color: "#000000", // black
					},
				};

				const paymentObject = new Razorpay(options);

				paymentObject.on("payment.failed", (response: RazorpayErrorType) => {
					console.error(response.error.code);
					console.error(response.error.description);
					console.error(response.error.source);
					console.error(response.error.step);
					console.error(response.error.reason);
					console.error(response.error.metadata.order_id);
					console.error(response.error.metadata.payment_id);

					router.push(ORDER_FAILED_PAGE);
				});
				paymentObject.open();
			} catch (error) {
				throw error;
			}
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
