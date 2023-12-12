"use server";
import { OVERHEAD_SHIPPING_CHARGES } from "@/lib/constants";
import {
	createNewCart,
	fetchGuestCart,
	fetchUserCart,
	mergeCarts,
	transferDesignFilesInS3,
	updateExistingCart,
} from "@/lib/helpers";
import { guestCartsCollection, mongoClient, openOrdersCollection, usersCollection } from "@/lib/mongo";
import { calculateCartTotal, calculateGst } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import orderId from "order-id";

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
		} else {
			await createNewCart(item);
		}
		revalidatePath("/products", "layout");
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function updatePartQtyAction(props: UpdatePartQtyPropsType): Promise<void> {
	const { name, newQty: newQuantity } = props;
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
		throw error; // handle on the client side.
	}
}

export async function deleteCartItemAction(name: string): Promise<void> {
	try {
		await mongoClient.connect();
		const cart = await fetchCartItemsAction();
		if (cart) {
			// keep the item that is not a match
			const updatedCartItems = cart.cartItems.filter(cartItem => cartItem.Name !== name);

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
		throw error; // handle on the client side.
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
		throw error; // handle on the client side.
	}
}

export async function createCartCookieAction(cartId: string) {
	cookies().set({
		name: "cartId",
		value: cartId,
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // one month
		sameSite: true,
		// domain: env.HOST,
	});
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
	const { razorpayResponses, razorpayOrderValue } = props;
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const filter = { userId };
		const options = { projection: { _id: 0, cart: 1, billingAddresses: 1, shippingAddresses: 1 } };
		const result = await usersCollection.findOne<CheckoutDataType>(filter, options);

		if (!result) throw new Error("captureOrderDetails: User not found!");

		const cart = result.cart;
		const cartValue = calculateCartTotal(cart);
		const tax = calculateGst(cartValue);
		const billingAddress = result.billingAddresses[0]!;
		const shippingAddress = result.shippingAddresses[0]!;
		const newOrderId = orderId(razorpayResponses.razorpay_order_id).generate();

		const newOrder: OrderType = {
			id: newOrderId,
			createdAt: new Date(),
			status: "PLACED",
			cartValue,
			discountCode: "NA",
			discountValue: 0,
			tax,
			shippingCost: OVERHEAD_SHIPPING_CHARGES,
			cartTotal: Number(razorpayOrderValue), // in paise
			paymentId: razorpayResponses.razorpay_payment_id,
			paymentOrderId: razorpayResponses.razorpay_order_id,
			paymentSignature: razorpayResponses.razorpay_signature,
			shipper: null,
			awb: null,
			billingAddress,
			shippingAddress,
			cart,
			remarks: null,
		};

		// create new open order for admin
		const newOpenOrder: OpenOrderType = {
			...newOrder,
			userId,
			notes: null,
		};

		await usersCollection.updateOne(filter, {
			$push: { orders: newOrder },
		});
		await openOrdersCollection.insertOne(newOpenOrder); // for admin

		// reset cart
		const newCart: CartDataType = {
			cartSize: 0,
			cartItems: [],
		};
		await usersCollection.updateOne(filter, { $set: { cart: newCart } });
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
