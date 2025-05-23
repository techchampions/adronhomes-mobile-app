import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import BankTransfer from "./BankTransferMethod";
import VirtualBankTransfer from "./VirtualBankTransferMethod";
import { usePaystackPayment } from "../../hooks/usePaystackPayment";
import { useUserStore } from "../../zustand/UserStore";
import { useToastStore } from "../../zustand/useToastStore";
import { useFundWallet } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";

const SelectPaymentMethod = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number | null;
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const paystack = usePaystackPayment();
  const { mutate: fundWallet } = useFundWallet();

  const { user } = useUserStore();

  const handleContinue = () => {
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(<BankTransfer goBack={goBack} amount={amount} />);
    } else if (selectedPaymentMethod == "Virtual Bank Transfer") {
      openModal(<VirtualBankTransfer goBack={goBack} amount={amount} />);
    } else if (selectedPaymentMethod == "Paystack") {
      paystack({
        email: user?.email || "",
        amount: amount, // in Naira
        onSuccess: (ref) => {
          fundWallet(
            {
              amount: amount || 0,
              payment_method: "paystack",
            },
            {
              onSuccess() {
                showToast("Payment successful!", "success");
                closeModal();
              },
              onError: (error: any) => {
                const message =
                  error?.response?.data?.message || "Something went wrong";
                showToast(message, "error");
                openModal(<ApiErrorBlock />);
              },
            }
          );

          console.log("Payment successful!", ref);
          // TODO: call your backend API to confirm payment
        },
        onClose: () => {
          showToast("Payment Canceled", "error");
        },
      });
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
              selectedPaymentMethod === "Virtual Bank Transfer"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Virtual Bank Transfer")}
          >
            <img
              src="/bank-transfer-icon.svg"
              alt="bank transfer"
              className="h-10 w-10"
            />
            <div>
              <p className="font-adron-mid text-sm">Virtual Bank Transfer</p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Virtual Bank Transfer"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                Wallet will be funded instantly
              </p>
            </div>
          </div>
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
              <p className="font-adron-mid text-sm">
                Bank Transfer to Adron Homes
              </p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Bank Transfer"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                payment will be confrimed within 24 hours.
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
