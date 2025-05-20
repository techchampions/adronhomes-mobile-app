import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import BankTransfer from "./BankTransferMethod";
import { FaWallet } from "react-icons/fa";
import { useGetUserWalletdata } from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import { useToastStore } from "../../zustand/useToastStore";

const SelectPaymentMethod = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number;
}) => {
  const { showToast } = useToastStore();
  const { data: userWalletData, isLoading, isError } = useGetUserWalletdata();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { openModal } = useModalStore();
  // const mutation = useModalStore((state) => state.mutate);

  const handleContinue = () => {
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(<BankTransfer goBack={goBack} amount={amount} />);
    } else if (selectedPaymentMethod == "Paystack") {
      alert("Credit/Debit Card selected");
    } else if (selectedPaymentMethod == "Virtual Wallet") {
      if (userWalletData?.wallet_balance || 0 > amount) {
        alert("Virtual Wallet selected");
      } else {
        showToast("Insufficient balance", "error");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Select Payment Method</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Select your preferred method of making payment to your plan.{" "}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-4 min-h-[300px] justify-between">
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
              selectedPaymentMethod === "Virtual Bank Transfer"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Virtual Bank Transfer")}
          >
            <img
              src="/bank-transfer-icon.svg"
              alt="Virtual bank transfer"
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
                Transfer to generated Virtual bank account
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

          <div
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Virtual Wallet"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Virtual Wallet")}
          >
            <div className="p-2 rounded-full bg-white">
              <FaWallet className="h-5 w-5 text-adron-green" />
            </div>
            <div className="flex justify-between flex-1 items-center">
              <div className="flex flex-col ">
                <p className="font-adron-mid text-sm">Virtual Wallet</p>
                <p
                  className={`text-xs ${
                    selectedPaymentMethod == "Virtual Wallet"
                      ? `text-white`
                      : `text-gray-500`
                  } `}
                >
                  Pay With Wallet
                </p>
              </div>
              <div className="">
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-3 h-3 mx-auto text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#79B833"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : isError ? (
                  <p className="text-red-500 text-xs">Error fetching wallet</p>
                ) : (
                  <p
                    className={`text-xs ${
                      selectedPaymentMethod == "Virtual Wallet"
                        ? `text-white`
                        : `text-gray-400`
                    }`}
                  >
                    {userWalletData?.wallet_balance || 0 > amount
                      ? `${formatPrice(userWalletData?.wallet_balance || 0)}`
                      : `Insufficient Balance`}
                  </p>
                )}
                <p
                  className={`text-xs ${
                    selectedPaymentMethod == "Virtual Wallet"
                      ? `text-white`
                      : `text-gray-500`
                  } `}
                >
                  balance
                </p>
              </div>
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
