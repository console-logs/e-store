"use server";

export async function captureUserSignupAction(_props: {
	firstName: string;
	lastName: string;
	email: string;
	userId: string;
}): Promise<void> {
	throw new Error("Action not implemented");
}

export async function transferGuestCartToUserAction(): Promise<void> {
	throw new Error("Action not implemented");
}

export async function fetchCartSizeAction(): Promise<number> {
	const cartSize = 0;
	return cartSize;
}

export async function fetchCartItemsAction(): Promise<CartType | null> {
	throw new Error("Action not implemented");
}

export async function addItemToCartAction(
	_item: PartDataType | FlexPcbFabSpecsType | RigidPcbFabSpecsType | PcbAssemblyFabSpecsType
): Promise<void> {
	throw new Error("Action not implemented");
}

export async function updatePartQtyAction(_partNumber: string, _newQuantity: number): Promise<void> {
	throw new Error("Action not implemented.");
}

export async function deleteCartItemAction(_itemName: string): Promise<void> {
	throw new Error("Action not implemented");
}

export async function deleteAllPartsAction() {
	throw new Error("Action not implemented.");
}

export async function deleteAllPcbsAction() {
	throw new Error("Action not implemented.");
}
