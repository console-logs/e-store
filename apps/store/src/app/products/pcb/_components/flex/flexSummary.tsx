import PcbPriceSummary from "@/app/products/pcb/_components/common/pcbPriceSummary";
import {
	selectCalculatedPrice,
	selectDesignFormat,
	selectPcbQty,
	selectSinglePiecesQty,
	selectTentativeDispatchDate,
} from "@/redux/reducers/flexPcbSlice";
import { useSelector } from "react-redux";

export default function FlexPcbPriceSummary() {
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
