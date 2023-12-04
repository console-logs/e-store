"use server";
"use server";
import { mongoClient, usersCollection, guestCartsCollection } from "@/lib/mongo";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";

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

export async function fetchCartItemsAction(): Promise<CartDataType | null> {
	let cart: CartDataType | null = null;
	try {
		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");
		await mongoClient.connect();
		if (userId) {
			const userFilter = { userId };
			const options = { projection: { _id: 0, cart: 1 } }; // only Cart
			const result = await usersCollection.findOne<{ cart: CartDataType }>(userFilter, options);
			if (result) {
				cart = result.cart; // Access the shoppingCart property of the result
			}
		} else if (cartIdCookie) {
			const cartId = cartIdCookie.value;
			const cartFilter = { cartId };
			const options = { projection: { _id: 0, cartId: 0 } }; // exclude cartId
			const guestCart = await guestCartsCollection.findOne<CartDataType>(cartFilter, options);
			cart = guestCart;
		}
	} catch (error) {
		console.error(error);
	}
	return cart;
}

export async function fetchCartSizeAction(): Promise<number> {
	let cartSize = 0;
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		cartSize = cart ? cart.cartSize : 0;
	} catch (error) {
		console.error(error);
	}
	return cartSize;
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
