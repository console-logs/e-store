"use client";
import { RESET_PASSWORD_STEP_2_PAGE } from "@/lib/routes";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { INVALID_EMAIL } from "@shared/lib/errorMessages";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as Yup from "yup";

export default function ResetPasswordForm() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const { isLoaded, signIn } = useSignIn();
	const { toast } = useToast();

	const initialValues = {
		email: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email(INVALID_EMAIL)
			.required(INVALID_EMAIL)
			.matches(/@[^.]*\./, INVALID_EMAIL)
			.matches(/^\S+$/, INVALID_EMAIL),
	});

	function handleOnSubmit(values: { email: string }) {
		startTransition(async () => {
			if (!isLoaded) {
				return;
			}
			try {
				const firstFactor = await signIn.create({
					strategy: "reset_password_email_code",
					identifier: values.email,
				});

				if (firstFactor.status === "needs_first_factor") {
					router.push(RESET_PASSWORD_STEP_2_PAGE);
					toast({
						variant: "default",
						title: "Check your email",
						description: "We sent you a 6-digit verification code.",
						duration: 4000,
					});
				}
			} catch (err: unknown) {
				const unknownErr = "Something went wrong, please try again later.";
				const errorMessage = isClerkAPIResponseError(err) ? err.errors[0]?.longMessage : unknownErr;
				toast({
					variant: "destructive",
					title: "Authentication error",
					description: errorMessage,
					duration: 4000,
				});
			}
		});
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
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
							"Send Verification Code"
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
