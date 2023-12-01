import { PartInfo } from "@/app/products/part/detail/_components/info";
import PartOrderForm from "@/app/products/part/detail/_components/orderForm";
import { PartPrice } from "@/app/products/part/detail/_components/price";
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
			<PartInfo partData={partData} />
			<PartPrice partData={partData} />
			<PartOrderForm partData={partData} />
		</div>
	);
}
