import { formatToInr } from "@packages/shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";

export function OrderHistoryOverview(props: { ordernumber: string; date: Date; amount: number }) {
	const { ordernumber, date, amount } = props;
	return (
		<div className="my-4 border border-gray-200 dark:border-gray-700 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
			<dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-muted-foreground md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
				<div className="flex justify-between md:block">
					<dt className="font-medium text-gray-900 dark:text-white">Order number</dt>
					<dd className="md:mt-1">{ordernumber}</dd>
				</div>
				<div className="flex justify-between pt-4 md:block md:pt-0">
					<dt className="font-medium text-gray-900 dark:text-white">Date placed</dt>
					<dd className="md:mt-1">{date.toLocaleString()}</dd>
				</div>
				<div className="flex justify-between pt-4 font-medium md:block md:pt-0 text-gray-900 dark:text-white">
					<dt>Total amount</dt>
					<dd className="md:mt-1">{formatToInr(amount)}</dd>
				</div>
			</dl>
			<div className="mt-6 space-y-4 sm:flex space-x-4 sm:space-y-0 md:mt-0">
				<Button
					variant={"outline"}
					asChild>
					<Link href={`/order-history/view-order/${ordernumber}`}>View Order</Link>
				</Button>
				<Button
					disabled
					variant={"outline"}>
					Download Invoice
				</Button>
			</div>
		</div>
	);
}
