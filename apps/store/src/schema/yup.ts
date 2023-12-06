import { ERROR_MSG } from "@/lib/constants";
import { EMPTY_CODE, EMPTY_FIRSTNAME, EMPTY_LASTNAME, INVALID_CODE, INVALID_EMAIL, PASSWORD_ERROR } from "@packages/shared/lib/errorMessages";
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
	code: Yup.string()
		.required(EMPTY_CODE)
		.min(6, INVALID_CODE)
		.max(6, INVALID_CODE),
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