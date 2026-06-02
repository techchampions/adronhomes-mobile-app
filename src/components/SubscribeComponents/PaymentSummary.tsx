import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { formatPrice } from "../../data/utils";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import PropertySpecifications from "./PropertySpecifications";
import PropertyTerms from "./PropertyTerms";

interface Props {
  property?: Property;
}
const PaymentSummary: React.FC<Props> = ({ property }) => {
  const {
    purpose,
    payment_duration,
    payment_schedule,
    payable_amount,
    initial_deposit,
    payment_plan,
    units,
    land_size,
    setSubscribeFormData,
  } = useSubscribeFormData();
  console.log("plan", payment_plan);
  const modal = useModalStore();
  const feesList = property?.details || [];
  const otherFeesData = feesList.filter(
    (item) => item.type === "others" && item.purpose === purpose
  );
  const infrastructureData = feesList.filter(
    (item) => item.type === "infrastructure" && item.purpose === purpose
  );

  const otherFees =
    otherFeesData.reduce((sum, detail) => sum + detail.value, 0) ?? 0;
  const infrastructureFees =
    infrastructureData.reduce((sum, detail) => sum + detail.value, 0) ?? 0;
  let remPrice = property?.price;
  if (remPrice != Number(payable_amount)) {
    remPrice = (property?.price || 0) - Number(payable_amount);
  }
  console.log("rem", property?.price);
  const scheduledPaymentAmount =
    payment_schedule === "monthly"
      ? remPrice / Number(payment_duration || 1)
      : payment_schedule === "quarterly"
      ? remPrice / (Number(payment_duration || 1) / 3)
      : 0;
  const totalAmount =
    payment_plan === "Installment"
      ? (property?.initial_deposit || 0) * units + +Number(payable_amount)
      : Number(payable_amount) * units;
  const goBack = () => {
    modal.openModal(<PropertySpecifications property={property} />);
  };
  const propertySize =
    property?.land_sizes?.find(
      (size) => Number(size.id) === Number(land_size)
    ) || null;
  const propertyDuration =
    propertySize?.durations.find(
      (duration) => Number(duration.duration) === Number(payment_duration)
    ) || null;
  console.log(scheduledPaymentAmount);
  return (
    <div className=" max-w-md space-y-5">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <h4 className="text-2xl font-bold mt-7">Payment Summary</h4>

      <div className="">
        <div className="divide divide-y-1 space-y-2 divide-gray-300">
          <div className="grid grid-cols-2 ">
            <div className="text-gray-700">
              Price for {propertySize?.size} {propertySize?.measurement_unit}:
            </div>
            <div className="text-right">
              {formatPrice(Number(propertyDuration?.price))} x{" "}
              <span className="text-xs bg-gray-200 text-gray-700 px-2 rounded-sm">
                {units} units
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="text-gray-700">Infrastructure Fee:</div>
            <div className="text-right">
              {formatPrice(Number(infrastructureFees))} x{" "}
              <span className="text-xs bg-gray-200 text-gray-700 px-2 rounded-sm">
                {units} units
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="text-gray-700">Other Fees:</div>
            <div className="text-right">
              {formatPrice(Number(otherFees))} x{" "}
              <span className="text-xs bg-gray-200 text-gray-700 px-2 rounded-sm">
                {units} units
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 ">
            <div className="text-gray-700">Subscription form:</div>
            <div className="text-right">
              {formatPrice(property?.initial_deposit || 0)} x{" "}
              <span className="text-xs bg-gray-200 text-gray-700 px-2 rounded-sm">
                {units} units
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="text-gray-700">Initial Deposit:</div>
            <div className="text-right">
              {formatPrice(Number(initial_deposit))}
            </div>
            {/* <div className="text-sm col-span-2">
            After initial deposit you will be paying{" "}
            <u className="text-adron-green font-bold">
              {formatPrice(scheduledPaymentAmount)}
            </u>{" "}
            for {payment_duration} month(s){" "}
            {Number(payment_duration) > 1 ? payment_schedule : ""}.
          </div> */}
          </div>
        </div>

        <div className="mt-6 bg-adron-black text-white text-start px-4 md:px-6 py-2 rounded-xl font-semibold flex flex-col">
          <div className="text-xl">{formatPrice(Number(totalAmount))}</div>
          <span className=" text-white/70">Total Payable.</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
          <Info className="h-5 w-5" />
          You can go package to select a preferred and conformtable payment
          plan.
        </p>
      </div>
      <div className="flex justify-between w-full gap-2 mt-4">
        <Button
          label="Back"
          icon={<ArrowLeft />}
          className="bg-gray-800 rounded-lg hidden sm:flex"
          onClick={goBack}
        />

        <Button
          label="Proceed"
          className="bg-adron-green rounded-lg"
          onClick={() => {
            setSubscribeFormData({
              total_amount: Number(totalAmount),
            });
            modal.openModal(<PropertyTerms property={property} />);
          }}
          rightIcon={<ArrowRight />}
        />
      </div>
    </div>
  );
};

export default PaymentSummary;
