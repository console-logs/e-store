import { SidebarBrand } from "@/components/header/mobile-nav-sidebar/sidebar-brand";
import { SidebarNavLinks } from "@/components/header/mobile-nav-sidebar/sidebar-nav-links";
import { SidebarTriggerButton } from "@/components/header/mobile-nav-sidebar/sidebar-trigger-button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@shared/components/ui/sheet";

export function MobileNavSidebar() {
	return (
		<Sheet>
			<SheetTrigger
				asChild
				className="xl:hidden">
				<SidebarTriggerButton />
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex w-64 grow flex-col gap-y-4 overflow-y-auto border-r px-6 dark:bg-black">
				<SheetHeader>
					<SheetTitle>
						<SidebarBrand />
					</SheetTitle>
				</SheetHeader>
				<SidebarNavLinks />
			</SheetContent>
		</Sheet>
	);
}
