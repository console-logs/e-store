export function AddressDisplayCard({ address }: { address: Array<AddressType> }) {
	const savedAddress = address[0]!;

	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-xl font-semibold">{savedAddress.type}</h2>
			</div>

			<div className="space-y-1 my-2">
				<p>
					{savedAddress.firstName} {savedAddress.lastName}
				</p>
				<p>{savedAddress.company}</p>
				<p>{savedAddress.address1}</p>
				<p>{savedAddress.address2}</p>
				<p>{savedAddress.city}</p>
				<p>{savedAddress.state}</p>
				<p>{savedAddress.pincode}</p>
				<p>{savedAddress.phone}</p>
				{savedAddress.type === "Billing Address" ? (
					<>
						<p>{savedAddress.gst}</p>
						<p>{savedAddress.po}</p>
					</>
				) : (
					<>
						<p>{savedAddress.landmark}</p>
						<p>{savedAddress.shippingInstructions}</p>
					</>
				)}
			</div>
		</div>
	);
}
