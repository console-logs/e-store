"use client";
import { Button } from "@shared/components/ui/button";
import Image from "next/image";
import errorImage from "public/images/error.gif";

export default function Error({ reset, error }: { error: Error; reset: () => void }) {
	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-10 flex flex-col items-center">
			<Image
				className="w-96"
				src={errorImage}
				alt="Wrong input. Please check input"
			/>
			<p className="text-lg text-center">Oops! {error.message}</p>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
