import { HOME_PAGE } from "@/lib/page-routes";
import {
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@shared/components/ui/navigation-menu";
import Link from "next/link";

export function PartNavButton() {
	return (
		<NavigationMenuItem>
			<Link
				href={HOME_PAGE}
				legacyBehavior
				passHref>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>Parts</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}
