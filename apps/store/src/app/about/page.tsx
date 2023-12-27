import { SalientFeatures_2 } from "@/components/about/salient-features-2";
import { ABOUT_PARA_1_INFORMATION, ABOUT_PARA_2_INFORMATION } from "@/content/about-info";

export default function About() {
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
			<div className="space-y-10 mt-10">
				<p>{ABOUT_PARA_1_INFORMATION}</p>
				<p>{ABOUT_PARA_2_INFORMATION}</p>
				<SalientFeatures_2 />
			</div>
		</div>
	);
}
