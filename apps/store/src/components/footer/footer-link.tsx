import { Button } from "@shared/components/ui/button";
import Link from "next/link";

export function FooterLink(props: { name: string; url: string }) {
	const { name, url } = props;
	return (
		<div className="pb-6">
			<Button
				asChild
				variant={"link"}>
				<Link
					href={url}
					className="link-primary">
					{name}
				</Link>
			</Button>
		</div>
	);
}
