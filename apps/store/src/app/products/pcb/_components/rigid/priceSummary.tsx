"use client";
import { type ReduxState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RigidPcbPriceSummary() {
  const pcbPrice = useSelector(
    (state: ReduxState) => state.rigidPcb.calculatedPrice,
  );
  const designFormat = useSelector(
    (state: ReduxState) => state.rigidPcb.designFormat,
  );
  const pcbQty = useSelector((state: ReduxState) => state.rigidPcb.pcbQty);
  const singlePiecesQty = useSelector(
    (state: ReduxState) => state.rigidPcb.singlePiecesQty,
  );
  const tentativeDispatchDate = useSelector(
    (state: ReduxState) => state.rigidPcb.tentativeDispatchDate,
  );

  return (
    <div className="rounded-lg bg-gray-50 px-4 py-6 dark:bg-gray-900 sm:p-6 lg:p-8">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">
        Estimated Price
      </h2>
      <div className="flow-root">
        <dl className="-my-4 divide-y divide-gray-300 text-sm dark:divide-gray-700">
          <div className="flex items-center justify-between py-4">
            <dt>Quantity</dt>
            <dd className="font-medium">
              {designFormat === "Single PCB" ? pcbQty : singlePiecesQty}
            </dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt>Unit Price</dt>
            <dd className="font-medium">
              ₹
              {(
                pcbPrice /
                (designFormat === "Single PCB" ? pcbQty : singlePiecesQty)
              ).toFixed(2)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="">Tentative Lead Time</dt>
            <dd className="font-medium">{tentativeDispatchDate}</dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-base font-medium">Order total</dt>
            <dd className="text-base font-medium">₹{pcbPrice.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
