import { Icons } from "@packages/shared/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";

export function HelpPopover(props: { children: React.ReactNode }) {
	return (
		<Popover>
			<PopoverTrigger className="text-gray-400">
				<Icons.GiHelp />
			</PopoverTrigger>
			<PopoverContent className="text-sm">{props.children}</PopoverContent>
		</Popover>
	);
}
