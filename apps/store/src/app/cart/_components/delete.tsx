"use client";
import { Icons } from "@packages/shared/components/Icons";
import { Button } from "@packages/shared/components/ui/button";
import { useTransition } from "react";

type DeleteCartItemButtonProps = {
	deleteCartItemAction: (item: string) => Promise<void>;
	item: string;
};

type DeleteAllButtonProps = {
	deleteAllAction: (property: string, value: string) => Promise<void>;
	property: string;
	value: string;
};

export function DeleteCartItemButton(props: DeleteCartItemButtonProps) {
	const { deleteCartItemAction, item } = props;
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					await deleteCartItemAction(item);
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

export function DeleteAllButton(props: DeleteAllButtonProps) {
	const { deleteAllAction, property, value } = props;
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={() =>
				startTransition(async () => {
					await deleteAllAction(property, value);
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
