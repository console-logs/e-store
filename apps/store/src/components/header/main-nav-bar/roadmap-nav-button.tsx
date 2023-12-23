import { ROADMAP_PAGE } from "@/lib/routes";
import {
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@shared/components/ui/navigation-menu";
import Link from "next/link";

export function RoadMapNavButton() {
	return (
		<NavigationMenuItem>
			<Link
				href={ROADMAP_PAGE}
				legacyBehavior
				passHref>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>Roadmap</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}
