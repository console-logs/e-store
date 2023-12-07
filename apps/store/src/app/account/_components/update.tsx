"use client";
import { isClerkAPIResponseError, useUser } from "@clerk/nextjs";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useToast } from "@shared/components/ui/use-toast";
import { PASSWORD_ERROR } from "@shared/lib/errorMessages";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useCallback, useTransition } from "react";
import * as Yup from "yup";

export default function UpdateAccountForm() {
	const { user } = useUser();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading, startTransition] = useTransition();

	if (!user) return null;

	const initialValues = {
		fname: user.firstName ? user.firstName : "NA",
		lname: user.lastName ? user.lastName : "NA",
		c_password: "",
		n_password: "",
	};

	const validationSchema = Yup.object().shape({
		fname: Yup.string().required("First name is required"),
		lname: Yup.string().required("Last name is required"),
		c_password: Yup.string(),
		n_password: Yup.string()
			.matches(/(?=.*[a-z])/, PASSWORD_ERROR)
			.matches(/(?=.*[A-Z])/, PASSWORD_ERROR)
			.matches(/(?=.*[0-9])/, PASSWORD_ERROR)
			.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_ERROR)
			.min(8, PASSWORD_ERROR),
	});

	const handleOnSubmit = useCallback(
		(values: { fname: string; lname: string; c_password: string; n_password: string }) => {
			startTransition(async () => {
				if (!user) return;
				await user.update({
					firstName: values.fname,
					lastName: values.lname,
				});
				if (values.c_password !== "") {
					try {
						await user.updatePassword({
							currentPassword: values.c_password,
							newPassword: values.n_password,
						});
					} catch (err: unknown) {
						let errorMessage: string | undefined = "Something went wrong, please try again later.";
						if (err instanceof Error) {
							errorMessage = err.message;
						} else if (isClerkAPIResponseError(err)) {
							errorMessage = err.errors[0]?.longMessage;
						}
						toast({
							variant: "destructive",
							title: "Couldn't change your password",
							description: errorMessage,
							duration: 4000,
						});
					}
				}
				await user.reload();
			});
		},
		[startTransition]
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="w-full space-y-4">
					<div className="grid gap-2">
						<Label>Primary Email</Label>
						<p className="text-sm">{user.primaryEmailAddress?.emailAddress}</p>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="fname">First Name</Label>
						<Field
							as={Input}
							id="fname"
							name="fname"
							type="text"
							autoComplete="off"
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
							required
						/>
					</div>

					<div className="relative">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true">
							<div className="w-full border-t border-gray-300 dark:border-gray-700" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-white dark:bg-gray-950 px-2 text-sm text-muted-foreground">
								Update Password
							</span>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="c_password">Current Password</Label>
						<div className="relative">
							<Field
								as={Input}
								id="c_password"
								name="c_password"
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
							name="c_password"
							render={(msg: string) => <p className="text-red-600">{msg}</p>}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="n_password">New Password</Label>
						<div className="relative">
							<Field
								as={Input}
								id="n_password"
								name="n_password"
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
							name="n_password"
							render={(msg: string) => <p className="text-red-600">{msg}</p>}
						/>
					</div>
					<Button
						disabled={isLoading}
						className="w-full">
						{isLoading ? (
							<Icons.spinner
								className="animate-spin text-center"
								aria-hidden="true"
							/>
						) : (
							"Save Changes"
						)}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
