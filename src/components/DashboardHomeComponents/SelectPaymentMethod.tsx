import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import BankTransfer from "./BankTransferMethod";

const SelectPaymentMethod = ({ goBack }: { goBack: () => void }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const handleContinue = () => {
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(<BankTransfer goBack={goBack} />);
    } else if (selectedPaymentMethod == "Paystack") {
      alert("Credit/Debit Card selected");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Fund Wallet</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Select your preferred method of funding your account.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 min-h-[400px] justify-between">
        <div className="flex flex-col gap-2">
          <div
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Bank Transfer"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Bank Transfer")}
          >
            <img
              src="/bank-transfer-icon.svg"
              alt="bank transfer"
              className="h-10 w-10"
            />
            <div>
              <p className="font-adron-mid text-sm">Bank Transfer</p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Bank Transfer"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                From your bank app or internet bank
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Paystack"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Paystack")}
          >
            <img
              src="/paystack-icon.svg"
              alt="paystack"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-adron-mid text-sm">Paystack</p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Paystack"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                Pay through Paystack
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 mt-4">
          <Button
            label="Back"
            className="!w-fit px-12 py-2 text-xs bg-transparent !text-black font-bold"
            onClick={goBack}
          />
          <Button
            label="Continue"
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={handleContinue}
            disabled={!selectedPaymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
