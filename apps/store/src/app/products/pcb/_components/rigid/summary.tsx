import PcbPriceSummary from "@/app/products/pcb/_components/common/pcbSum";
import {
	selectCalculatedPrice,
	selectDesignFormat,
	selectPcbQty,
	selectSinglePiecesQty,
	selectTentativeDispatchDate,
} from "@/redux/reducers/rigidPcbSlice";
import { useSelector } from "react-redux";

export default function RigidPcbPriceSummary() {
	const pcbPrice = useSelector(selectCalculatedPrice);
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
