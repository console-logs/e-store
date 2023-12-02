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

export function getFutureDate(daysToAdd: number) {
	const currentDate = new Date();
	let workingDaysAdded = 0;
	let currentDay = currentDate;

	while (workingDaysAdded < daysToAdd) {
		currentDay.setDate(currentDay.getDate() + 1); // Add one day at a time

		// Check if the current day is a working day (Monday to Friday)
		if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
			workingDaysAdded++;
		}
	}

	// Format the date as DD/MM/YYYY
	const futureDate = `${currentDay.getDate().toString().padStart(2, "0")}/${(currentDay.getMonth() + 1)
		.toString()
		.padStart(2, "0")}/${currentDay.getFullYear()}`;

	return futureDate;
}


export function convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = error => {
			reject(error);
		};
	});
}

export function formatToInr(num: number): string {
	const formattedAmount = new Intl.NumberFormat("en-IN").format(num);
	return `₹${formattedAmount}`;
}

export function convertToTitleCase(str: string): string {
	const words = str.match(/[A-Za-z][a-z]*/g) ?? [];
	const titleCaseString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	return titleCaseString;
}