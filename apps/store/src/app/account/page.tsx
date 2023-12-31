import UpdateAccountForm from "@/app/account/_components/update";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account",
};

export default function Account() {
	return (
		<Card className="w-full sm:w-2/6 sm:mx-auto sm:mb-10">
			<CardHeader>
				<CardTitle className="text-2xl">Account Settings</CardTitle>
				<CardDescription>
					<p>Manage your account settings</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<UpdateAccountForm />
			</CardContent>
		</Card>
	);
}
