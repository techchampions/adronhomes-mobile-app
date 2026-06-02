import { ArrowLeft, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserWalletdata } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { formatPrice } from "../../data/utils";
import { useBuyProperty } from "../../hooks/useBuyProperty";
import { useInterswitchPayment } from "../../hooks/useInterswitchPayment";
import { usePaystackPayment } from "../../hooks/usePaystackPayment";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import BankTransferModal from "./BankTransferModal";
import PaymentStatus from "./PaymentStatus";
import PropertyTerms from "./PropertyTerms";
import StartingPayment from "./StartingPayment";
import SubscriptionSuccess from "./SubscriptionSuccess";

interface Props {
  property?: Property;
}
const SelectPaymentMethod: React.FC<Props> = ({ property }) => {
  const { data: userWalletData, isLoading, isError } = useGetUserWalletdata();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { openModal } = useModalStore();
  const {
    contract_email,
    contract_business_type,
    contract_business_type_code,
    contract_marital_status,
    contract_marital_status_code,
    contract_gender,
    contract_gender_code,
    contract_date_of_birth,
    start_date,
    end_date,
    contract_title,
    contract_nationality,
    contract_next_of_kin,
    contract_next_of_kin_relationship,
    contract_next_of_kin_address,
    contract_residential_address,
    contract_subscriber_name_1,
    contract_subscriber_name_2,
    contract_subscriber_name_3,
    total_amount,
    marketID,
    payment_type,
    payment_duration,
    payment_schedule,
    units,
    purpose,
    contract_purpose,
    contract_purpose_code,
    contract_town,
    contract_state,
    contract_country,
    contract_country_code,
    contract_occupation,
    contract_employer,
    contract_sms,
    contract_employer_address,
    contract_next_of_kin_phone,
    contract_profile_picture,
    contract_profile_picture2,
    means_of_ids,
    land_size,
    citta_id,
  } = useSubscribeFormData();
  const paystack = usePaystackPayment();
  const interswitch = useInterswitchPayment();
  const { mutate: subscribe, isPending } = useBuyProperty();
  const handleContinue = () => {
    interface PaymentResponse {
      success: boolean;
      message: string;
      payment_method: string;
      reference: string;
      payable_code: string;
      merchant_code: string;
    }
    const payload: BuyPropertyPayload = {
      marketer_code: marketID,
      citta_id: citta_id,
      contract_business_type: contract_business_type,
      contract_business_type_code: contract_business_type_code,
      contract_subscriber_name_1: contract_subscriber_name_1,
      contract_subscriber_name_2: contract_subscriber_name_2,
      contract_subscriber_name_3: contract_subscriber_name_3,
      // contract_additional_name: contract_additional_name,
      contract_title: contract_title,
      contract_marital_status: contract_marital_status,
      contract_marital_status_code: contract_marital_status_code,
      contract_gender: contract_gender,
      contract_gender_code: contract_gender_code,
      contract_date_of_birth: contract_date_of_birth,
      contract_nationality: contract_nationality,
      contract_residential_address: contract_residential_address,
      contract_town: contract_town,
      contract_state: contract_state,
      contract_country: contract_country,
      contract_country_code: contract_country_code,
      contract_email: contract_email,
      contract_sms: contract_sms,
      contract_employer_address: contract_employer_address,
      contract_occupation: contract_occupation,
      contract_employer: contract_employer,
      contract_next_of_kin_phone: contract_next_of_kin_phone,
      contract_next_of_kin_address: contract_next_of_kin_address,

      contract_next_of_kin: contract_next_of_kin,
      contract_next_of_kin_relationship: contract_next_of_kin_relationship,
      contract_profile_picture: contract_profile_picture,
      contract_profile_picture2: contract_profile_picture2,
      contract_id_files: means_of_ids,
      means_of_ids: means_of_ids,
      payment_method:
        selectedPaymentMethod == "Bank Transfer"
          ? "bank_transfer"
          : selectedPaymentMethod?.toLowerCase() || "",
      payment_type: payment_type == "One Time" ? 1 : 2,
      monthly_duration: String(payment_duration),
      property_id: String(property?.id),
      start_date: start_date,
      end_date: end_date,
      repayment_schedule: String(payment_schedule),
      paid_amount: total_amount,
      payable_amount: total_amount,
      number_of_unit: units,
      purpose: purpose,
      contract_purpose: contract_purpose,
      contract_purpose_name: contract_purpose,
      contract_purpose_code: contract_purpose_code,
      land_size: String(land_size),
      contract_employer_phone: "",
      reference: "",
    };
    const guestPayload: GuestSubscribePayload = {
      marketID: marketID,
      contract_business_type: contract_business_type,
      contract_subscriber_name_1: contract_subscriber_name_1,
      contract_subscriber_name_2: contract_subscriber_name_2,
      contract_subscriber_name_3: contract_subscriber_name_3,
      // contract_additional_name: contract_additional_name,
      contract_marital_status: contract_marital_status,
      contract_gender: contract_gender,
      contract_date_of_birth: contract_date_of_birth,
      contract_nationality: contract_nationality,
      contract_residential_address: contract_residential_address,
      contract_town: contract_town,
      contract_state: contract_state,
      contract_country: contract_country,
      contract_email: contract_email,
      contract_sms: contract_sms,
      contract_employer_address: contract_employer_address,
      contract_occupation: contract_occupation,
      contract_employer: contract_employer,
      contract_next_of_kin_phone: contract_next_of_kin_phone,
      // contract_next_of_kin_address: contract_next_of_kin_address,
      contract_next_of_kin_name: contract_next_of_kin,
      contract_next_of_kin_relationship: contract_next_of_kin_relationship,
      contract_profile_picture: contract_profile_picture,
      contract_profile_picture2: contract_profile_picture2,
      contract_id_files: means_of_ids,
      payment_method: "interswitch",
      payment_type: payment_type == "One Time" ? 1 : 2,
      payment_duration: String(payment_duration),
      property_id: String(property?.id),
      start_date: start_date,
      end_date: end_date,
      payment_schedule: String(payment_schedule),
      paid_amount: total_amount,
      payable_amount: total_amount,
      number_of_unit: units,
      property_purpose: purpose,
      contract_purpose: contract_purpose,
      land_size: String(land_size),
      contract_employer_phone: "",
      reference: "",
    };

    if (selectedPaymentMethod == "Interswitch") {
      subscribe(payload, {
        onSuccess(data) {
          interswitch({
            email: contract_email || "",
            customerName: contract_subscriber_name_1 || "",
            amount: Number(total_amount), // in Naira
            reference: data.payment.reference,
            merchant_code: data.merchant_code,
            payment_item_id: data.payable_code,
            onSuccess: () => {
              openModal(<SubscriptionSuccess />);
              navigate(`/dashboard/my-property/${data.plan?.id}`, {
                replace: true,
              });
            },
            onClose: () => {
              openModal(
                <PaymentStatus status="failed" text="Payment canceled." />
              );
            },
          });
        },
      });
    } else if (selectedPaymentMethod == "Paystack") {
      subscribe(payload, {
        onSuccess(data) {
          paystack({
            email: contract_email || "",
            amount: Number(total_amount), // in Naira
            reference: data.payment.reference,
            onSuccess: () => {
              openModal(<SubscriptionSuccess />);
              navigate(`/dashboard/my-property/${data.plan?.id}`, {
                replace: true,
              });
              // TODO: call your backend API to confirm payment
            },
            onClose: () => {
              // openModal(<PaymentStatus status="failed" text="Payment canceled." />);
            },
          });
        },
      });
    } else if (selectedPaymentMethod == "Virtual Wallet") {
      subscribe(payload, {
        onSuccess(data) {
          openModal(<SubscriptionSuccess />);
          navigate(`/dashboard/my-property/${data.plan?.id}`, {
            replace: true,
          });
        },
      });
    } else if (selectedPaymentMethod == "Bank Transfer") {
      openModal(<BankTransferModal payload={payload} property={property} />);
    }
  };
  const goBack = () => {
    openModal(<PropertyTerms property={property} />);
  };
  if (isPending) {
    return <StartingPayment paymentMethod={selectedPaymentMethod || ""} />;
  }
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[75vh] overflow-auto scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-7">
        <div className="text-2xl font-bold">Select Payment Method</div>
        <p className="text-gray-400 text-xs">
          Select your preferred payment method for your plan{" "}
          {/* <b className="text-black">({formatPrice(Number(total_amount))})</b>. */}
        </p>
        <div className="grid grid-cols-2 text-sm border mt-2 border-adron-green rounded-lg p-2 bg-[#e2f7c9]">
          <div className="">Total payable:</div>
          <div className="text-right text-bold">
            {formatPrice(Number(total_amount))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 min-h-[300px] justify-between">
        <div className="flex flex-col gap-2">
          <div
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Interswitch"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Interswitch")}
          >
            <img
              // height={100}
              // width={100}
              src="/Interswitch.svg"
              alt="bank transfer"
              className="h-10 w-10 rounded-full border border-green-200 p-2 bg-white"
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
                Pay with Interswitch
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Paystack"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Paystack")}
          >
            <img
              // height={100}
              // width={100}
              src="/paystack-icon.svg"
              alt="paystack"
              className="h-10 w-10 rounded-full border border-green-200"
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
                Pay with Paystack
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Bank Transfer"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Bank Transfer")}
          >
            <img
              src="/bank-transfer-icon.svg"
              alt="paystack"
              className="h-10 w-10 rounded-full border border-green-200"
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
                Pay with Bank Transfer
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === "Virtual Wallet"
                ? "bg-adron-green text-white border-none "
                : "bg-transparent border  border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod("Virtual Wallet")}
          >
            <div className="h-10 w-10 rounded-full border bg-white border-purple-200 text-purple-700 flex justify-center items-center">
              <Wallet2 className="h-5 w-5" />
            </div>
            <div className="flex-1 flex justify-between gap-2">
              <div className="flex-1">
                <p className="font-adron-mid text-sm ">Wallet</p>
                <p
                  className={`text-xs ${
                    selectedPaymentMethod == "Virtual Wallet"
                      ? `text-white`
                      : `text-gray-500`
                  } `}
                >
                  Pay with Virtual Wallet
                </p>
              </div>
              <div className="">
                <div className="font-bold text-sm">Balance</div>
                <div className="text-xs text-green-700">
                  {formatPrice(userWalletData?.wallet_balance || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {/* <div className="flex items-center gap-2">
            <div className="cursor-pointer" onClick={() => setagreed(!agreed)}>
              <CheckSquare2
                size={20}
                className={`${agreed ? "text-adron-green" : "text-gray-500"}`}
              />
            </div>
            <div className="text-xs">
              Yes, I agree with the property{" "}
              <a href="" className="text-blue-500 underline">
                terms and policies
              </a>
              .
            </div>
          </div> */}

          <div className="flex justify-between w-full gap-2 mt-4">
            <Button
              label="Back"
              icon={<ArrowLeft />}
              className="bg-gray-800 rounded-lg hidden sm:flex"
              onClick={goBack}
            />

            <Button
              label="Make Payment"
              // isLoading={isPaying}
              className="rounded-lg bg-black text-white"
              onClick={handleContinue}
              disabled={!selectedPaymentMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
