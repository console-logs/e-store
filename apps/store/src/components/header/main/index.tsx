"use client";
import Brand from "@/components/header/main/brand";
import Components from "@/components/header/main/components";
import Inventory from "@/components/header/main/inventory";
import Pcb from "@/components/header/main/pcb";
import RoadMap from "@/components/header/main/roadmap";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@shared/components/ui/navigation-menu";

export default function Main() {
  return (
    <div className="hidden gap-6 xl:flex">
      <Brand />
      <NavigationMenu>
        <NavigationMenuList>
          <Components />
          <Pcb />
          <Inventory />
          <RoadMap />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
