"use client";
import { VERIFY_EMAIL_PAGE } from "@/lib/routes";
import { signupSchema } from "@/schema/yup";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export default function SignupForm() {
	const router = useRouter();
	const { toast } = useToast();
	const { isLoaded, signUp } = useSignUp();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, startTransition] = useTransition();

	const initialValues = {
		fname: "",
		lname: "",
		email: "",
		password: "",
	};

	const handleOnSubmit = useCallback(
		(signup_credentials: { email: string; password: string; fname: string; lname: string }) => {
			startTransition(async () => {
				if (!isLoaded) {
					return;
				}
				try {
					await signUp.create({
						emailAddress: signup_credentials.email,
						password: signup_credentials.password,
						firstName: signup_credentials.fname,
						lastName: signup_credentials.lname,
					});

					// Send email verification code
					await signUp.prepareEmailAddressVerification({
						strategy: "email_code",
					});
					router.push(VERIFY_EMAIL_PAGE);
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
			validationSchema={signupSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-3">
					<div className="grid gap-2">
						<Label htmlFor="fname">First Name</Label>
						<Field
							as={Input}
							id="fname"
							name="fname"
							type="text"
							autoComplete="off"
							formNoValidate
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="lname">Last Name</Label>
						<Field
							as={Input}
							id="lname"
							name="lname"
							type="text"
							autoComplete="off"
							formNoValidate
							required
						/>
					</div>
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
						<ErrorMessage
							name="password"
							render={(msg: string) => <p className="text-red-600">{msg}</p>}
						/>
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
							"Create account"
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
