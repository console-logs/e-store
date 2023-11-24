import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getCurrentYear(): number {
	return new Date().getFullYear();
}

export function getInitials(firstName: string, lastName: string): string {
	let initials = `${firstName.charAt(0) ?? ""}${lastName.charAt(0) ?? ""}`;
	return initials;
}
