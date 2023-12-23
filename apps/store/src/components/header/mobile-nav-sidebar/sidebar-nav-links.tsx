import {
	COMING_SOON_PAGE,
	FLEX_PCB_FAB_PAGE,
	HOME_PAGE,
	PCB_ASSEMBLY_PAGE,
	PCB_TECH_CAPABILITIES_PAGE,
	RIGID_PCB_FAB_PAGE,
	ROADMAP_PAGE,
} from "@/lib/routes";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";

const navOptions = [
	{ name: "Components", href: HOME_PAGE, icon: Icons.BsCpu },
	{
		name: "Rigid PCB",
		href: RIGID_PCB_FAB_PAGE,
		icon: Icons.TfiLayers,
	},
	{
		name: "Flex PCB",
		href: FLEX_PCB_FAB_PAGE,
		icon: Icons.CgDisplayFlex,
	},
	{
		name: "PCB Assembly",
		href: PCB_ASSEMBLY_PAGE,
		icon: Icons.GiFlexibleLamp,
	},
	{
		name: "Inventory Management",
		href: COMING_SOON_PAGE,
		icon: Icons.MdInventory,
	},
	{
		name: "Technical Capabilities",
		href: PCB_TECH_CAPABILITIES_PAGE,
		icon: Icons.BsRocket,
	},
	{
		name: "Roadmap",
		href: ROADMAP_PAGE,
		icon: Icons.RiRoadMapLine,
	},
];

export function SidebarNavLinks() {
	return (
		<nav className="flex flex-1 flex-col">
			<ul
				role="list"
				className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul
						role="list"
						className="-mx-2 space-y-1">
						{navOptions.map((option, optionIdx) => (
							<li key={optionIdx}>
								<Button
									asChild
									variant="link"
									className="flex justify-start gap-x-3 hover:bg-slate-950 hover:text-white hover:no-underline dark:hover:bg-white dark:hover:text-slate-950">
									<Link href={option.href}>
										<option.icon
											className="h-6 w-6 shrink-0"
											aria-hidden="true"
										/>
										{option.name}
									</Link>
								</Button>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</nav>
	);
}
