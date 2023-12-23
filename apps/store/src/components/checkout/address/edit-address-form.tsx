"use client";
import { addAddressesAction } from "@/actions";
import { BillingAddressFields } from "@/components/checkout/address/billing-address-fields";
import ShippingAddressFields from "@/components/checkout/address/shipping-address-fields";
import { REVIEW_ORDER_PAGE } from "@/lib/routes";
import { addressSchema } from "@/schema/yup";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export function EditAddressForm() {
	const router = useRouter();
	const [isSameAddress, setIsSameAddress] = useState<boolean>(true);
	const [isLoading, startTransition] = useTransition();
	const [billShipMatch, setBillShipMatch] = useState<boolean>(true);

	const initialValues = {
		bill_fname: "",
		bill_lname: "",
		bill_company: "",
		bill_address1: "",
		bill_address2: "",
		bill_city: "",
		bill_state: "",
		bill_country: "India",
		bill_postalCode: "",
		bill_email: "",
		bill_phone: "",
		bill_gst: "",
		bill_poNumber: "",

		bill_ship_match: true,

		ship_fname: "",
		ship_lname: "",
		ship_company: "",
		ship_address1: "",
		ship_address2: "",
		ship_city: "",
		ship_state: "",
		ship_country: "India",
		ship_postalCode: "",
		ship_email: "",
		ship_phone: "",
	};

	const handleOnSubmit = useCallback(
		(values: typeof initialValues) => {
			const {
				bill_fname,
				bill_lname,
				bill_email,
				bill_phone,
				bill_address1,
				bill_address2,
				bill_city,
				bill_state,
				bill_postalCode,
				bill_company,
				bill_country,
				bill_gst,
				bill_poNumber,
				ship_fname,
				ship_lname,
				ship_email,
				ship_phone,
				ship_address1,
				ship_address2,
				ship_city,
				ship_state,
				ship_postalCode,
				ship_company,
				ship_country,
			} = values;
			startTransition(async () => {
				const billingAddress: AddressType = {
					type: "Billing Address",
					firstName: bill_fname,
					lastName: bill_lname,
					email: bill_email,
					phone: bill_phone,
					address1: bill_address1,
					address2: bill_address2,
					city: bill_city,
					state: bill_state,
					pincode: bill_postalCode,
					company: bill_company,
					gst: bill_gst,
					po: bill_poNumber,
					country: bill_country,
				};
				const shippingAddress: AddressType = {
					type: "Shipping Address",
					firstName: isSameAddress ? bill_fname : ship_fname,
					lastName: isSameAddress ? bill_lname : ship_lname,
					email: isSameAddress ? bill_email : ship_email,
					phone: isSameAddress ? bill_phone : ship_phone,
					address1: isSameAddress ? bill_address1 : ship_address1,
					address2: isSameAddress ? bill_address2 : ship_address2,
					city: isSameAddress ? bill_city : ship_city,
					state: isSameAddress ? bill_state : ship_state,
					pincode: isSameAddress ? bill_postalCode : ship_postalCode,
					company: isSameAddress ? bill_company : ship_company,
					country: isSameAddress ? bill_country : ship_country,
					landmark: "",
					shippingInstructions: "",
				};
				try {
					await addAddressesAction({ billingAddress, shippingAddress });
					router.push(REVIEW_ORDER_PAGE);
				} catch (error) {
					const unknownError = "Something went wrong, please try again later.";
					const errorMessage = error instanceof Error ? error.message : unknownError;
					throw new Error(errorMessage);
				}
			});
		},
		[startTransition, router, isSameAddress]
	);

	useEffect(() => {
		setIsSameAddress(billShipMatch);
	}, [billShipMatch]);

	return (
		<div>
			<h1 className="text-3xl font-bold tracking-tight">Enter your details</h1>
			<div className="space-y-10 mt-8">
				<Formik
					initialValues={initialValues}
					validationSchema={addressSchema(isSameAddress)}
					onSubmit={handleOnSubmit}>
					{({}) => (
						<Form>
							<div className="mt-10">
								<h2 className="text-lg font-medium">Billing Information</h2>
								<BillingAddressFields />
							</div>
							<div className="mt-6 flex items-center">
								<Input
									type="checkbox"
									defaultChecked
									name="bill_ship_match"
									className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-gray-950"
									onChange={e => setBillShipMatch(e.target.checked)}
								/>
								<div className="ml-2">
									<Label className="text-sm font-medium">
										Shipping information is same as billing information
									</Label>
								</div>
							</div>
							{!isSameAddress && (
								<div className="mt-10">
									<h2 className="text-lg font-medium">Shipping Information</h2>
									<ShippingAddressFields />
								</div>
							)}
							<Button
								className="mt-8 w-full"
								disabled={isLoading}
								type="submit">
								{isLoading ? (
									<Icons.spinner
										className="animate-spin text-center"
										aria-hidden="true"
									/>
								) : (
									"Review Order"
								)}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
