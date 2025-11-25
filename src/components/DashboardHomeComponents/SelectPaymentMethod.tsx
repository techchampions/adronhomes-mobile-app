import { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import BankTransfer from "./BankTransferMethod";
import VirtualBankTransfer from "./VirtualBankTransferMethod";
import { usePaystackPayment } from "../../hooks/usePaystackPayment";
import { useUserStore } from "../../zustand/UserStore";
import { useToastStore } from "../../zustand/useToastStore";
import { useFundWallet } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import SmallLoader from "../SmallLoader";
import { useInterswitchPayment } from "../../hooks/useInterswitchPayment";
// import { useInterswitchPayment } from "../../hooks/useInterswitchPyament";

export interface ApiError {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      message?: string;
    };
  };
  message?: string;
}

export type FundWalletResponse = {
  success: boolean;
  message: string;
  merchant_code: string;
  payment_item_id: string;
  reference: string;
  payment: {
    user_id: number;
    property_id: number | null;
    property_plan_id: number | null;
    amount_paid: string;
    reference: string;
    payment_type: "Paystack" | string;
    purpose: "fund" | string;
    proof_of_payment: string | null;
    updated_at: string; // ISO date string
    created_at: string; // ISO date string
    id: number;
  };
};

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
  const interswitch = useInterswitchPayment();
  const { mutate: fundWallet, isPending: isFunding } = useFundWallet();

  const { user } = useUserStore();

  const handleContinue = () => {
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(<BankTransfer goBack={goBack} amount={amount} />);
    } else if (selectedPaymentMethod == "Virtual Bank Transfer") {
      openModal(<VirtualBankTransfer goBack={goBack} amount={amount} />);
    } else if (selectedPaymentMethod == "Paystack") {
      fundWallet(
        {
          amount: amount || 0,
          payment_method: "paystack",
        },
        {
          onSuccess(res) {
            paystack({
              email: user?.email || "",
              amount: Number(amount), // in Naira
              reference: res.payment.reference,
              onSuccess: (ref) => {
                // showToast("Payment successful!", "success");
                console.log("Payment successful!", ref);
                // TODO: call your backend API to confirm payment
              },
              onClose: () => {
                showToast("Payment Canceled", "error");
              },
            });

            closeModal();
          },
          onError: (error: ApiError) => {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong";
            showToast(message, "error");
            openModal(<ApiErrorBlock />);
          },
        }
      );
    } else if (selectedPaymentMethod == "Interswitch") {
      fundWallet(
        {
          amount: amount || 0,
          payment_method: "interswitch",
        },
        {
          onSuccess(res) {
            interswitch({
              email: user?.email || "",
              customerName: `${user?.last_name} ${user?.first_name}`,
              amount: Number(amount), // in Naira
              reference: res.reference,
              merchant_code: res.merchant_code,
              payment_item_id: res.payment_item_id,
              onSuccess: (ref) => {
                // showToast("Payment successful!", "success");
                console.log("Payment successful!", ref);
                // TODO: call your backend API to confirm payment
              },
              onClose: () => {
                showToast("Payment Canceled", "error");
              },
            });

            closeModal();
          },
          onError: (error: ApiError) => {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong";
            showToast(message, "error");
            openModal(<ApiErrorBlock />);
          },
        }
      );
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

          {/* Bank Tranfer */}
          {/* <div
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
          </div> */}

          {/* <div
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
          </div> */}
          <div
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Interswitch"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Interswitch")}
          >
            <div className="bg-adron-green-100 rounded-full h-10 w-10 flex justify-center items-center">
              <img
                src="/Interswitch.svg"
                alt="paystack"
                className="h-7 w-7 rounded-full"
              />
            </div>
            <div>
              <p className="font-adron-mid text-sm">Interswitch</p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Interswitch"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                Pay with Interswitch
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
            label={isFunding ? "Loading" : "Continue"}
            isLoading={isFunding}
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={handleContinue}
            disabled={!selectedPaymentMethod || isFunding}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;