import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"../../packages/shared/components/**/*.{ts,tsx}",
	],
	theme: {},
	plugins: [require("tailwindcss-animate")],
};
export default config;
