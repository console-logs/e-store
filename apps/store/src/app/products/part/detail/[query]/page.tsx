import { PartInformationSection } from "@/components/products/part/part-information";
import { PartOrderForm } from "@/components/products/part/part-order-form";
import { PartPricingTable } from "@/components/products/part/part-pricing-table";
import { tRPCServerApi } from "@/trpc/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { query: string } }): Promise<Metadata> {
	return {
		title: params.query,
	};
}

export default async function PartDetail({ params: { query } }: { params: { query: string } }) {
	const response = await tRPCServerApi.part.getParts.query({ mpn: query });
	const parts = response.Parts;

	if (Object.keys(parts).length === 0) {
		return notFound();
	}

	const partData = parts[query]!;

	return (
		<div className="px-4 py-0 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
			<PartInformationSection partData={partData} />
			<PartPricingTable partData={partData} />
			<PartOrderForm partData={partData} />
		</div>
	);
}
