"use client";
import { addItemToCartAction } from "@/actions";
import { partOrderSchema } from "@/schema/yup";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useToast } from "@shared/components/ui/use-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useTransition } from "react";

export default function PartOrderForm({ partData }: { partData: PartDataType }) {
	const { Min, Availability, Name } = partData;
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();

	const initialValues = {
		orderQty: Min,
	};

	const minOrderQty = parseInt(Min, 10);
	const maxOrderQty = parseInt(Availability, 10);

	const handleOnSubmit = useCallback(
		(values: { orderQty: string }) => {
			startTransition(async () => {
				if (!partData) {
					toast({
						variant: "destructive",
						title: "Failed to add to cart",
						description: "We were not able to add the component to your cart",
						duration: 4000,
					});
					return;
				}
				const basketQty = parseInt(values.orderQty, 10);
				const cartItem: PartDataType = { ...partData, OrderedQty: basketQty };
				await addItemToCartAction(cartItem);
				toast({
					variant: "default",
					title: "Added to cart",
					description: `We've added ${Name} to your cart`,
					duration: 4000,
				});
			});
		},
		[startTransition]
	);

	return (
		<div className="mt-4 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
			<section aria-labelledby="options-heading">
				<h2
					id="options-heading"
					className="sr-only">
					Product options
				</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={partOrderSchema(minOrderQty, maxOrderQty)}
					onSubmit={handleOnSubmit}>
					{({}) => (
						<Form>
							<div>
								<label
									htmlFor="orderQty"
									className="block text-sm font-medium leading-6">
									Enter Quantity:
								</label>
								<div className="relative mt-2 rounded-md">
									<Field
										as={Input}
										type="number"
										id="orderQty"
										name="orderQty"
										placeholder="Enter quantity"
										className="w-48"
										required
									/>
									<ErrorMessage
										name="orderQty"
										render={(msg: string) => <p className="text-red-600">{msg}</p>}
									/>
								</div>
							</div>
							<div className="mt-10">
								<Button
									disabled={isLoading || Availability === "None" || Availability === "On Order"}
									type="submit"
									className="w-full">
									{isLoading ? (
										<Icons.spinner
											className="animate-spin text-center"
											aria-hidden="true"
										/>
									) : (
										"Add to Shopping Cart"
									)}
								</Button>
								<p
									className="text-red-600"
									hidden={Availability.includes("In Stock")}>
									This part is currently out of stock.
								</p>
							</div>
						</Form>
					)}
				</Formik>
			</section>
		</div>
	);
}
