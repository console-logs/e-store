import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import SinglePiecesQtyTip from "@/app/products/pcb/_components/rigid/tips/singlePiecesQtyTip";
import { type ReduxState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function SinglePiecesQuantity() {
  const singlePiecesQty = useSelector(
    (state: ReduxState) => state.rigidPcb.singlePiecesQty,
  );
  const designFormat = useSelector(
    (state: ReduxState) => state.rigidPcb.designFormat,
  );

  return (
    <div hidden={designFormat === "Single PCB" ? true : false}>
      <Label>
        Single Pieces Quantity <SinglePiecesQtyTip />
      </Label>
      <Input
        placeholder="Single Pieces Quntity"
        disabled
        type="number"
        name="SinglePiecesQty"
        autoComplete="off"
        className="w-full"
        required
        value={singlePiecesQty}
      />
    </div>
  );
}
