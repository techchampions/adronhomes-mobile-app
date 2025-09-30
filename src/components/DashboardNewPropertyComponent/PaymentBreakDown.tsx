import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useGetPropertyByID } from "../../data/hooks";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";

interface PaymentBreakDownProps {
  paymentType: string;
  paymentDuration: string;
  paymentSchedule: string;
  propertyId: number | string;
}

const PaymentBreakDown: React.FC<PaymentBreakDownProps> = ({
  paymentDuration,
  paymentSchedule,
  paymentType,
  propertyId,
}) => {
  const { data, isError, isLoading } = useGetPropertyByID(propertyId);
  const property = data?.data.properties;
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  console.log("Payment Duration", paymentDuration);
  const price = property?.price ?? 0;
  const iniDepo = property?.initial_deposit ?? 0;
  const initialDeposit =
    paymentType === "One Time" ? property?.price : property?.initial_deposit;
  const remPrice = price - iniDepo;
  const fees = 5000;
  const weeklyAmount =
    paymentSchedule === "Monthly"
      ? remPrice / Number(paymentDuration)
      : paymentSchedule === "Quarterly"
      ? remPrice / (Number(paymentDuration) / 3)
      : 0;
  const totalAmount = (initialDeposit ?? 0) + fees;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl">
      <h4 className="font-semibold mb-4">Payment Breakdown</h4>
      <div className="space-y-4 text-sm">
        <p className="text-black flex justify-between gap-4">
          ₦{initialDeposit?.toLocaleString()}
          <span className="text-xs text-gray-400 text-right">
            {paymentType === "One Time" ? "Full Payment" : "Initial Deposit"}
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦{fees.toLocaleString()}
          <span className="text-xs text-gray-400 text-right">
            Fees & Charges
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦{weeklyAmount.toLocaleString()}
          <span className="text-xs text-gray-400 text-right">
            {paymentSchedule} Amount
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦{totalAmount.toLocaleString()}
          <span className="text-xs text-gray-400 text-right">
            Total Amount to be Paid
          </span>
        </p>
      </div>
      <div className="mt-6 bg-adron-green text-white text-start px-4 md:px-6 py-2 rounded-3xl font-semibold text-lg flex flex-col">
        ₦{totalAmount.toLocaleString()}{" "}
        <span className="text-xs text-white/50">Total</span>
      </div>
      <p className="text-xs text-gray-400 mt-2 flex items-start gap-2">
        <HiOutlineExclamationCircle className="h-10 w-10" />
        The breakdown updates based on your selection. Contact support if you
        have questions.
      </p>
    </div>
  );
};

export default PaymentBreakDown;
