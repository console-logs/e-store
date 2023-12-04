import CheckoutBtn from "@/app/cart/_components/checkout";
import ContinueShoppingBtn from "@/app/cart/_components/continue";
import BasketPartsTable from "@/app/cart/_components/partsTable";
import type { Metadata } from "next";
import BasketPcbsTable from "./_components/pcbsTable";

export const metadata: Metadata = {
	title: "Shopping Cart",
};

export default function ShoppingCart() {
	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
			<div className="mt-8 grid grid-cols-1 gap-y-3 xl:grid-cols-3 xl:gap-x-10">
				<div className="space-y-10 sm:col-span-2">
					<BasketPartsTable />
					<BasketPcbsTable />
				</div>

				<div className="space-y-4">
					{/* <CartSummary />
					<NaComponentsAlert />
					 */}
					<CheckoutBtn />
					<ContinueShoppingBtn />
				</div>
			</div>
		</div>
	);
}
