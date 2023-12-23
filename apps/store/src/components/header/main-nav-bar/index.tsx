"use client";
import { MainNavBrand } from "@/components/header/main-nav-bar/main-nav-brand";
import { InventoryNavButton } from "@/components/header/main-nav-bar/inventory-nav-button";
import { PartNavButton } from "@/components/header/main-nav-bar/part-nav-button";
import { PcbNavButton } from "@/components/header/main-nav-bar/pcb-nav-button";
import { RoadMapNavButton } from "@/components/header/main-nav-bar/roadmap-nav-button";
import { NavigationMenu, NavigationMenuList } from "@shared/components/ui/navigation-menu";

export function MainNavBar() {
	return (
		<div className="hidden gap-6 xl:flex">
			<MainNavBrand />
			<NavigationMenu>
				<NavigationMenuList>
					<PartNavButton />
					<PcbNavButton />
					<InventoryNavButton />
					<RoadMapNavButton />
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
