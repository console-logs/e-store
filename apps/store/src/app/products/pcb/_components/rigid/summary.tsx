import PcbPriceSummary from "@/app/products/pcb/_components/common/pcbSum";
import {
	selectDesignFormat,
	selectPcbQty,
	selectRigidPcbMemoized,
	selectSinglePiecesQty,
	selectTentativeDispatchDate,
} from "@/redux/reducers/rigidPcbSlice";
import { api } from "@/trpc/react";
import { useSelector } from "react-redux";

export default function RigidPcbPriceSummary() {
	const rigidPcb = useSelector(selectRigidPcbMemoized);
	const pcbPrice = api.rigidPcb.getPrice.useQuery(rigidPcb).data;
	const designFormat = useSelector(selectDesignFormat);
	const pcbQty = useSelector(selectPcbQty);
	const singlePiecesQty = useSelector(selectSinglePiecesQty);
	const tentativeDispatchDate = useSelector(selectTentativeDispatchDate);

	return (
		<PcbPriceSummary
			pcbPrice={pcbPrice}
			designFormat={designFormat}
			pcbQty={pcbQty}
			singlePiecesQty={singlePiecesQty}
			tentativeDispatchDate={tentativeDispatchDate}
		/>
	);
}
