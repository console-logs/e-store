import { COMING_SOON_PAGE } from "@/lib/routes";
import {
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@shared/components/ui/navigation-menu";
import Link from "next/link";

export function InventoryNavButton() {
	return (
		<NavigationMenuItem>
			<Link
				href={COMING_SOON_PAGE}
				legacyBehavior
				passHref>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>Inventory Management</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}
