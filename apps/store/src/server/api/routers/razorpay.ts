import { env } from "@/env";
import { OVERHEAD_SHIPPING_CHARGES } from "@/lib/constants";
import { mongoClient, usersCollection } from "@/lib/mongo";
import { calculateCartTotal, calculateGst } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import Razorpay from "razorpay";
import ShortUniqueId from "short-unique-id";

export const razorpayRouter = createTRPCRouter({
	getOrder: publicProcedure.query(async () => {
		try {
			// Initialize razorpay object
			const razorpay = new Razorpay({
				key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				key_secret: env.RAZORPAY_KEY_SECRET,
			});

			// Fetch data
			await mongoClient.connect();
			const { userId } = auth();
			const userFilter = { userId };
			const userData = await usersCollection.findOne<UserType>(userFilter);
			if (!userData) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Razorpay: User not found",
				});
			}

			// Calculate cart total
			const cartValue = calculateCartTotal(userData.cart);
			const tax = calculateGst(cartValue);
			const cartTotal = cartValue + OVERHEAD_SHIPPING_CHARGES + tax;

			// Create Razorpay order
			const options = {
				receipt: new ShortUniqueId({ length: 6 }).randomUUID(),
				amount: cartTotal * 100, // amount in paise
				currency: "INR",
			};
			const response = await razorpay.orders.create(options);

			const razorpayOrder = {
				id: response.id,
				amount: response.amount as string,
				currency: response.currency,
				name: "Circuit Parts",
				email: userData.email,
				phoneNumber: userData.billingAddresses[0]?.phone, // last used billing address phone number
			};
			return razorpayOrder;
		} catch (error) {
			throw error; // Rethrow the error for TRPC [src/api/trpc/[trpc].ts] to handle
		}
	}),
});
