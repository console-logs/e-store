"use server";
import { OVERHEAD_SHIPPING_CHARGES, s3Client } from "@/lib/constants";
import { guestCartsCollection, mongoClient, openOrdersCollection, usersCollection } from "@/lib/mongo";
import { calculateCartTotal, calculateGst } from "@/lib/utils";
import { CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import orderId from "order-id";
import ShortUniqueId from "short-unique-id";
import { env } from "./env";

export async function captureUserSignupAction(props: SignupPropsType): Promise<void> {
	const { email, firstName, lastName, userId } = props;
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
			s3FileDir: null,
			orders: [],
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
		const userFilter = { userId };

		const userResults = await usersCollection.findOne<{ cart: CartDataType }>(userFilter, options);
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

		// transfer files from guest dir to user dir
		const s3DirOptions = { projection: { _id: 0, s3FileDir: 1 } };
		const s3DirResults = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, s3DirOptions);
		if (!s3DirResults) throw new Error("transferGuestCartToUserAction: User s3FileDir is missing!");
		if (s3DirResults.s3FileDir) {
			// list all objects in the source directory
			const listCommand = new ListObjectsV2Command({
				Bucket: env.AWS_BUCKET_NAME,
				Prefix: cartIdCookie?.value + "/",
			});
			const listResults = await s3Client.send(listCommand);
			const sourceObjects = listResults.Contents;

			if (!sourceObjects) throw new Error("transferGuestCartToUserAction: No objects found in source directory!");

			// copy each object to the destination directory
			for (const sourceObject of sourceObjects) {
				const destinationKey = sourceObject.Key?.replace(cartIdCookie?.value + "/", "");
				const copyCommand = new CopyObjectCommand({
					CopySource: env.AWS_BUCKET_NAME + "/" + sourceObject.Key,
					Bucket: env.AWS_BUCKET_NAME,
					Key: s3DirResults.s3FileDir + "/" + destinationKey,
				});

				await s3Client.send(copyCommand);
			}

			// delete all objects in the source directory
			for (const sourceObject of sourceObjects) {
				const deleteCommand = new DeleteObjectCommand({
					Bucket: env.AWS_BUCKET_NAME,
					Key: sourceObject.Key,
				});
				await s3Client.send(deleteCommand);
			}
		} else {
			await usersCollection.updateOne(userFilter, { $set: { s3FileDir: cartIdCookie?.value } });
		}

		// update in db
		await usersCollection.updateOne(userFilter, { $set: { cart: userCart } });
		await guestCartsCollection.deleteOne(guestCartFilter); // cleanup!
		cookies().delete("cartId");
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

export async function addItemToCartAction(props: CartUpdatePropsType): Promise<void> {
	const { Name, OrderedQty, Type } = props;
	try {
		await mongoClient.connect();
		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");

		const cart = await fetchCartItemsAction();

		if (cart) {
			const existingItem = cart.cartItems.find(cartItem => cartItem.Type === Type && cartItem.Name === Name);
			if (existingItem) {
				existingItem.OrderedQty += OrderedQty;
			} else {
				cart.cartItems.push(props);
				cart.cartSize++;
			}
			// update in db
			const collection = userId ? usersCollection : guestCartsCollection;
			const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
			await collection.updateOne(filter, { $set: { cart } });
		} else {
			// new cart
			let cartId = "";
			if (cartIdCookie) {
				cartId = cartIdCookie.value;
			} else {
				cartId = new ShortUniqueId({ length: 8 }).randomUUID();
				await createCartCookieAction(cartId); // future reference
			}
			await guestCartsCollection.insertOne({
				cartId: cartId,
				cart: {
					cartSize: 1,
					cartItems: [props],
				},
			});
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
