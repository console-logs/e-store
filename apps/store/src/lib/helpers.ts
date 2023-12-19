"use server";
import { env } from "@/env";
import { FILE_EXTENSION, FILE_PATH_SEPARATOR, OVERHEAD_SHIPPING_CHARGES, s3Client } from "@/lib/constants";
import { guestCartsCollection, mongoClient, openOrdersCollection, usersCollection } from "@/lib/mongo";
import { calculateCartTotal, calculateGst } from "@/lib/utils";
import { CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import orderId from "order-id";
import ShortUniqueId from "short-unique-id";
import Papa, { type ParseResult } from "papaparse";

export async function updateCartInDB(cart: CartDataType): Promise<void> {
	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const collection = userId ? usersCollection : guestCartsCollection;
	const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
	await collection.updateOne(filter, { $set: { cart } });
}

export async function mergeCarts(userCart: CartDataType, guestCart: CartDataType): Promise<CartDataType> {
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
		userCart.updatedAt = guestCart.updatedAt;
	});
	return userCart;
}

export async function transferDesignFilesInS3(): Promise<void> {
	const cartIdCookie = cookies().get("cartId");
	const cartId = cartIdCookie?.value;
	const { userId } = auth();
	const userFilter = { userId };

	const s3DirOptions = { projection: { _id: 0, s3FileDir: 1 } };
	const s3DirResults = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, s3DirOptions);
	if (!s3DirResults) throw new Error("transferGuestCartToUserAction: User s3FileDir is missing!");
	if (s3DirResults.s3FileDir) {
		await copyFilesFromSourceToDestination(cartId, s3DirResults.s3FileDir);
		await deleteFilesInSourceDirectory(cartId);
	} else {
		await usersCollection.updateOne(userFilter, { $set: { s3FileDir: cartId } });
	}
}

async function copyFilesFromSourceToDestination(cartId: string | undefined, destinationDir: string): Promise<void> {
	// list all objects in the source directory
	const listCommand = new ListObjectsV2Command({
		Bucket: env.AWS_BUCKET_NAME,
		Prefix: cartId + "/",
	});
	const listResults = await s3Client.send(listCommand);
	const sourceObjects = listResults.Contents;
	if (!sourceObjects) throw new Error("copyFilesFromSourceToDestination: No objects found in source directory!");

	// copy each object to the destination directory
	for (const sourceObject of sourceObjects) {
		const destinationKey = sourceObject.Key?.replace(cartId + "/", "");
		const copyCommand = new CopyObjectCommand({
			CopySource: env.AWS_BUCKET_NAME + "/" + sourceObject.Key,
			Bucket: env.AWS_BUCKET_NAME,
			Key: destinationDir + "/" + destinationKey,
		});
		await s3Client.send(copyCommand);
	}
}

async function deleteFilesInSourceDirectory(foldername: string | undefined): Promise<void> {
	const listCommand = new ListObjectsV2Command({
		Bucket: env.AWS_BUCKET_NAME,
		Prefix: foldername + "/",
	});
	const listResults = await s3Client.send(listCommand);
	const sourceObjects = listResults.Contents;
	if (!sourceObjects) throw new Error("deleteFilesInSourceDirectory: No objects found in source directory!");
	for (const sourceObject of sourceObjects) {
		const deleteCommand = new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: sourceObject.Key,
		});
		await s3Client.send(deleteCommand);
	}
}

export async function fetchGuestCart(): Promise<CartDataType | null> {
	await mongoClient.connect();
	const options = { projection: { _id: 0, cart: 1 } };
	const cartIdCookie = cookies().get("cartId");
	const cartId = cartIdCookie?.value;
	const guestCartFilter = { cartId };
	const guestResults = await guestCartsCollection.findOne<{ cart: CartDataType }>(guestCartFilter, options);
	return guestResults ? guestResults.cart : null;
}

export async function fetchUserCart(): Promise<CartDataType | null> {
	await mongoClient.connect();
	const options = { projection: { _id: 0, cart: 1 } };
	const { userId } = auth();
	const userFilter = { userId };
	const userResults = await usersCollection.findOne<{ cart: CartDataType }>(userFilter, options);
	return userResults ? userResults.cart : null;
}

export async function updateExistingCart({
	cart,
	item,
}: {
	cart: CartDataType;
	item: CartUpdatePropsType;
}): Promise<void> {
	const existingItem = cart.cartItems.find(cartItem => cartItem.Type === item.Type && cartItem.Name === item.Name);
	if (existingItem) {
		existingItem.OrderedQty += item.OrderedQty;
	} else {
		cart.updatedAt = new Date();
		cart.cartItems.push(item);
		cart.cartSize++;
	}
}

export async function updateGuestCart(props: CartUpdatePropsType): Promise<CartDataType> {
	return {
		createdAt: new Date(),
		updatedAt: new Date(),
		cartSize: 1,
		cartItems: [props],
	};
}

