"use client";
import { updatePartQtyAction } from "@/actions";
import { updatePartQtySchema } from "@/schema/yup";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTransition } from "react";

export default function UpdatePartQtyForm(props: { part: PartDataType }) {
	const [isLoading, startTransition] = useTransition();
	const { part } = props;
	const { Name, OrderedQty, Availability, Min } = part;

	const initialValues = {
		orderQty: OrderedQty,
	};

	const minOrderQty = parseInt(Min, 10);
	const maxOrderQty = parseInt(Availability, 10);

	function handleOnSubmit(values: { orderQty: number }) {
		startTransition(async () => {
			await updatePartQtyAction(Name, values.orderQty);
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={updatePartQtySchema(minOrderQty, maxOrderQty)}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form>
					<div className="flex items-center space-x-2">
						<Field
							as={Input}
							type="number"
							name="orderQty"
							className="py-1"
							placeholder="Enter Quantity"
						/>
						<Button
							disabled={isLoading}
							size={"sm"}
							type="submit">
							{isLoading ? (
								<Icons.spinner
									className="animate-spin text-center"
									aria-hidden="true"
								/>
							) : (
								"Update"
							)}
						</Button>
					</div>
					<ErrorMessage
						name="orderQty"
						render={(msg: string) => <p className="text-red-600">{msg}</p>}
					/>
				</Form>
			)}
		</Formik>
	);
}
