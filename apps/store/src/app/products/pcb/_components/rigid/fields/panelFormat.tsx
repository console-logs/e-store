import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import PanelFormatTip from "@/app/products/pcb/_components/rigid/tips/panelFormatTip";
import { useCalculatePcbPriceMutation } from "@/redux/api/apiSlice";
import {
  setColumns,
  setPcbPrice,
  setRows,
  updatePanelSize,
  updateSinglePiecesQty,
} from "@/redux/reducers/rigidPcbSlice";
import { type ReduxState, reduxStore } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function PanelFormat() {
  const dispatch = useDispatch();
  const columns = useSelector((state: ReduxState) => state.rigidPcb.columns);
  const rows = useSelector((state: ReduxState) => state.rigidPcb.rows);
  const designFormat = useSelector(
    (state: ReduxState) => state.rigidPcb.designFormat,
  );
  const [calculatePcbPrice] = useCalculatePcbPriceMutation();

  return (
    <div hidden={designFormat === "Single PCB" ? true : false}>
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
          onChange={async (e) => {
            dispatch(setRows(Number(e.target.value)));
            dispatch(updateSinglePiecesQty());
            dispatch(updatePanelSize());
            const price = await calculatePcbPrice(
              reduxStore.getState().rigidPcb,
            ).unwrap();
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
          onChange={async (e) => {
            dispatch(setColumns(Number(e.target.value)));
            dispatch(updateSinglePiecesQty());
            dispatch(updatePanelSize());
            const price = await calculatePcbPrice(
              reduxStore.getState().rigidPcb,
            ).unwrap();
            dispatch(setPcbPrice(price));
          }}
        />
      </div>
    </div>
  );
}
