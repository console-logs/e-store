import { ERROR_MSG } from "@/lib/constants";
import {
	BILL_SHIP_INFO_ERROR,
	EMPTY_ADDRESS,
	EMPTY_CITY,
	EMPTY_CODE,
	EMPTY_COUNTRY,
	EMPTY_FIRSTNAME,
	EMPTY_LASTNAME,
	EMPTY_PHONENUMBER,
	EMPTY_POSTALCODE,
	EMPTY_QUANTITY,
	EMPTY_STATE,
	INVALID_CODE,
	INVALID_EMAIL,
	PASSWORD_ERROR,
	PHONENUMBER_ERROR,
	POSTALCODE_ERROR,
} from "@packages/shared/lib/error-messages";
import * as Yup from "yup";

export const searchPartSchema = Yup.object().shape({
	query: Yup.string().required(ERROR_MSG.COMPONENT_SEARCH_QUERY_REQUIRED),
});

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email(INVALID_EMAIL)
		.required(INVALID_EMAIL)
		.matches(/@[^.]*\./, INVALID_EMAIL)
		.matches(/^\S+$/, INVALID_EMAIL),
	password: Yup.string().required(PASSWORD_ERROR),
});

export const resetSchema = Yup.object().shape({
	email: Yup.string()
		.email(INVALID_EMAIL)
		.required(INVALID_EMAIL)
		.matches(/@[^.]*\./, INVALID_EMAIL)
		.matches(/^\S+$/, INVALID_EMAIL),
});

export const reset2Schema = Yup.object().shape({
	code: Yup.string().required(EMPTY_CODE).min(6, INVALID_CODE).max(6, INVALID_CODE),
	newPassword: Yup.string()
		.required(PASSWORD_ERROR)
		.matches(/(?=.*[a-z])/, PASSWORD_ERROR)
		.matches(/(?=.*[A-Z])/, PASSWORD_ERROR)
		.matches(/(?=.*[0-9])/, PASSWORD_ERROR)
		.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_ERROR)
		.min(8, PASSWORD_ERROR),
});

export const signupSchema = Yup.object().shape({
	fname: Yup.string().required(EMPTY_FIRSTNAME),
	lname: Yup.string().required(EMPTY_LASTNAME),
	email: Yup.string()
		.email(INVALID_EMAIL)
		.required(INVALID_EMAIL)
		.matches(/@[^.]*\./, INVALID_EMAIL)
		.matches(/^\S+$/, INVALID_EMAIL),
	password: Yup.string()
		.required(PASSWORD_ERROR)
		.matches(/(?=.*[a-z])/, PASSWORD_ERROR)
		.matches(/(?=.*[A-Z])/, PASSWORD_ERROR)
		.matches(/(?=.*[0-9])/, PASSWORD_ERROR)
		.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_ERROR)
		.min(8, PASSWORD_ERROR),
});

export const verifyEmailSchema = Yup.object().shape({
	code: Yup.string()
		.matches(/^\d{6}$/, INVALID_CODE)
		.required(EMPTY_CODE),
});

export const updatePartQtySchema = (minOrderQty: number, maxOrderQty: number) =>
	Yup.object().shape({
		orderQty: Yup.number()
			.positive()
			.required(EMPTY_QUANTITY)
			.min(minOrderQty, `Quantity cannot be less than ${minOrderQty}`)
			.max(maxOrderQty, `Quantity cannot be more than the available stock`),
	});

export const partOrderSchema = (minOrderQty: number, maxOrderQty: number) =>
	Yup.object().shape({
		orderQty: Yup.number()
			.positive()
			.required("Quantity cannot be empty")
			.min(minOrderQty, `Quantity cannot be less than min order quantity [Minimum: ${minOrderQty}]`)
			.max(maxOrderQty, `Quantity cannot be more than the available stock [${maxOrderQty}]`),
	});

export const addressSchema = (isSameAddress: boolean) =>
	Yup.object().shape({
		bill_fname: Yup.string().required(EMPTY_FIRSTNAME),
		bill_lname: Yup.string().required(EMPTY_LASTNAME),
		bill_company: Yup.string().optional(),
		bill_address1: Yup.string().required(EMPTY_ADDRESS),
		bill_address2: Yup.string().optional(),
		bill_city: Yup.string().required(EMPTY_CITY),
		bill_state: Yup.string().required(EMPTY_STATE),
		bill_country: Yup.string().required(EMPTY_COUNTRY),
		bill_postalCode: Yup.string().required(EMPTY_POSTALCODE).min(6, POSTALCODE_ERROR).max(6, POSTALCODE_ERROR),
		bill_email: Yup.string()
			.email(INVALID_EMAIL)
			.required(INVALID_EMAIL)
			.matches(/@[^.]*\./, INVALID_EMAIL)
			.matches(/^\S+$/, INVALID_EMAIL),
		bill_phone: Yup.string().required(EMPTY_PHONENUMBER).min(10, PHONENUMBER_ERROR).max(10, PHONENUMBER_ERROR),
		bill_gst: Yup.string().optional(),
		bill_poNumber: Yup.string().optional(),

		bill_ship_match: Yup.boolean().required(BILL_SHIP_INFO_ERROR),

		...(!isSameAddress && {
			ship_fname: Yup.string().required(EMPTY_FIRSTNAME),
			ship_lname: Yup.string().required(EMPTY_LASTNAME),
			ship_company: Yup.string().optional(),
			ship_address1: Yup.string().required(EMPTY_ADDRESS),
			ship_address2: Yup.string().optional(),
			ship_city: Yup.string().required(EMPTY_CITY),
			ship_state: Yup.string().required(EMPTY_STATE),
			ship_country: Yup.string().required(EMPTY_COUNTRY),
			ship_postalCode: Yup.string().required(EMPTY_POSTALCODE).min(6, POSTALCODE_ERROR).max(6, POSTALCODE_ERROR),
			ship_email: Yup.string()
				.email(INVALID_EMAIL)
				.required(INVALID_EMAIL)
				.matches(/@[^.]*\./, INVALID_EMAIL)
				.matches(/^\S+$/, INVALID_EMAIL),
			ship_phone: Yup.string().required(EMPTY_PHONENUMBER).min(10, PHONENUMBER_ERROR).max(10, PHONENUMBER_ERROR),
		}),
	});
