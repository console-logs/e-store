"use client";
import { deleteAllItemsAction } from "@/actions";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useTransition } from "react";

type DeleteCartItemButtonProps = {
	deleteCartItemAction: (item: string) => Promise<void>;
	item: string;
	filename?: string | null;
};

export function DeleteCartItemButton(props: DeleteCartItemButtonProps) {
	const { deleteCartItemAction, item, filename } = props;
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					await deleteCartItemAction(item);
					await fetch("/api/file", {
						method: "DELETE",
						body: JSON.stringify({ filename }),
					});
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

export async function DeleteAllButton({ type }: { type: string }) {
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
