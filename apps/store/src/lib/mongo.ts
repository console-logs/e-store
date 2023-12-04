import { env } from "@/env";
import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(env.MONGODB_URL);

export const db = "e-store";

export const collections = {
	openOrdersCollection: "openOrders",
	closedOrdersCollection: "closedOrders",
	guestCartsCollection: "guestCarts",
	usersCollection: "users",
};

export const database = mongoClient.db(db);

export const usersCollection = database.collection(collections.usersCollection);

export const guestCartsCollection = database.collection(
	collections.guestCartsCollection
);
export const openOrdersCollection = database.collection(
	collections.openOrdersCollection
);
export const closedOrdersCollection = database.collection(
	collections.closedOrdersCollection
);
