import LoginForm from "@/app/auth/login/_components/loginForm";
import { RESET_PASSWORD_PAGE, SIGNUP_PAGE } from "@/lib/routes";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Login",
};

export default function Login() {
	return (
		<div className="my-10 justify-center sm:mb-48">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>Login to your circuit parts account</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<LoginForm />
				</CardContent>
				<CardFooter className="justify-between">
					<div className="text-sm text-muted-foreground">
						<Link
							aria-label="Sign in"
							href={SIGNUP_PAGE}
							className="text-primary underline-offset-4 transition-colors hover:underline">
							Create an account
						</Link>
					</div>
					<div className="text-sm text-muted-foreground">
						<Link
							aria-label="Reset password"
							href={RESET_PASSWORD_PAGE}
							className="text-primary underline-offset-4 transition-colors hover:underline">
							Reset Password
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
