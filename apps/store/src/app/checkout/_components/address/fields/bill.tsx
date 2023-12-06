import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Field } from "formik";

const fieldProps = [
	{
		label: "First Name",
		type: "text",
		id: "bill_fname",
		name: "bill_fname",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Last Name",
		type: "text",
		id: "bill_lname",
		name: "bill_lname",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Company",
		type: "text",
		id: "bill_company",
		name: "bill_company",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
	{
		label: "Address Line 1",
		type: "text",
		id: "bill_address1",
		name: "bill_address1",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Address Line 2",
		type: "text",
		id: "bill_address2",
		name: "bill_address2",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
	{
		label: "City",
		type: "text",
		id: "bill_city",
		name: "bill_city",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Country",
		type: "text",
		id: "bill_country",
		name: "bill_country",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "State / Province",
		type: "text",
		id: "bill_state",
		name: "bill_state",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Postal code",
		type: "number",
		id: "bill_postalCode",
		name: "bill_postalCode",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Phone",
		type: "number",
		id: "bill_phone",
		name: "bill_phone",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Email",
		type: "email",
		id: "bill_email",
		name: "bill_email",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "GST",
		type: "text",
		id: "bill_gst",
		name: "bill_gst",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
	{
		label: "PO Number",
		type: "text",
		id: "bill_poNumber",
		name: "bill_poNumber",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
];

export default function BillingAddressFields() {
	return (
		<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
			{fieldProps.map((field, index) => (
				<div key={index}>
					<Label htmlFor={field.id}>{field.label}</Label>
					<Field
						as={Input}
						type={field.type}
						id={field.id}
						name={field.name}
						autoComplete={field.autoComplete}
						className={field.className}
						required={field.required}
					/>
				</div>
			))}
		</div>
	);
}
