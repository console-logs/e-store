"use client";
import { reset2Schema } from "@/schema/yup-schema";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useState, useTransition } from "react";

export function ResetPasswordForm2() {
	const [isLoading, startTransition] = useTransition();
	const { isLoaded, signIn, setActive } = useSignIn();
	const [complete, setComplete] = useState(false);
	const { toast } = useToast();

	const initialValues = {
		code: "",
		newPassword: "",
	};

	const handleOnSubmit = useCallback(
		(values: { code: string; newPassword: string }) => {
			startTransition(async () => {
				if (!isLoaded) {
					return;
				}
				try {
					const attemptFirstFactor = await signIn.attemptFirstFactor({
						strategy: "reset_password_email_code",
						code: values.code,
						password: values.newPassword,
					});
					if (attemptFirstFactor.status === "needs_second_factor") {
						//TODO: implement 2FA (requires clerk pro plan)
					} else if (attemptFirstFactor.status === "complete") {
						await setActive({
							session: attemptFirstFactor.createdSessionId,
						});
						setComplete(true);
						toast({
							variant: "default",
							title: "Password Reset Successful",
							description: "Your password has been reset successfully.",
						});
					} else {
						toast({
							variant: "destructive",
							title: "Password Reset Error",
							description: "Something went wrong",
							duration: 4000,
						});
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
		[startTransition]
	);

	if (complete) {
		return (
			<div>
				<p className="my-4">You successfully changed you password.</p>
			</div>
		);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={reset2Schema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="code">Verification Code</Label>
						<Field
							as={Input}
							id="code"
							name="code"
							type="number"
							autoComplete="off"
							formNoValidate
							required
							placeholder="6-digit verification code"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="newPassword">New password</Label>
						<Field
							as={Input}
							id="newPassword"
							name="newPassword"
							type="password"
							autoComplete="off"
							formNoValidate
							required
							placeholder="Enter your new password"
						/>
						<ErrorMessage
							name="newPassword"
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
							"Reset Password"
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
