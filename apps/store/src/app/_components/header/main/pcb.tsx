import {
  FLEX_PCB_FAB_PAGE,
  PCB_ASSEMBLY_PAGE,
  PCB_TECH_CAPABILITIES_PAGE,
  RIGID_PCB_FAB_PAGE,
} from "@/lib/routes";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@shared/components/ui/navigation-menu";
import Link from "next/link";

export default function Pcb() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Printed Circuit Boards</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <ListItem href={RIGID_PCB_FAB_PAGE} title={"Rigid PCB"}>
            Prototype, small and medium volume production of custom Rigid PCB
            board.
          </ListItem>
          <ListItem href={FLEX_PCB_FAB_PAGE} title={"Flex PCB"}>
            Prototype, small and medium volume production of custom Flex PCB
            board.
          </ListItem>
          <ListItem href={PCB_ASSEMBLY_PAGE} title={"PCB Assembly"}>
            Prototype, small and medium volume Assembly of PCB.
          </ListItem>
          <ListItem
            href={PCB_TECH_CAPABILITIES_PAGE}
            title={"Technical Capabilities"}
          >
            Know our pcb fabrication and assembly services Technical
            Capabilities.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

type ListItemsProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

function ListItem(props: ListItemsProps) {
  return (
    <li>
      <Link href={props.href} legacyBehavior passHref>
        <NavigationMenuLink asChild>
          <div className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors">
            <div className="text-sm font-medium leading-none">
              {props.title}
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {props.children}
            </p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
}
