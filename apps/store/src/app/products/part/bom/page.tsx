import Loading from "@/app/loading";
import { Button } from "@packages/shared/components/ui/button";
import { Input } from "@packages/shared/components/ui/input";
import type { Metadata } from "next";
import { useState } from "react";
import { useToast } from "@shared/components/ui/use-toast";

export const metadata: Metadata = {
	title: "Upload BOM",
};

export default function UploadBomPage() {
	const [bomFile, setBomFile] = useState<File | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setBomFile(e.target.files[0]);
		}
	}

	async function handleFileUpload() {
		setIsLoading(true);
		if (!bomFile) {
			setIsLoading(false);
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
			const data = (await response.json()) as unknown;
			console.log({ data });
		} catch (error) {
			throw error;
		}
	}

	if (isLoading) {
		return <Loading />;
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
					disabled={!bomFile}
					onClick={handleFileUpload}>
					Upload
				</Button>
			</div>
		</div>
	);
}
