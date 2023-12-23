import { WEBSITE_NAME } from "@/lib/constants";
import { HOME_PAGE } from "@/lib/routes";
import { Icons } from "@packages/shared/components/Icons";
import Link from "next/link";

export function MainNavBrand() {
	return (
		<Link
			aria-label="Home"
			href={HOME_PAGE}
			className="hidden items-center space-x-2 lg:flex">
			<Icons.triangle className="h-6 w-auto" />
			<span className="hidden text-xl font-bold lg:inline-block">{WEBSITE_NAME}</span>
		</Link>
	);
}
