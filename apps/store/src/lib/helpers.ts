import { env } from "@/env";
import { s3Client } from "@/lib/constants";
import { guestCartsCollection, mongoClient, usersCollection } from "@/lib/mongo";
import { CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";

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
	if (!sourceObjects) throw new Error("transferGuestCartToUserAction: No objects found in source directory!");

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

async function deleteFilesInSourceDirectory(cartId: string | undefined): Promise<void> {
	const listCommand = new ListObjectsV2Command({
		Bucket: env.AWS_BUCKET_NAME,
		Prefix: cartId + "/",
	});
	const listResults = await s3Client.send(listCommand);
	const sourceObjects = listResults.Contents;
	if (!sourceObjects) throw new Error("transferGuestCartToUserAction: No objects found in source directory!");
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
		cart.cartItems.push(item);
		cart.cartSize++;
	}
	// update in db
	await mongoClient.connect();
	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const collection = userId ? usersCollection : guestCartsCollection;
	const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
	await collection.updateOne(filter, { $set: { cart } });
}

export async function createNewCart(props: CartUpdatePropsType): Promise<void> {
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
			cartSize: 1,
			cartItems: [props],
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
