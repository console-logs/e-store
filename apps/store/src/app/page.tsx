import { PcbInstantQuote } from "@/components/home/pcb-instant-quote";
import { SalientFeatures } from "@/components/home/salient-features";
import { SearchPartInput } from "@/components/home/search-part-input";
import { SubTitle } from "@/components/home/subtitle";
import { Title } from "@/components/home/title";
import { UploadBomLink } from "@/components/home/upload-bom-link";

export default async function Home() {
	return (
		<>
			<Title />
			<SubTitle />
			<SearchPartInput />
			<UploadBomLink />
			<PcbInstantQuote />
			<SalientFeatures />
		</>
	);
}
