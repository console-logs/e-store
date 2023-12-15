"use server";
import {
	createNewCartInDB,
	createNewOpenOrder,
	createNewOrder,
	fetchGuestCart,
	fetchUserCart,
	filterCartItems,
	filterCartItemsByProperty,
	mergeCarts,
	resetCart,
	transferDesignFilesInS3,
	updateCartInDB,
	updateExistingCart,
	updateGuestCart,
} from "@/lib/helpers";
import { guestCartsCollection, mongoClient, usersCollection } from "@/lib/mongo";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function captureUserSignupAction(props: SignupPropsType): Promise<void> {
	const { email, firstName, lastName, userId } = props;
	try {
		await mongoClient.connect();
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
			s3FileDir: null,
			orders: [],
		};
		const guestCart = await fetchGuestCart();
		const cartId = cookies().get("cartId")?.value;
		if (guestCart && cartId) {
			user.cart = guestCart;
			user.s3FileDir = cartId;

			// cleanup!
			await guestCartsCollection.deleteOne({ cartId });
			cookies().delete("cartId");
		}
		await usersCollection.insertOne(user);
		revalidatePath("/", "layout"); // full revalidate
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function transferGuestCartToUserAction(): Promise<void> {
	try {
		await mongoClient.connect();
		const guestCart = await fetchGuestCart();
		const userCart = await fetchUserCart();

		if (userCart && guestCart) {
			const mergedCart = await mergeCarts(userCart, guestCart);
			await transferDesignFilesInS3();

			const { userId } = auth();
			const userFilter = { userId };
			await usersCollection.updateOne(userFilter, { $set: { cart: mergedCart } });

			// cleanup!
			const cartIdCookie = cookies().get("cartId");
			const cartId = cartIdCookie?.value;
			const guestCartFilter = { cartId };
			await guestCartsCollection.deleteOne(guestCartFilter);
			cookies().delete("cartId");
		}
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function fetchCartItemsAction(): Promise<CartDataType | null> {
	try {
		const { userId } = auth();
		if (userId) {
			const userCart = await fetchUserCart();
			return userCart ? userCart : null;
		} else {
			const guestCart = await fetchGuestCart();
			return guestCart ? guestCart : null;
		}
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

export async function addItemToCartAction(item: CartUpdatePropsType): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (cart) {
			await updateExistingCart({ cart, item });
			await updateCartInDB(cart);
		} else {
			const guestCart = await updateGuestCart(item);
			await createNewCartInDB(guestCart);
		}
		revalidatePath("/products", "layout");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function addMultiplePartsToCartAction(parts: Array<PartDataType>): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (cart) {
			for (const part of parts) {
				await updateExistingCart({ cart, item: part });
			}
			await updateCartInDB(cart);
		} else {
			const guestCart = {
				cartSize: parts.length,
				cartItems: parts,
			};
			await createNewCartInDB(guestCart);
		}
		revalidatePath("/cart");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function updatePartQtyAction(props: UpdatePartQtyPropsType): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			const existingItem = cart.cartItems.find(cartItem => cartItem.Name === props.name);
			if (existingItem) {
				existingItem.OrderedQty = props.newQty;
			}
			await updateCartInDB(cart);
		}
		revalidatePath("/cart");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function deleteCartItemAction(name: string): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			const updatedCartItems = await filterCartItems(cart, name);
			cart.cartItems = updatedCartItems;
			cart.cartSize = updatedCartItems.length;
			await updateCartInDB(cart);
		}
		revalidatePath("/cart");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function deleteAllItemsAction(property: string, value: string) {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			const updatedCartItems = await filterCartItemsByProperty(cart, property, value);
			cart.cartItems = updatedCartItems;
			cart.cartSize = updatedCartItems.length;
			await updateCartInDB(cart);
		}
		revalidatePath("/cart");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function addAddressesAction(props: NewAddressPropsType): Promise<void> {
	const { billingAddress, shippingAddress } = props;
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const userFilter = { userId };
		const updateDoc = {
			$push: {
				billingAddresses: {
					$each: [billingAddress],
					$position: 0, // add to the top of the array
					$slice: -2, // keep only the two most recent addresses
				},
				shippingAddresses: {
					$each: [shippingAddress],
					$position: 0, // add to the top of the array
					$slice: -2, // keep only the two most recent addresses
				},
			},
		};
		await usersCollection.updateOne(userFilter, updateDoc);
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function fetchAddressesAction(): Promise<FetchAddressesPropsType | null> {
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const userFilter = { userId };
		const options = { projection: { _id: 0, billingAddresses: 1, shippingAddresses: 1 } };
		const result = await usersCollection.findOne<FetchAddressesPropsType>(userFilter, options);
		return result ? result : null;
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function captureOrderDetails(props: RazorpayPropsType): Promise<void> {
	try {
		const newOrder = await createNewOrder(props);
		await createNewOpenOrder(newOrder);
		await resetCart();
		revalidatePath("/");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function fetchOrders(): Promise<Array<OrderType>> {
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const filter = { userId };
		const options = { projection: { _id: 0, orders: 1 } };
		const result = await usersCollection.findOne<{ orders: Array<OrderType> }>(filter, options);
		if (!result) throw new Error("fetchOrders: User not found!");
		return result.orders;
	} catch (error) {
		throw error; // handle on the client side.
	}
}
