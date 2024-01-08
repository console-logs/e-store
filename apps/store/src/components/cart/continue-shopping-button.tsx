import { HOME_PAGE } from "@/lib/page-routes";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";

export function ContinueShoppingButton() {
	return (
		<div className="text-center text-sm">
			<p>
				or
				<Button
					asChild
					variant={"link"}>
					<Link
						href={HOME_PAGE}
						className="font-medium">
						Continue Shopping
						<span aria-hidden="true">&rarr;</span>
					</Link>
				</Button>
			</p>
		</div>
	);
}
