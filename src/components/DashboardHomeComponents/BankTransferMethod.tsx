import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CopyButton from "../CopyButton";

const BankTransfer = ({ goBack }: { goBack: () => void }) => {
  const { closeModal, openModal } = useModalStore();
  const GoToSelectPaymentMethod = () => {
    openModal(<SelectPaymentMethod goBack={goBack} />);
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
            Transfer <span className="font-bold text-black">₦10,000,000</span>{" "}
            to the account below to complete your wallet funding.
          </p>
          <div className="flex flex-col w-full gap-4 mt-7">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col">
                <p className="text-md">8394839302</p>
                <p className="text-[12px] font-adron-thin text-gray-400">
                  Account Number
                </p>
              </div>
              <CopyButton text="8394839302" />
            </div>
            <div className="flex flex-col">
              <p className="text-md">Providus Bank</p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Bank Name
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-md">Bimbo Adeleke</p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Account Name
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 mt-4">
          <Button
            label="Back"
            className="!w-fit px-12 py-2 text-xs bg-transparent !text-black font-bold"
            onClick={GoToSelectPaymentMethod}
          />
          <Button
            label="Done"
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
