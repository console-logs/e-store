import { fetchOrders } from "@/actions";
import OverviewCard from "@/app/order-history/_components/overview";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Order History",
};
export default async function PastOrders() {
	const orders = await fetchOrders().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});

	return (
		<div className="mx-auto max-w-6xl sm:px-6 sm:mb-80">
			<div className="px-4 sm:px-0">
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Order history</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Check the status of recent orders, manage returns, and download invoices.
				</p>
			</div>
			{orders.length !== 0 ? (
				orders.map((order, orderIdx) => {
					const { id, createdAt, cartTotal } = order;
					const cartTotalInRupees = cartTotal / 100;
					return (
						<OverviewCard
							key={orderIdx}
							ordernumber={id}
							date={createdAt}
							amount={cartTotalInRupees}
						/>
					);
				})
			) : (
				<div className="mt-5">
					<p>
						Looks like you have&apos;t ordered anything with us! Go ahead and order something to show them
						up here!
					</p>
				</div>
			)}
		</div>
	);
}