export async function createNewCartInDB(cart: CartDataType): Promise<void> {
	const cartIdCookie = cookies().get("cartId");
	let cartId = "";
	if (cartIdCookie) {
		cartId = cartIdCookie.value;
	} else {
		cartId = new ShortUniqueId({ length: 8 }).randomUUID();
		await createCartCookie(cartId); // future reference
	}
	await mongoClient.connect();
	await guestCartsCollection.insertOne({
		cartId: cartId,
		cart: {
			createdAt: cart.createdAt,
			updatedAt: cart.updatedAt,
			cartSize: cart.cartSize,
			cartItems: cart.cartItems,
		},
	});
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

export async function filterCartItems(cart: CartDataType, name: string): Promise<CartItemsType> {
	return cart.cartItems.filter(cartItem => cartItem.Name !== name);
}

export async function filterCartItemsByProperty(
	cart: CartDataType,
	property: string,
	value: string
): Promise<CartItemsType> {
	return cart.cartItems.filter(cartItem => cartItem[property as keyof typeof cartItem] !== value);
}

export async function createNewOrder(props: RazorpayPropsType): Promise<OrderType> {
	const { razorpayResponses, razorpayOrderValue } = props;

	const { userId } = auth();
	const filter = { userId };
	await mongoClient.connect();
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

	await usersCollection.updateOne(filter, { $push: { orders: newOrder } });

	return newOrder;
}

export async function createNewOpenOrder(newOrder: OrderType) {
	const { userId } = auth();
	const newOpenOrder: OpenOrderType = {
		...newOrder,
		userId,
		notes: null,
	};
	await openOrdersCollection.insertOne(newOpenOrder); // for admin
}

export async function resetCart(): Promise<void> {
	const newCart: CartDataType = {
		cartSize: 0,
		cartItems: [],
	};
	const { userId } = auth();
	const filter = { userId };
	await mongoClient.connect();
	await usersCollection.updateOne(filter, { $set: { cart: newCart } });
}

export async function getFoldername(): Promise<string> {
	let foldername = FILE_PATH_SEPARATOR;

	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();

	if (!userId && !cartIdCookie) {
		foldername = newCartId + FILE_PATH_SEPARATOR;
		await createCartCookie(newCartId);
		// Presence of cartId cookie means an associated cart should also be present in the database.
		// this ensures fetchCartItemsAction will not fail.
		await guestCartsCollection.insertOne({
			cartId: newCartId,
			cart: {
				createdAt: new Date(),
				updatedAt: new Date(),
				cartSize: 0,
				cartItems: [],
			},
		});
	}

	if (userId) {
		await mongoClient.connect();
		const options = { projection: { _id: 0, s3FileDir: 1 } };
		const userFilter = { userId };
		const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
		if (!result) throw new Error("User not found");

		// check if user has a foldername associated with their account
		if (result.s3FileDir) {
			foldername = result.s3FileDir + FILE_PATH_SEPARATOR;
		} else {
			foldername = newCartId + FILE_PATH_SEPARATOR;
			await usersCollection.updateOne(userFilter, { $set: { s3FileDir: newCartId } });
		}
	}

	if (cartIdCookie) {
		foldername = cartIdCookie.value + FILE_PATH_SEPARATOR;
	}
	return foldername;
}

export async function deleteDesignFileFromS3(itemName: string): Promise<void> {
	let foldername = null;

	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");

	if (userId) {
		await mongoClient.connect();
		const options = { projection: { _id: 0, s3FileDir: 1 } };
		const userFilter = { userId };
		const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
		if (!result) throw new Error("User not found");
		foldername = result.s3FileDir ? result.s3FileDir + FILE_PATH_SEPARATOR : null;
	}

	if (cartIdCookie) {
		foldername = cartIdCookie.value + FILE_PATH_SEPARATOR;
	}
	const filename = foldername + itemName + FILE_EXTENSION;
	const deleteCommand = new DeleteObjectCommand({
		Bucket: env.AWS_BUCKET_NAME,
		Key: filename,
	});
	await s3Client.send(deleteCommand);
}

export async function deleteAllDesignFilesFromS3(): Promise<void> {
	let foldername;

	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");

	if (userId) {
		await mongoClient.connect();
		const options = { projection: { _id: 0, s3FileDir: 1 } };
		const userFilter = { userId };
		const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
		if (!result) throw new Error("User not found");
		foldername = result.s3FileDir ? result.s3FileDir : undefined;
	}

	if (cartIdCookie) {
		foldername = cartIdCookie.value;
	}
	await deleteFilesInSourceDirectory(foldername);
}

export default async function parseCsvFile(file: File): Promise<Array<ParsedDataObject>> {
	try {
		const fileData = await file.text();
		const config = {
			header: true,
			skipEmptyLines: true,
			delimiter: ",",
		};
		const csv: ParseResult<unknown> = Papa.parse(fileData, config);
		if (csv.errors.length > 0) {
			csv.errors.forEach(error => {
				throw new Error(`${error.message} at row ${error.row}`);
			});
		}
		return csv.data as Array<ParsedDataObject>;
	} catch (error) {
		throw error;
	}
}
