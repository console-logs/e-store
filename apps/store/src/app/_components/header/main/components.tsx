import { HOME_PAGE } from "@/lib/routes";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@shared/components/ui/navigation-menu";
import Link from "next/link";

export default function Components() {
  return (
    <NavigationMenuItem>
      <Link href={HOME_PAGE} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Components
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
