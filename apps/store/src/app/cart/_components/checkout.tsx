"use client";
import { ADDRESSES_PAGE } from "@/lib/routes";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { useToast } from "@shared/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CheckoutBtn(props: { cartValue: number }) {
	const { cartValue } = props;
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			onClick={() => {
				startTransition(() => {
					if (cartValue > 0) {
						router.push(ADDRESSES_PAGE);
					} else {
						toast({
							variant: "default",
							title: "Your cart is empty",
							description: "Please add some items to your cart to checkout.",
							duration: 4000,
						});
					}
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
