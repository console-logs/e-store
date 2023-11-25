import NameTip from "@/app/products/pcb/_components/rigid/tips/nameTip";
import { setPcbName } from "@/redux/reducers/rigidPcbSlice";
import { type ReduxState } from "@/redux/store";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function PcbName() {
  const dispatch = useDispatch();
  const pcbname = useSelector((state: ReduxState) => state.rigidPcb.pcbname);

  return (
    <div>
      <Label>
        PCB Name <NameTip />
      </Label>
      <Input
        placeholder="Enter your PCB name"
        type="text"
        name="pcbname"
        autoComplete="off"
        className="w-full"
        required
        onChange={(e) => dispatch(setPcbName(e.target.value))}
        value={pcbname}
      />
    </div>
  );
}
