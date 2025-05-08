import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const PaymentBreakDown = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl">
      <h4 className="font-semibold mb-4">Payment Breakdown</h4>
      <div className="space-y-4 text-sm">
        <p className="text-black flex justify-between gap-4">
          ₦36,000,000
          <span className="text-xs text-gray-400 text-right">
            Initial Deposit
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦5,000
          <span className="text-xs text-gray-400 text-right">
            Fees & Charges
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦5,000,000
          <span className="text-xs text-gray-400 text-right">
            Weakly Amount
          </span>
        </p>
        <p className="text-black flex justify-between gap-4">
          ₦7,500,000
          <span className="text-xs text-gray-400 text-right">
            Amount to be paid after your duration
          </span>
        </p>
      </div>
      <div className="mt-6 bg-adron-green text-white text-start px-4 md:px-6 py-2 rounded-3xl font-semibold text-lg flex flex-col">
        ₦36,000,000 <span className="text-xs text-white/50">Total</span>
      </div>
      <p className="text-xs text-gray-400 mt-2 flex items-start gap-2">
        <HiOutlineExclamationCircle className="h-10 w-10" /> The following is
        the payment breakdown for your first payment. Please contact support if
        you have any questions.
      </p>
    </div>
  );
};

export default PaymentBreakDown;
