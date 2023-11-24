import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
// import { fetchCartSizeAction } from "@store/src/actions/cartActions";
import { SHOPPING_CART_PAGE } from "@/lib/routes";
import Link from "next/link";

export default async function Cart() {
  const cartItems = 0;
  // let cartItems = await fetchCartSizeAction();
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link href={SHOPPING_CART_PAGE}>
        <div className="flex">
          <Icons.cart />
          {cartItems}
        </div>
      </Link>
    </Button>
  );
}
