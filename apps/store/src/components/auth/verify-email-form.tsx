"use client";
import { captureUserSignupAction } from "@/actions";
import { HOME_PAGE } from "@/lib/page-routes";
import { verifyEmailSchema } from "@/schema/yup-schema";
import { tRPCReactApi } from "@/trpc/react";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export function VerifyEmailForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const sendSignupEmail = tRPCReactApi.signup.sendSignupEmail.useMutation();

	const initialValues = {
		code: "",
	};

	const handleOnSubmit = useCallback(
		(values: { code: string }) => {
			startTransition(async () => {
				if (!isLoaded) return;

				try {
					const completeSignUp = await signUp.attemptEmailAddressVerification({
						code: values.code,
					});
					if (completeSignUp.status !== "complete") {
						//  investigate the response, to see if there was an error
						console.log(JSON.stringify(completeSignUp, null, 2));
					}
					if (completeSignUp.status === "complete") {
						await setActive({
							session: completeSignUp.createdSessionId,
						});
						const signupData = {
							firstName: completeSignUp.firstName!,
							lastName: completeSignUp.lastName!,
							email: completeSignUp.emailAddress!,
							userId: completeSignUp.createdUserId!,
						};

						// send signup email
						sendSignupEmail.mutate({
							email: signupData.email,
							firstName: signupData.firstName,
						});

						await captureUserSignupAction(signupData).catch(console.error);
						router.push(HOME_PAGE);
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

	async function handleResendBtnClick() {
		startTransition(async () => {
			if (!isLoaded) return;
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={verifyEmailSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form>
					<div className="grid gap-2">
						<Label htmlFor="code">First Name</Label>
						<Field
							as={Input}
							id="code"
							name="code"
							type="text"
							autoComplete="off"
							formNoValidate
							required
							pattern="\d{6}"
							placeholder="6-digit verification code"
						/>
					</div>
					<Button
						disabled={isLoading}
						type="submit"
						className="w-full mt-3">
						{isLoading ? (
							<Icons.spinner
								className="animate-spin text-center"
								aria-hidden="true"
							/>
						) : (
							"Verify email"
						)}
					</Button>
					<div className="mt-2">
						<span className="text-sm">Did&apos;t receive code?</span>
						<Button
							disabled={isLoading}
							onClick={() => handleResendBtnClick()}
							className="-ml-3"
							variant={"link"}>
							Resend
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
