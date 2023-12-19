import { S3Client } from "@aws-sdk/client-s3";

export const WEBSITE_NAME = "E-Store";
export const SUBTITLE = "Lorem ipsum, dolor sit amet consectetur adipisicing elit impedit perferendi.";
export const COUNTRY = "India";
export const BOM_TEMPLATE_STRING =
	"https://e-store-public-bucket.s3.ap-south-1.amazonaws.com/E-Store-Bill-of-Materials-Template.csv";
export const FALLBACK_PART_IMAGE = "https://e-store-public-bucket.s3.ap-south-1.amazonaws.com/comp-img-placeholder.png";

export const ERROR_MSG = {
	COMPONENT_SEARCH_QUERY_REQUIRED: "Please enter part number, keywords or tech specs to search",
};

export const PARTS_API = "https://parts-api-nine.vercel.app/api/parts?mpn=";
export const OVERHEAD_SHIPPING_CHARGES = 0.0;

export const s3Client = new S3Client({}); // credentials are loaded from environment variables

export const STATUS_OK = 200;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_NOT_FOUND = 404;
export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const FILE_EXTENSION = ".zip";

export const FILE_PATH_SEPARATOR = "/";

export const PART_REQUEST_RATE_LIMIT = 30; // 30 requests per minute
