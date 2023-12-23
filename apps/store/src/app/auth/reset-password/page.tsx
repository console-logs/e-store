import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password",
};

export default function ResetPassword() {
	return (
		<div className="my-10 justify-center sm:mb-80">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Reset Password</CardTitle>
					<CardDescription>Enter your email address and we will send you a verification code</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<ResetPasswordForm />
				</CardContent>
			</Card>
		</div>
	);
}
