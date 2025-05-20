// import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import PaymentSuccessfull from "../PaymentSuccessfull";
import { RiUpload2Line } from "react-icons/ri";
import { useFundWallet } from "../../data/hooks";
import PaymentPending from "../PaymentPending";

const BankTransfer = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number | null;
}) => {
  const { closeModal, openModal } = useModalStore();
  const { mutate: fundWallet } = useFundWallet();

  const { showToast } = useToastStore();
  const GoToSelectPaymentMethod = () => {
    openModal(<SelectPaymentMethod goBack={goBack} amount={amount} />);
  };
  const handlePaymentSuccess = () => {
    closeModal();
    fundWallet({
      amount: amount || 0,
      payment_method: "bank_transfer",
    });
    // showToast("Payment Recieved Successfully", "success");
    openModal(<PaymentPending text={"Payment is being confirmed by Admin."} />);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Fund Wallet</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Please confirm bank details before making payment.{" "}
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 min-h-[400px] justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-full bg-adron-green rounded-2xl flex gap-3 items-center p-3">
            <img src="/bank-transfer-icon.svg" alt="" className="h-6 w-6" />
            <p className="text-sm text-white">Bank Transfer</p>
          </div>
          <p className="text-sm text-gray-500">
            Transfer{" "}
            <span className="font-bold text-black">
              ₦{amount?.toLocaleString()}
            </span>{" "}
            to the account below to complete your wallet funding.
          </p>
          <div className="flex flex-col w-full gap-4 mt-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <p className="text-sm">8394839302</p>
                <p className="text-xs font-adron-thin text-gray-400">
                  Account Number
                </p>
              </div>
              <CopyButton text="8394839302" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Providus Bank</p>
              <p className="text-xs font-adron-thin text-gray-400">Bank Name</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Bimbo Adeleke</p>
              <p className="text-xs font-adron-thin text-gray-400">
                Account Name
              </p>
            </div>
          </div>
        </div>
        <label className="mt-4">
          <label className="block text-xs">Proof of Payment</label>
          <div className="flex justify-between w-full px-4 py-2 bg-adron-body rounded-3xl items-center">
            <input type="file" name="proof" className="text-xs w-[70%]" />
            <RiUpload2Line className="text-gray-500 h-5 w-5 hover:text-black" />
          </div>
        </label>

        <div className="flex justify-between w-full gap-4 mt-4">
          <Button
            label="Back"
            className="!w-fit px-12 py-2 text-xs bg-transparent !text-black font-bold"
            onClick={GoToSelectPaymentMethod}
          />
          <Button
            label="Done"
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={handlePaymentSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
