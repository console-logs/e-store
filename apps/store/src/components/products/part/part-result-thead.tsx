export function PartResultTableHead() {
	return (
		<thead>
			<tr>
				<th
					scope="col"
					className="uppercase py-3.5 pl-4 pr-3 text-left text-xs font-semibold sm:pl-0">
					S.No.
				</th>
				<th
					scope="col"
					className="uppercase py-3.5 pl-4 pr-3 text-left text-xs font-semibold sm:pl-0">
					Part Number
				</th>
				<th
					scope="col"
					className="uppercase hidden px-3 py-3.5 text-left text-xs font-semibold lg:table-cell">
					Description
				</th>
				<th
					scope="col"
					className="uppercase hidden px-3 py-3.5 text-left text-xs font-semibold sm:table-cell">
					Datasheet
				</th>
				<th
					scope="col"
					className="uppercase hidden sm:table-cell px-3 py-3.5 text-left text-xs font-semibold">
					Stock
				</th>
			</tr>
		</thead>
	);
}
