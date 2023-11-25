import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import ViaHolesTip from "@/app/products/pcb/_components/rigid/tips/viaHolesTip";
import { useCalculateRigidPcbPriceMutation } from "@/redux/api/apiSlice";
import { setPcbPrice, setViaHoles } from "@/redux/reducers/rigidPcbSlice";
import { type ReduxState, reduxStore } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function ViaHoles() {
  const dispatch = useDispatch();
  const viaHoles = useSelector((state: ReduxState) => state.rigidPcb.viaHoles);
  const baseMaterial = useSelector(
    (state: ReduxState) => state.rigidPcb.baseMaterial,
  );
  const [calculatePcbPrice] = useCalculateRigidPcbPriceMutation();

  return (
    <div hidden={baseMaterial === "Aluminum" || baseMaterial === "CopperCore"}>
      <Label>
        Via Holes <ViaHolesTip />
      </Label>
      <Input
        placeholder="Enter number of Via Holes"
        type="number"
        name="ViaHoles"
        autoComplete="off"
        className="w-full"
        required
        onChange={async (e) => {
          dispatch(setViaHoles(Number(e.target.value)));
          const price = await calculatePcbPrice(
            reduxStore.getState().rigidPcb,
          ).unwrap();
          dispatch(setPcbPrice(price));
        }}
        value={viaHoles}
      />
    </div>
  );
}
