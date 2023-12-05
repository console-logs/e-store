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

		await mongoClient.connect();

		// Check if there's a guest cart and assign it to the user
		const cartId = cookies().get("cartId")?.value;
		if (cartId) {
			const guestCart = await guestCartsCollection.findOne<CartDataType>(
				{ cartId },
				{ projection: { _id: 0, cart: 1 } }
			);

			if (!guestCart) throw new Error("createUserAction: Guest cart is missing!");
			
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
		await mongoClient.connect();
		const options = { projection: { _id: 0, cart: 1 } };
		const cartIdCookie = cookies().get("cartId");
		const guestCartFilter = { cartId: cartIdCookie?.value };
		const guestResults = await guestCartsCollection.findOne<{ cart: CartDataType }>(guestCartFilter, options);
		if (!guestResults) return; // no guest cart to transfer

		// transfer guest cart to user
		const { userId } = auth();
		const userCartFilter = { userId };

		const userResults = await usersCollection.findOne<{ cart: CartDataType }>(userCartFilter, options);
		if (!userResults) throw new Error("transferGuestCartToUserAction: User cart is missing!");

		const userCart = userResults.cart;
		const guestCart = guestResults.cart;

		// merge carts
		guestCart.cartItems.forEach(guestCartItem => {
			const existingItem = userCart.cartItems.find(
				userCartItem => userCartItem.Type === guestCartItem.Type && userCartItem.Name === guestCartItem.Name
			);
			if (existingItem) {
				existingItem.OrderedQty = guestCartItem.OrderedQty; // update qty
			} else {
				userCart.cartItems.push(guestCartItem);
				userCart.cartSize++;
			}
		});

		// update in db
		await usersCollection.updateOne(userCartFilter, { $set: { cart: userCart } });
		await guestCartsCollection.deleteOne(guestCartFilter); // cleanup!
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
		const options = { projection: { _id: 0, cart: 1 } };
		const result = await collection.findOne<{ cart: CartDataType }>(filter, options);
		return result ? result.cart : null;
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
			const collection = userId ? usersCollection : guestCartsCollection;
			const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
			await collection.updateOne(filter, { $set: { cart } });
		} else {
			// create new guest cart
			const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();
			await guestCartsCollection.insertOne({
				cartId: newCartId,
				cart: {
					cartSize: 1,
					cartItems: [item],
				},
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
			const collection = userId ? usersCollection : guestCartsCollection;
			const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
			await collection.updateOne(filter, { $set: { cart } });
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
			const collection = userId ? usersCollection : guestCartsCollection;
			const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
			await collection.updateOne(filter, { $set: { cart } });
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
			const collection = userId ? usersCollection : guestCartsCollection;
			const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
			await collection.updateOne(filter, { $set: { cart } });
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
