"use server";

export async function fetchCartSizeAction(): Promise<number> {
	const cartSize = 0;
	return cartSize;
}

export async function transferGuestCartToUserAction(): Promise<void> {
	throw new Error("Action not implemented");
}
