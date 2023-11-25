"use client";
import Brand from "@/app/_components/header/main/brand";
import Components from "@/app/_components/header/main/components";
import Inventory from "@/app/_components/header/main/inventory";
import Pcb from "@/app/_components/header/main/pcb";
import RoadMap from "@/app/_components/header/main/roadmap";
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
