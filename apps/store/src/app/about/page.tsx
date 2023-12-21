import Features from "@/app/about/_components/features";
import { ABOUT_PARA_1, ABOUT_PARA_2 } from "@/content/about";

export default function MdxLayout() {
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
			<div className="space-y-10 mt-10">
				<p>{ABOUT_PARA_1}</p>
				<p>{ABOUT_PARA_2}</p>
				<Features />
			</div>
		</div>
	);
}
