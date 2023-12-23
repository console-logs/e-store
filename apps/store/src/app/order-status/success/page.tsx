import { HOME_PAGE } from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Success",
};

export default function OrderSuccess() {
	return (
		<div>
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Your order was placed successfully! 🎉
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
						Thanks for placing an order with us. Our backend team will check your order and will notify you
						via email. You can also check your order status in your order history as well.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button
							variant={"link"}
							asChild>
							<Link href={HOME_PAGE}>Return to home →</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
