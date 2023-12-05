"use client";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useTransition } from "react";

export default function DeleteButton({
	deleteAction,
	deleteAllAction,
	itemToDelete,
	itemTypeToDelete,
}: {
	deleteAction?: (params: string) => Promise<void>;
	deleteAllAction?: (params: string) => Promise<void>;
	itemToDelete?: string;
	itemTypeToDelete?: string;
}) {
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					if (deleteAction && itemToDelete) {
						await deleteAction(itemToDelete);
					} else if (deleteAllAction && itemTypeToDelete) {
						await deleteAllAction(itemTypeToDelete);
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
