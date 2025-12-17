import { useEffect, useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import { FaWallet } from "react-icons/fa";
import {
  useCreatePropertyPlan,
  useGenerateNewRef,
  useGetUserWalletdata,
  useMakePropertyPlanPendingPayment,
  usePropertyPlanRepayment,
} from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import { useToastStore } from "../../zustand/useToastStore";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import PaymentSuccessfull from "../PaymentSuccessfull";
import SmallLoader from "../SmallLoader";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "../../hooks/usePaystackPayment";
import { useUserStore } from "../../zustand/UserStore";
import { ApiError } from "../DashboardHomeComponents/SelectPaymentMethod";
import BankTransfer from "./BankTransferMethod";
import { Info } from "lucide-react";
import { useInterswitchPayment } from "../../hooks/useInterswitchPayment";
// import { useInterswitchPayment } from "../../hooks/useInterswitchPyament";

const SelectPaymentMethod = ({
  goBack,
  amount,
  payment_type,
  user_property_id,
  payment_id,
  subscription_form,
}: {
  goBack: () => void;
  amount: number;
  payment_type?: number;
  user_property_id: number;
  payment_id: number;
  subscription_form?: number;
}) => {
  const { showToast } = useToastStore();
  const { user } = useUserStore();
  const paystack = usePaystackPayment();
  const interswitch = useInterswitchPayment();
  const { data: userWalletData, isLoading, isError } = useGetUserWalletdata();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { data, isLoading: gettingNewRef } = useGenerateNewRef(payment_id);
  const { openModal } = useModalStore();
  const { mutate: makePayment, isPending: isPaying } =
    useMakePropertyPlanPendingPayment();
  // const {
  //   totalAmount,
  //   startDate,
  //   endDate,
  //   paymentType,
  //   paymentDuration,
  //   paymentSchedule,
  //   propertyId,
  //   marketerId,
  //   planId,
  //   numberOfUnits,
  // } = usePaymentBreakDownStore();
  const walletBalance = userWalletData?.wallet_balance || 0;
  let payload = {
    user_property_id: user_property_id,
    payment_type: payment_type,
    payment_method: "",
  };

  const handleContinue = () => {
    if (gettingNewRef) {
      return <SmallLoader />;
    }
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(
        <BankTransfer
          goBack={goBack}
          amount={amount}
          payment_type={payment_type}
          user_property_id={user_property_id}
        />
      );
    } else if (selectedPaymentMethod == "Paystack" && data?.payment.reference) {
      paystack({
        email: user?.email || "",
        amount: amount, // in Naira
        reference: data?.payment.reference,
        onSuccess: (ref) => {
          payload = {
            payment_type: payment_type,
            user_property_id: user_property_id,
            payment_method: "paystack",
          };
          makePayment(payload, {
            onSuccess: (res) => {
              openModal(
                <PaymentSuccessfull text="Payment received successfully." />
              );

              navigate(`/dashboard/my-property/${res.plan?.id}`);
            },
            onError: (error: ApiError) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
              showToast(message, "error");
            },
          });
        },
        onClose: () => {
          showToast("Payment popup closed", "error");
        },
      });
    } else if (
      selectedPaymentMethod == "Interswitch" &&
      data?.payment.reference
    ) {
      interswitch({
        email: user?.email || "",
        customerName: `${user?.last_name} ${user?.first_name}`,
        amount: Number(amount), // in Naira
        reference: data.payment.reference,
        merchant_code: data.merchant_code,
        payment_item_id: data.payable_code,
        onSuccess: (ref) => {
          payload = {
            payment_type: payment_type,
            user_property_id: user_property_id,
            payment_method: "interswitch",
          };
          makePayment(payload, {
            onSuccess: (res) => {
              openModal(
                <PaymentSuccessfull text="Payment received successfully." />
              );

              navigate(`/dashboard/my-property/${res.plan?.id}`);
            },
            onError: (error: ApiError) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
              showToast(message, "error");
            },
          });
        },
        onClose: () => {
          showToast("Payment cancel...Please try again. ", "error");
        },
      });
    } else if (selectedPaymentMethod == "Virtual Wallet") {
      // Check if payment is to buy property or Recuring payment
      payload = {
        payment_method: "virtual_wallet",
        payment_type: payment_type,
        user_property_id: user_property_id,
      };
      makePayment(payload, {
        onSuccess: (res) => {
          openModal(
            <PaymentSuccessfull text="Payment received successfully." />
          );
          navigate(`/my-property/${res.plan?.id}`);
        },
        onError: (error: ApiError) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          showToast(message, "error");
        },
      });
    }
  };
  if (isPaying) {
    return <SmallLoader />;
  }

  return (
    <div className="flex flex-col min-w-sm">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Select Payment Method</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Select your preferred payment method for your plan{" "}
          {/* <b className="text-black">({formatPrice(amount)})</b>. */}
        </p>
        <div className="border border-gray-200 rounded-lg p-2 text-xs text-gray-700 mt-2 divide divide-y-1 divide-gray-200">
          <div className="flex items-center justify-between py-[2px] px-2">
            <div className="">Subscription form:</div>
            <div className="">{formatPrice(subscription_form || 0)}</div>
          </div>
          <div className="flex items-center justify-between py-[2px] px-2">
            <div className="">Initial deposit:</div>
            <div className="">
              {formatPrice(amount - (subscription_form || 0))}
            </div>
          </div>
          <div className="flex justify-end font-bold text-sm items-end pt-1 px-2">
            <div className="flex items-center gap-2 ">
              <div className="">Total:</div>
              <div className="">{formatPrice(amount)}</div>
            </div>
          </div>
        </div>
        {/* <div className="mt-2 flex items-center text-gray-500 gap-1">
          <Info size={16} />
          <div className="text-xs">
            You are paying a total of{" "}
            <b className="text-black text-sm">({formatPrice(amount)})</b>.
          </div>
        </div> */}
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

          {/* PAYSTACK METHOD */}

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
          </div>  */}

          <div
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Interswitch"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Interswitch")}
          >
            <img
              src="/Interswitch.svg"
              alt="Interswitch"
              className="h-10 w-10 rounded-full bg-white p-2"
            />
            <div>
              <p className="font-adron-mid text-sm">Interswitch</p>
              <p
                className={`text-xs ${
                  selectedPaymentMethod == "Interswitch"
                    ? `text-white`
                    : `text-gray-500`
                } `}
              >
                Pay through Interswitch
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
            <div className="p-2 rounded-full bg-adron-green-100">
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
                    {formatPrice(userWalletData?.wallet_balance || 0)}
                  </p>
                )}
                <p
                  className={`text-xs ${
                    selectedPaymentMethod == "Virtual Wallet"
                      ? `text-white`
                      : `text-gray-500`
                  } `}
                >
                  {walletBalance > amount
                    ? `Available Balance`
                    : `Insufficient Balance`}
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
            isLoading={isPaying}
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={handleContinue}
            disabled={!selectedPaymentMethod || isPaying}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;