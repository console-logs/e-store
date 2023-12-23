import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@shared/components/ui/button";

export function SidebarTriggerButton() {
	return (
		<Button
			variant="outline"
			size={"icon"}>
			<Icons.Bars3Icon className="h-4 w-4" />
		</Button>
	);
}
