import { fetchOrders } from "@/actions";
import { AddressDisplayCard } from "@/components/checkout/address/address-display-card";
import OrderedPartsTable from "@/app/order-history/_components/partsTable";
import OrderedPcbsTable from "@/app/order-history/_components/pcbsTable";
import PriceSummary from "@/app/order-history/_components/priceSum";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Order History",
};

type ViewOrderPageParamsType = {
	params: {
		orderNum: string;
	};
};

export default async function ViewOrder({ params: { orderNum } }: ViewOrderPageParamsType) {
	const orders = await fetchOrders().catch((error: unknown) => {
		const unknownError = "Something went wrong, please try again later.";
		const errorMessage = error instanceof Error ? error.message : unknownError;
		throw new Error(errorMessage); // activates closest error.tsx file
	});
	const order = orders.find(order => order.id === orderNum);
	if (!order)
		return (
			<div className="mt-5">
				<p>Looks like we could&apos;t find your order.</p>
			</div>
		);

	const { billingAddress, shippingAddress } = order;
	const orderValue = order.cartTotal;

	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<h1 className="text-2xl font-bold tracking-tight">Order Number : {orderNum}</h1>
			<div className="mt-8 grid grid-cols-1 gap-y-3 xl:grid-cols-3 xl:gap-x-10">
				<div className="space-y-10 sm:col-span-2">
					<OrderedPartsTable order={order} />
					<OrderedPcbsTable order={order} />
				</div>
				<div>
					<PriceSummary orderValue={orderValue} />
					<div className="rounded-lg bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:p-6 lg:p-8 space-y-8">
						<AddressDisplayCard address={billingAddress} />
						<AddressDisplayCard address={shippingAddress} />
					</div>
				</div>
			</div>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-10"></div>
		</div>
	);
}
