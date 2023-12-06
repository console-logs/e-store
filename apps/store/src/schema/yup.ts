import { ERROR_MSG } from "@/lib/constants";
import { INVALID_EMAIL, PASSWORD_ERROR } from "@packages/shared/lib/errorMessages";
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