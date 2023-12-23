import { fetchCartSizeAction } from "@/actions";
import { SHOPPING_CART_PAGE } from "@/lib/routes";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";

export async function CartButton() {
	const cartItems = await fetchCartSizeAction();
	return (
		<Button
			variant={"ghost"}
			size={"icon"}
			asChild>
			<Link href={SHOPPING_CART_PAGE}>
				<div className="flex">
					<Icons.cart />
					{cartItems}
				</div>
			</Link>
		</Button>
	);
}
