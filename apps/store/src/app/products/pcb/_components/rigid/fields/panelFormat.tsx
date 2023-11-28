import PanelFormatTip from "@/app/products/pcb/_components/rigid/tips/panelFormatTip";
import { useCalculateRigidPcbPriceMutation } from "@/redux/api/apiSlice";
import {
	selectColumns,
	selectDesignFormat,
	selectRigidPcbMemoized,
	selectRows,
	setColumns,
	setPcbPrice,
	setRows,
	updatePanelSize,
	updateSinglePiecesQty,
} from "@/redux/reducers/rigidPcbSlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PanelFormat() {
	const dispatch = useDispatch();
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const columns = useSelector(selectColumns);
	const rows = useSelector(selectRows);
	const designFormat = useSelector(selectDesignFormat);
	const [calculatePcbPrice] = useCalculateRigidPcbPriceMutation();

	return (
		<div hidden={designFormat === "Single PCB"}>
			<Label>
				Panel Format (Rows x Columns) <PanelFormatTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					required
					min={1}
					max={10}
					type="number"
					name="Rows"
					placeholder="Rows"
					autoComplete="off"
					className="col-span-5"
					value={rows === 0 ? "" : rows}
					onChange={async e => {
						dispatch(setRows(Number(e.target.value)));
						dispatch(updateSinglePiecesQty());
						dispatch(updatePanelSize());
						const price = await calculatePcbPrice(rigidPcb).unwrap();
						dispatch(setPcbPrice(price));
					}}
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					required
					min={1}
					max={10}
					type="number"
					name="Columns"
					placeholder="Columns"
					autoComplete="off"
					className="col-span-5"
					value={columns === 0 ? "" : columns}
					onChange={async e => {
						dispatch(setColumns(Number(e.target.value)));
						dispatch(updateSinglePiecesQty());
						dispatch(updatePanelSize());
						const price = await calculatePcbPrice(rigidPcb).unwrap();
						dispatch(setPcbPrice(price));
					}}
				/>
			</div>
		</div>
	);
}
