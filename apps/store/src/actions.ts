"use server";
import { guestCartsCollection, mongoClient, usersCollection } from "@/lib/mongo";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";

export async function captureUserSignupAction({
	firstName,
	lastName,
	email,
	userId,
}: {
	firstName: string;
	lastName: string;
	email: string;
	userId: string;
}): Promise<void> {
	try {
		await mongoClient.connect();

		// Create a new user with the provided details
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
		};

		// Check if there's a guest cart and assign it to the user
		const cartId = cookies().get("cartId")?.value;
		if (cartId) {
			const guestCart = await guestCartsCollection.findOne<CartDataType>(
				{ cartId },
				{ projection: { _id: 0, cartId: 0 } }
			);

			if (!guestCart) {
				throw new Error("createUserAction: Guest cart is missing!");
			}

			user.cart = guestCart;

			// Clean up the guest cart
			await guestCartsCollection.deleteOne({ cartId });
			cookies().delete("cartId");
		}

		// Insert the new user into the database
		await usersCollection.insertOne(user);

		revalidatePath("/", "layout"); // full revalidate
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function transferGuestCartToUserAction(): Promise<void> {
	try {
		const { userId } = auth();
		const cartId = cookies().get("cartId")?.value;

		if (!cartId) return;

		await mongoClient.connect();

		// Fetch the guest cart without the _id and cartId fields
		const guestCart = await guestCartsCollection.findOne<CartDataType>(
			{ cartId },
			{ projection: { _id: 0, cartId: 0 } }
		);

		if (!guestCart) {
			throw new Error("transferGuestCartToUserAction: Guest cart is missing!");
		}

		// Transfer the guest cart to the user and delete the guest cart
		await Promise.all([
			usersCollection.updateOne({ userId }, { $set: { cart: guestCart } }),
			guestCartsCollection.deleteOne({ cartId }),
		]);

		// Delete the cartId cookie
		cookies().delete("cartId");

		revalidatePath("/cart");
	} catch (error) {
		throw error; // handle on the client side.
	}
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

export async function updatePartQtyAction(name: string, newQuantity: number): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			const existingItem = cart.cartItems.find(cartItem => cartItem.Name === name);
			if (existingItem) {
				existingItem.OrderedQty = newQuantity;
			}
			// update in db
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
