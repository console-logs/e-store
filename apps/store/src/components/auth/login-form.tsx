"use client";
import { transferGuestCartToUserAction } from "@/actions";
import { HOME_PAGE } from "@/lib/routes";
import { loginSchema } from "@/schema/yup-schema";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export function LoginForm() {
	const [isLoading, startTransition] = useTransition();
	const { isLoaded, signIn, setActive } = useSignIn();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const initialValues = {
		email: "",
		password: "",
	};

	const handleOnSubmit = useCallback(
		(login_credentials: { email: string; password: string }) => {
			startTransition(async () => {
				if (!isLoaded) return;
				try {
					const result = await signIn.create({
						identifier: login_credentials.email,
						password: login_credentials.password,
					});
					if (result.status === "complete") {
						await setActive({ session: result.createdSessionId });
						await transferGuestCartToUserAction();
						router.push(HOME_PAGE);
					} else {
						/*Investigate why the login hasn't completed */
						console.log(result);
					}
				} catch (err: unknown) {
					let errorMessage: string | undefined = "Something went wrong, please try again later.";
					if (err instanceof Error) {
						errorMessage = err.message;
					} else if (isClerkAPIResponseError(err)) {
						errorMessage = err.errors[0]?.longMessage;
					}
					toast({
						variant: "destructive",
						title: "Authentication error",
						description: errorMessage,
						duration: 4000,
					});
				}
			});
		},
		[startTransition, router]
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-3">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Field
							as={Input}
							id="email"
							name="email"
							type="email"
							autoComplete="off"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Field
								as={Input}
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="off"
								formNoValidate
								required
							/>
							<Button
								variant="ghost"
								size="sm"
								className="absolute right-0 top-0 h-10 w-10 px-3 py-2 hover:bg-transparent"
								onClick={() => setShowPassword(prev => !prev)}>
								{showPassword ? (
									<Icons.eyeSlash aria-hidden="true" />
								) : (
									<Icons.eye aria-hidden="true" />
								)}
								<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
							</Button>
						</div>
					</div>
					<Button
						disabled={isLoading}
						type="submit"
						className="w-full">
						{isLoading ? (
							<Icons.spinner
								className="animate-spin text-center"
								aria-hidden="true"
							/>
						) : (
							"Sign In"
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
