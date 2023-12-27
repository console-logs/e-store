import { PRIVACY_POLICY_INFORMATION } from "@/content/privacy-policy-info";
import { getCurrentYear } from "@packages/shared/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy",
};

export default function PrivacyPolicy() {
	const currYear = getCurrentYear();
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
			<div className="space-y-2 mt-10">
				<p className="text-muted-foreground">Learn about how we collect, use and protect your personal data</p>
				<p className="text-muted-foreground">This policy was last modified on {currYear}</p>
			</div>
			<div className="space-y-8 mt-10 text-justify">
				{PRIVACY_POLICY_INFORMATION.map((condition, index) => (
					<div key={index}>
						<p className="font-semibold">{condition.HEADING}</p>
						<p>{condition.BODY}</p>
					</div>
				))}
			</div>
		</div>
	);
}
