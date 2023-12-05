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
	try {
		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");
		await mongoClient.connect();

		const collection = userId ? usersCollection : guestCartsCollection;
		const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
		const options = { projection: { _id: 0, cartId: 0, userId: 0 } };

		const result = await collection.findOne<CartDataType>(filter, options);
		return result;
	} catch (error) {
		throw error; // handle on the client side.
	}
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
		if (cart) {
			const existingItem = cart.cartItems.find(
				cartItem => cartItem.Type === item.Type && cartItem.Name === item.Name
			);
			if (existingItem) {
				existingItem.OrderedQty += item.OrderedQty;
			} else {
				cart.cartItems.push(item);
				cart.cartSize++;
			}
			// update in db
			const { userId } = auth();
			const cartIdCookie = cookies().get("cartId");
			userId
				? await usersCollection.updateOne({ userId }, { $set: { cart } })
				: await guestCartsCollection.updateOne({ cartId: cartIdCookie?.value }, { $set: cart });
		} else {
			// create new guest cart
			const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();
			await guestCartsCollection.insertOne({
				cartId: newCartId,
				cartSize: 1,
				cartItems: [item],
			});
			await createCartCookie(newCartId); // future reference
		}
		revalidatePath("/products", "layout");
	} catch (error) {
		console.error(error); // handle on the client side.
	}
}

export async function updatePartQtyAction(_partNumber: string, _newQuantity: number): Promise<void> {
	throw new Error("Action not implemented.");
}

export async function deleteCartItemAction(itemToDelete: string): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			// keep the item that is not a match
			const updatedCartItems = cart.cartItems.filter(cartItem => cartItem.Name !== itemToDelete);

			// Update cart with filtered items and adjust cartSize
			cart.cartItems = updatedCartItems;
			cart.cartSize = updatedCartItems.length;

			// update db
			const { userId } = auth();
			const cartIdCookie = cookies().get("cartId");
			userId
				? await usersCollection.updateOne({ userId }, { $set: { cart } })
				: await guestCartsCollection.updateOne({ cartId: cartIdCookie?.value }, { $set: cart });
		}
		revalidatePath("/cart");
	} catch (error) {
		console.error(error); // handle on the client side.
	}
}

export async function deleteAllItemsAction(property: string, value: string) {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			const cartItems = cart.cartItems;

			// keep the items that dont match the property value
			const updatedCartItems = cartItems.filter(
				cartItem => cartItem[property as keyof typeof cartItem] !== value
			);

			// Update cart with filtered items and adjust cartSize
			cart.cartItems = updatedCartItems;
			cart.cartSize = updatedCartItems.length;

			// update db
			const { userId } = auth();
			const cartIdCookie = cookies().get("cartId");
			userId
				? await usersCollection.updateOne({ userId }, { $set: { cart } })
				: await guestCartsCollection.updateOne({ cartId: cartIdCookie?.value }, { $set: cart });
		}
		revalidatePath("/cart");
	} catch (error) {
		console.error(error); // handle on the client side.
	}
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
