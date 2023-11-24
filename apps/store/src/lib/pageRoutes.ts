export const HOST_URL =
	process.env.NODE_ENV === "development"
		? `http://localhost:${process.env.PORT ?? 3000}`
		: "https://www.circuitparts.in";

export const RIGID_PCB_API_ROUTE = "api/rigid-pcb";

export const HOME_PAGE = "/";
export const COMPONENT_PAGES = "/products/components";
export const COMPONENT_RESULTS_PAGE = "/products/components/results/";
export const COMPONENT_DETAILS_PAGE = "/products/components/details/";
export const RIGID_PCB_FAB_PAGE = "/products/pcb/rigid-pcb";
export const FLEX_PCB_FAB_PAGE = "/products/pcb/flex-pcb";
export const PCB_TECH_CAPABILITIES_PAGE = "/products/pcb/capabilities";
export const INVENTORY_MANAGEMENT_PAGE = "/products/inventory/manage-inventory";
export const DESIGN_CALCULATORS_PAGE = "/calculators/design-calculators";
export const PCB_ASSEMBLY_PAGE = "/products/pcb/assembly";
export const AUTH_PAGES = "/auth";
export const LOGIN_PAGE = "/auth/login";
export const SIGNUP_PAGE = "/auth/signup";
export const ACCOUNT_PAGE = "/account";
export const VERIFY_EMAIL_PAGE = "/auth/signup/verify-email";
export const RESET_PASSWORD_PAGE = "/auth/reset-password";
export const CHANGE_PASSWORD_PAGE = "/auth/change-password";
export const SHOPPING_CART_PAGE = "/cart";
export const ADDRESSES_PAGE = "/checkout/addresses";
export const EDIT_ADDRESSES_PAGE = "/checkout/edit-address";
export const REVIEW_ORDER_PAGE = "/checkout/review-order";
export const ORDER_HISTORY_PAGE = "/order-history/past-orders";
export const ABOUT_PAGE = "/about";
export const PRIVACY_POLICY_PAGE = "/privacy-policy";
export const TERMS_AND_CONDITIONS_PAGE = "/terms-and-conditions";
export const SHIPPING_PAGE = "/shipping-and-returns";
export const CONTACT_US_PAGE = "/contact-us";
export const nRF52832QFAA_R7_PAGE = "/products/components/details/NRF52832-QFAA-R7";
export const nRF52_PAGE = "/products/components/results/NRF52";
export const UPLOAD_BOM_PAGE = "/products/components/upload-bom";
export const RESET_PASSWORD_STEP_2_PAGE = "/auth/reset-password/step2";
export const ORDER_SUCCESS_PAGE = "/order-status/success";
export const ORDER_FAILED_PAGE = "/order-status/failed";
export const COMING_SOON_PAGE = "/coming-soon";
export const ROADMAP_PAGE = "/roadmap";
