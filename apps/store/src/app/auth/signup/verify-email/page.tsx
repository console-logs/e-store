import VerifyEmailForm from "@/app/auth/signup/_components/verifyEmailForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Verify Email",
};

export default function VerifyEmail() {
	return (
		<div className="mt-10 justify-center sm:mb-80">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Verify your email</CardTitle>
					<CardDescription>Enter the 6-digit code sent to your email ID</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<VerifyEmailForm />
				</CardContent>
			</Card>
		</div>
	);
}
