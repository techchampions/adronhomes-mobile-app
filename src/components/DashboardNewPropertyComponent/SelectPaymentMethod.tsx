import { useEffect, useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import BankTransfer from "./BankTransferMethod";
import { FaWallet } from "react-icons/fa";
import {
  useCreatePropertyPlan,
  useGetPropertyByID,
  useGetUserWalletdata,
  usePropertyPlanRepayment,
} from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import { useToastStore } from "../../zustand/useToastStore";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import PaymentSuccessfull from "../PaymentSuccessfull";
import SmallLoader from "../SmallLoader";
import { data, useNavigate, useParams } from "react-router-dom";
import { usePaystackPayment } from "../../hooks/usePaystackPayment";
import { useUserStore } from "../../zustand/UserStore";
import { ApiError } from "../DashboardHomeComponents/SelectPaymentMethod";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { NewPropertyPlanPayload } from "../../data/types/CreatePropertyPayload";

const SelectPaymentMethod = ({
  goBack,
  amount,
  isBuyNow = true,
}: {
  goBack: () => void;
  amount: number;
  isBuyNow?: boolean;
}) => {
  const params = useParams();
  const id = params?.id;
  const { showToast } = useToastStore();
  const { user } = useUserStore();
  const contractDetails = useContractDeatilStore();
  const paystack = usePaystackPayment();
  const { data: userWalletData, isLoading, isError } = useGetUserWalletdata();
  const { data: propertyData, isLoading: gettingProperty } =
    useGetPropertyByID(id);
  const property = propertyData?.data.properties;
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { openModal } = useModalStore();
  const { mutate: makePayment, isPending: isPaying } = useCreatePropertyPlan();
  const { mutate: makeRepayment, isPending: isRepaying } =
    usePropertyPlanRepayment();
  const {
    totalAmount,
    startDate,
    endDate,
    paymentType,
    paymentDuration,
    paymentSchedule,
    propertyId,
    marketerId,
    planId,
    numberOfUnits,
    propertyPurpose,
  } = usePaymentBreakDownStore();
  const walletBalance = userWalletData?.wallet_balance || 0;

  useEffect(() => {
    const check = () => {
      if (totalAmount <= 0) {
        navigate(`/`);
      }
    };

    check();
  }, [navigate, totalAmount]);

  const contractDetailPayload = {
    contract_business_type: contractDetails.contract_business_type,
    contract_subscriber_name_1: contractDetails.contract_subscriber_name_1,
    contract_subscriber_name_2: contractDetails.contract_subscriber_name_2,
    contract_subscriber_name_3: contractDetails.contract_subscriber_name_3,
    contract_additional_name: contractDetails.contract_additional_name,
    contract_marital_status: contractDetails.contract_marital_status,
    contract_gender: contractDetails.contract_gender,
    contract_date_of_birth: contractDetails.contract_date_of_birth,
    contract_nationality: contractDetails.contract_nationality,
    contract_residential_address: contractDetails.contract_residential_address,
    contract_town: contractDetails.contract_town,
    contract_state: contractDetails.contract_state,
    contract_country: contractDetails.contract_country,
    contract_email: contractDetails.contract_email,
    contract_sms: contractDetails.contract_sms,
    contract_employer_address: contractDetails.contract_employer_address,
    contract_occupation: contractDetails.contract_occupation,
    contract_employer: contractDetails.contract_employer,
    contract_next_of_kin_phone: contractDetails.contract_next_of_kin_phone,
    contract_next_of_kin_address: contractDetails.contract_next_of_kin_address,
    contract_next_of_kin: contractDetails.contract_next_of_kin,
    contract_next_of_kin_relationship:
      contractDetails.contract_next_of_kin_relationship,
    contract_profile_picture: contractDetails.contract_profile_picture,
    contract_profile_picture_2: contractDetails.contract_profile_picture2,
    means_of_ids: contractDetails.contract_idFiles,
  };

  const handleContinue = () => {
    let payload = {};
    if (selectedPaymentMethod == "Bank Transfer") {
      openModal(
        <BankTransfer goBack={goBack} amount={amount} isBuyNow={isBuyNow} />
      );
    } else if (selectedPaymentMethod == "Paystack") {
      if (isBuyNow) {
        if (paymentType === "One Time") {
          payload = {
            ...contractDetailPayload,
            payment_method: "paystack",
            payment_type: 1,
            property_id: Number(property?.id),
            paid_amount: totalAmount,
            marketer_code: marketerId,
            number_of_unit: numberOfUnits,
            purpose: propertyPurpose,
          };
        } else {
          payload = {
            ...contractDetailPayload,
            payment_method: "paystack",
            payment_type: 2,
            monthly_duration: Number(paymentDuration),
            property_id: Number(property?.id),
            start_date: startDate,
            end_date: endDate,
            repayment_schedule: paymentSchedule,
            paid_amount: totalAmount,
            marketer_code: marketerId,
            number_of_unit: numberOfUnits,
            purpose: propertyPurpose,
          };
        }
        makePayment(payload, {
          onSuccess: (res) => {
            paystack({
              email: user?.email || "",
              amount: totalAmount, // in Naira
              reference: res.payment.reference,
              onSuccess: (ref) => {
                openModal(
                  <PaymentSuccessfull text="Payment received successfully." />
                );
                navigate(`/dashboard/my-property/${res.plan?.id}`, {
                  replace: true,
                });

                // TODO: call your backend API to confirm payment
              },
              onClose: () => {
                showToast("Payment cancel...Please try again. ", "error");
                navigate(`/dashboard/my-property/${res.plan?.id}`, {
                  replace: true,
                });
              },
            });
          },
          onError: (error: ApiError) => {
            // const message =
            //   error?.response?.data?.message ||
            //   error?.message ||
            //   "Something went wrong";
            // showToast(message, "error");
            showToast("Failed to complete payment", "error");
          },
        });
      } else {
        makeRepayment(
          {
            payment_method: "paystack",
            paid_amount: totalAmount,
            plan_id: Number(planId),
          },
          {
            onSuccess: (res) => {
              paystack({
                email: user?.email || "",
                amount: totalAmount, // in Naira
                reference: "wonder",
                onSuccess: (ref) => {
                  openModal(
                    <PaymentSuccessfull text="Payment received successfully." />
                  );
                  // TODO: call your backend API to confirm payment
                },
                onClose: () => {
                  showToast("Payment popup closed", "error");
                },
              });

              // navigate(`/my-property/${res.plan.id}`);
            },
            onError: (error: ApiError) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
              showToast(message, "error");
            },
          }
        );
      }
    } else if (selectedPaymentMethod == "Virtual Wallet") {
      // Check if payment is to buy property or Recuring payment
      if (isBuyNow) {
        if (userWalletData?.wallet_balance || 0 > amount) {
          if (paymentType === "One Time") {
            payload = {
              ...contractDetailPayload,
              payment_method: "virtual_wallet",
              payment_type: 1,
              property_id: Number(property?.id),
              paid_amount: totalAmount,
              marketer_code: marketerId,
              number_of_unit: numberOfUnits,
              purpose: propertyPurpose,
            };
          } else {
            payload = {
              ...contractDetailPayload,
              payment_method: "virtual_wallet",
              payment_type: 2,
              monthly_duration: Number(paymentDuration),
              property_id: Number(property?.id),
              start_date: startDate,
              end_date: endDate,
              repayment_schedule: paymentSchedule,
              paid_amount: totalAmount,
              marketer_code: marketerId,
              number_of_unit: numberOfUnits,
              purpose: propertyPurpose,
            };
          }
          makePayment(payload, {
            onSuccess: (res) => {
              openModal(
                <PaymentSuccessfull text="Payment received successfully." />
              );
              navigate(`/dashboard/my-property/${res.plan?.id}`, {
                replace: true,
              });
            },
            onError: (error: ApiError) => {
              // const message =
              //   error?.response?.data?.message ||
              //   error?.message ||
              //   "Something went wrong";
              // showToast(message, "error");
              showToast("Failed to complete payment", "error");
            },
          });
        } else {
          showToast("Insufficient balance", "error");
        }
      } else {
        if (userWalletData?.wallet_balance || 0 > amount) {
          makeRepayment(
            {
              payment_method: "virtual_wallet",
              paid_amount: totalAmount,
              plan_id: Number(planId),
            },
            {
              onSuccess: (res) => {
                openModal(
                  <PaymentSuccessfull text="Payment received successfully." />
                );
              },
              onError: (error: ApiError) => {
                const message =
                  error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong";
                showToast(message, "error");
              },
            }
          );
        } else {
          showToast("Insufficient balance", "error");
        }
      }
    }
  };
  if (isPaying || isRepaying) {
    return <SmallLoader />;
  }

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

          {/* Virtual Bank Transfer */}
          {/* <div
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
          </div> */}

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
            isLoading={isPaying || isRepaying}
            className="!w-fit px-12 py-2 text-xs bg-black text-white"
            onClick={handleContinue}
            disabled={
              !selectedPaymentMethod ||
              isPaying ||
              isRepaying ||
              gettingProperty
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;