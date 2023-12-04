"use server";
import { guestCartsCollection, mongoClient, usersCollection } from "@/lib/mongo";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";

export async function captureUserSignupAction(props: {
	firstName: string;
	lastName: string;
	email: string;
	userId: string;
}): Promise<void> {
	const { firstName, lastName, email, userId } = props;
	const user: UserType = {
		createdAt: new Date(),
		userId,
		email,
		firstName,
		lastName,
		billingAddresses: [],
		shippingAddresses: [],
		cart: {
			cartSize: 0,
			cartItems: [],
		},
		// orders: [],
	};

	try {
		const cartIdCookie = cookies().get("cartId");
		await mongoClient.connect();
		if (cartIdCookie) {
			const cartId = cartIdCookie.value;
			const cartFilter = { cartId };
			const guestCart = await guestCartsCollection.findOne<CartDataType>(cartFilter, {
				projection: { _id: 0, cartId: 0 },
			});
			if (!guestCart) {
				throw new Error("createUserAction: Guest cart is missing!");
			}
			user.cart = guestCart; // assign guest cart to user's cart

			//clean up!
			await guestCartsCollection.deleteOne(cartFilter);
			cookies().delete("cartId");
		}
		await usersCollection.insertOne(user);
		revalidatePath("/", "layout"); // full revalidate
	} catch (error) {
		throw error; // handle on the client side.
	}
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
			// access user cart
			const userFilter = { userId };
			const options = { projection: { _id: 0, cart: 1 } }; // only Cart
			const result = await usersCollection.findOne<{ cart: CartDataType }>(userFilter, options);
			if (result) {
				cart = result.cart;
			}
		} else if (cartIdCookie) {
			// access guest cart
			const cartId = cartIdCookie.value;
			const cartFilter = { cartId };
			const options = { projection: { _id: 0, cartId: 0 } }; // only Cart
			const guestCart = await guestCartsCollection.findOne<CartDataType>(cartFilter, options);
			cart = guestCart;
		}
	} catch (error) {
		throw error; // handle on the client side.
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
		throw error; // handle on the client side.
	}
	return cartSize;
}

export async function addItemToCartAction(
	item: PartDataType | FlexPcbFabSpecsType | RigidPcbFabSpecsType | PcbAssemblyFabSpecsType
): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		const { userId } = auth();
		if (cart) {
			const cartItems = cart.cartItems;
			const existingItem = cartItems.find(cartItem => cartItem.Type === item.Type && cartItem.Name === item.Name);
			if (existingItem) {
				// increase the qty
				existingItem.OrderedQty += item.OrderedQty;
			} else {
				// add the item & increase cartSize
				cartItems.push(item);
				cart.cartSize++;
			}
			userId
				? await usersCollection.updateOne({ userId }, { $set: { cart } })
				: await guestCartsCollection.updateOne({ cartId: cart.cartId }, { $set: { cart } });
		} else {
			// create new guest cart
			const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();
			const newCart: CartDataType = {
				cartId: newCartId,
				cartSize: 1,
				cartItems: [item],
			};
			await guestCartsCollection.insertOne(newCart);
			await createCartCookie(newCartId); // future reference
		}
		revalidatePath("/products", "layout");
	} catch (error) {
		console.error(error);
	}
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

export async function createCartCookie(cartId: string) {
	cookies().set({
		name: "cartId",
		value: cartId,
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // one month
		sameSite: true,
		// domain: env.HOST,
	});
}
