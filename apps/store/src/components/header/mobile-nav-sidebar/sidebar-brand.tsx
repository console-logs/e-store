import { WEBSITE_NAME } from "@/lib/constants";
import { HOME_PAGE } from "@/lib/page-routes";
import { Icons } from "@packages/shared/components/Icons";
import Link from "next/link";

export function SidebarBrand() {
	return (
		<Link href={HOME_PAGE}>
			<div className="flex h-16 shrink-0 items-center space-x-2 border-b border-gray-300">
				<Icons.triangle className="h-8 w-auto" />
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{WEBSITE_NAME}</h4>
			</div>
		</Link>
	);
}
