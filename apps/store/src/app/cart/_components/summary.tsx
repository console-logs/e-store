import { OVERHEAD_SHIPPING_CHARGES } from "@/lib/constants";
import { calculateGst } from "@/lib/utils";
import { formatToInr } from "@packages/shared/lib/utils";
import { Badge } from "@shared/components/ui/badge";

export default async function CartSummary(props: { cartValue: number }) {
	const { cartValue } = props;
	const cartValueInRupees = cartValue / 100;
	const tax = calculateGst(cartValueInRupees);

	return (
		<div className="rounded-lg bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Order Summary</h2>
			<div className="flow-root">
				<dl className="-my-4 divide-y divide-gray-300 dark:divide-gray-700 text-sm">
					<div className="flex items-center justify-between py-4">
						<dt>Subtotal</dt>
						<dd className="font-medium">{formatToInr(cartValueInRupees)}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt>Shipping</dt>
						<dd className="font-medium">
							<Badge hidden={OVERHEAD_SHIPPING_CHARGES !== 0}>Free</Badge>
							<span className="ml-3">{formatToInr(OVERHEAD_SHIPPING_CHARGES)}</span>
						</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt className="">Tax</dt>
						<dd className="font-medium">{formatToInr(tax)}</dd>
					</div>
					<div className="flex items-center justify-between py-4">
						<dt className="text-base font-medium">Order total</dt>
						<dd className="text-base font-medium">
							{formatToInr(cartValueInRupees + tax + OVERHEAD_SHIPPING_CHARGES)}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
