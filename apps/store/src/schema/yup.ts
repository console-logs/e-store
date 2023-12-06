import { ERROR_MSG } from "@/lib/constants";
import * as Yup from "yup";

export const searchPartSchema = Yup.object().shape({
	query: Yup.string().required(ERROR_MSG.COMPONENT_SEARCH_QUERY_REQUIRED),
});