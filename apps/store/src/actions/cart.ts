"use server";

export async function fetchCartSizeAction(): Promise<number> {
	const cartSize = 0;
	return cartSize;
}

export async function fetchCartItemsAction(): Promise<CartType | null> {
	throw new Error("Action not implemented");
}

export async function transferGuestCartToUserAction(): Promise<void> {
	throw new Error("Action not implemented");
}

export async function captureUserSignupAction(_props: {
	firstName: string;
	lastName: string;
	email: string;
	userId: string;
}): Promise<void> {
	throw new Error("Action not implemented");
}
