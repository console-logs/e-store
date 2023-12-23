export function AddressDisplayCard({ address }: { address: AddressType }) {
	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-xl font-semibold">{address.type}</h2>
			</div>

			<div className="space-y-1 my-2">
				<p>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.company}</p>
				<p>{address.address1}</p>
				<p>{address.address2}</p>
				<p>{address.city}</p>
				<p>{address.state}</p>
				<p>{address.pincode}</p>
				<p>{address.phone}</p>
				{address.type === "Billing Address" ? (
					<>
						<p>{address.gst}</p>
						<p>{address.po}</p>
					</>
				) : (
					<>
						<p>{address.landmark}</p>
						<p>{address.shippingInstructions}</p>
					</>
				)}
			</div>
		</div>
	);
}
