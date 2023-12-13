"use client";
import { deleteAllItemsAction, deleteCartItemAction } from "@/actions";
import { deleteDesignFileFromS3 } from "@/lib/helpers";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useTransition } from "react";

export function DeleteCartItemButton({ itemName, type }: { itemName: string; type: "PCB" | "Part" }) {
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					await deleteCartItemAction(itemName);
					if (type === "PCB") {
						// delete its accompanied design file from s3
						await deleteDesignFileFromS3(itemName);
					}
				})
			}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center text-muted-foreground"
					aria-hidden="true"
				/>
			) : (
				<Icons.XMarkIcon
					className="h-5 w-5 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}

export function DeleteAllButton({ type }: { type: "PCB" | "Part" }) {
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					if (type === "PCB") {
						await deleteAllItemsAction("Type", "PCB");
						// delete all design files from s3
					} else if (type === "Part") {
						await deleteAllItemsAction("Type", "Part");
					}
				})
			}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center text-muted-foreground"
					aria-hidden="true"
				/>
			) : (
				<Icons.XMarkIcon
					className="h-5 w-5 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}
