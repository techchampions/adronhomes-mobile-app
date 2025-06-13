// import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import PaymentSuccessfull from "../PaymentSuccessfull";
import { useFundWallet } from "../../data/hooks";

const VirtualBankTransfer = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number | null;
}) => {
  const { closeModal, openModal } = useModalStore();
  const { mutate: fundWallet, isPending: fundingWallet } = useFundWallet();
  const { showToast } = useToastStore();
  const GoToSelectPaymentMethod = () => {
    openModal(<SelectPaymentMethod goBack={goBack} amount={amount} />);
  };
  const handlePaymentSuccess = () => {
    closeModal();

    showToast("Payment Recieved Successfully", "success");
    fundWallet(
      {
        amount: amount || 0,
        payment_method: "virtual_wallet",
      },
      {
        onSuccess() {
          openModal(
            <PaymentSuccessfull text={"Payment received successfully."} />
          );
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || "Something went wrong";
          showToast(message, "error");
        },
      }
    );
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
            <p className="text-sm text-white">Virtual Bank Transfer</p>
          </div>
          <p className="text-sm text-gray-500">
            Transfer{" "}
            <span className="font-bold text-black">
              ₦{amount?.toLocaleString()}
            </span>{" "}
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
            onClick={handlePaymentSuccess}
            isLoading={fundingWallet}
            disabled={fundingWallet}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualBankTransfer;
