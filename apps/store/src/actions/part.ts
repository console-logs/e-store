"use server";

export async function addPartToCartAction(_part: PartDataType): Promise<void> {
	throw new Error("Action not implemented.");
}

export async function deletePartAction(_partNumber: string) {
	throw new Error("Action not implemented.");
}

export async function deleteAllPartsAction() {
	throw new Error("Action not implemented.");
}

export async function updatePartQtyAction(_partNumber: string, _newQuantity: number): Promise<void> {
	throw new Error("Action not implemented.");
}
