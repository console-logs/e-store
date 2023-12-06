import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Field } from "formik";

const fieldProps = [
	{
		label: "First Name",
		type: "text",
		id: "ship_fname",
		name: "ship_fname",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Last Name",
		type: "text",
		id: "ship_lname",
		name: "ship_lname",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Company",
		type: "text",
		id: "ship_company",
		name: "ship_company",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
	{
		label: "Address Line 1",
		type: "text",
		id: "ship_address1",
		name: "ship_address1",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Address Line 2",
		type: "text",
		id: "ship_address2",
		name: "ship_address2",
		autoComplete: "off",
		className: "w-full",
		required: false,
	},
	{
		label: "City",
		type: "text",
		id: "ship_city",
		name: "ship_city",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Country",
		type: "text",
		id: "ship_country",
		name: "ship_country",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "State / Province",
		type: "text",
		id: "ship_state",
		name: "ship_state",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Postal code",
		type: "number",
		id: "ship_postalCode",
		name: "ship_postalCode",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Phone",
		type: "number",
		id: "ship_phone",
		name: "ship_phone",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
	{
		label: "Email",
		type: "email",
		id: "ship_email",
		name: "ship_email",
		autoComplete: "off",
		className: "w-full",
		required: true,
	},
];

export default function ShippingAddressFields() {
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
