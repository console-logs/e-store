"use client";
import { addItemToCartAction } from "@/actions";
import { SHOPPING_CART_PAGE } from "@/lib/routes";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { Input } from "@packages/shared/components/ui/input";
import { useToast } from "@shared/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function UploadBomPage() {
	const [bomFile, setBomFile] = useState<File | undefined>();
	const [isLoading, startTransition] = useTransition();
	const { toast } = useToast();
	const router = useRouter();

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setBomFile(e.target.files[0]);
		}
	}

	function handleFileUpload() {
		startTransition(async () => {
			if (!bomFile) {
				toast({
					variant: "destructive",
					title: "Please upload your BoM",
					description: "Please upload your BoM file to continue",
					duration: 4000,
				});
				return;
			}
			try {
				const formData = new FormData();
				formData.set("file", bomFile);
				const response = await fetch("/api/bom-parser", {
					method: "POST",
					body: formData,
				});
				if (!response.ok) throw new Error(await response.text());
				const results = (await response.json()) as SortedResultsType;

				console.log({results});
				
				// add to cart
				results.availableParts.map(async part => {
					await addItemToCartAction(part);
				});
				
				router.push(SHOPPING_CART_PAGE);
			} catch (error) {
				throw error;
			}
		});
	}

	return (
		<div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0 sm:mb-80">
			<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upload your Bill of Materials</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Upload your Bill of Materials (BOM) to quickly add components to your cart.
			</p>
			<p className="mt-4 mb-2 text-lg font-semibold">Things to keep in mind:</p>
			<ul className="list-disc ml-6 space-y-1">
				<li>At the moment we only support CSV file that is under 2MB.</li>
				<li>For better results use our preset template.</li>
				<li>
					Need a template? 👉{" "}
					<span>
						<a
							className="underline"
							href={"#"}
							download={"#"}>
							Download E-Store BOM Template
						</a>
					</span>
				</li>
				<li>Parts that are already in cart will be overwritten after this operation.</li>
				<li>You can add new parts after this operation is complete.</li>
			</ul>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="file"
					id="file"
					name="file"
					className="my-4 w-full md:w-96 "
					placeholder="Upload your BOM file"
					onChange={e => handleFileChange(e)}
				/>
				<Button
					disabled={isLoading}
					onClick={handleFileUpload}>
					{isLoading ? (
						<Icons.spinner
							className="animate-spin text-center"
							aria-hidden="true"
						/>
					) : (
						"Upload"
					)}
				</Button>
			</div>
		</div>
	);
}
