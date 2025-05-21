import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import PaymentSuccessfull from "../PaymentSuccessfull";
import { RiUpload2Line } from "react-icons/ri";
import InputField from "../InputField";
import { Form, Formik } from "formik";
import { useCreatePropertyPlan, useFundWallet } from "../../data/hooks";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { useNavigate } from "react-router-dom";

const BankTransfer = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number;
}) => {
  const initialValues = { proof: null, sender_name: "" };
  const navigate = useNavigate();
  const { mutate } = useCreatePropertyPlan();
  const {
    paymentDuration,
    paymentSchedule,
    totalAmount,
    marketerId,
    endDate,
    startDate,
    propertyId,
  } = usePaymentBreakDownStore();
  const { showToast } = useToastStore();
  const { closeModal, openModal } = useModalStore();
  const GoToSelectPaymentMethod = () => {
    openModal(<SelectPaymentMethod goBack={goBack} amount={amount} />);
  };
  const handlePaymentSuccess = (values: typeof initialValues) => {
    console.log("values", values);
    if (values.sender_name && values.proof) {
      mutate(
        {
          payment_method: "virtual_wallet",
          payment_type: 2,
          monthly_duration: Number(paymentDuration),
          property_id: Number(propertyId),
          start_date: startDate,
          end_date: endDate,
          repayment_schedule: paymentSchedule,
          paid_amount: totalAmount,
          marketer_code: marketerId,
          proof_of_payment: values.proof,
        },
        {
          onSuccess: (data) => {
            openModal(
              <PaymentSuccessfull text="Payment received successfully." />
            );
            navigate(`/my-property/${data.plan.id}`);
          },
          onError: (error: any) => {
            // Customize this based on your error shape
            const message =
              error?.response?.data?.message || "Something went wrong";
            showToast(message, "error");
          },
        }
      );

      closeModal();
      showToast("Payment Recieved Successfully", "success");
      openModal(<PaymentSuccessfull text={"Payment received successfully."} />);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mt-4 min-h-[400px] justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-full bg-adron-green rounded-2xl flex gap-3 items-center p-3">
            <img src="/bank-transfer-icon.svg" alt="" className="h-6 w-6" />
            <p className="text-sm text-white">Bank Transfer</p>
          </div>
          <p className="text-sm text-gray-500">
            Transfer{" "}
            <span className="font-bold text-black">
              ₦{amount.toLocaleString()}
            </span>{" "}
            to the account below to complete your payment.
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

        <Formik initialValues={initialValues} onSubmit={handlePaymentSuccess}>
          {({ values }) => {
            return (
              <Form className="flex flex-col gap-2">
                <InputField
                  name="sender_name"
                  placeholder="Enter your Account name"
                  className="mt-4"
                />
                <label className="mt-4">
                  <label className="block text-xs">Proof of Payment</label>
                  <div className="flex justify-between w-full px-4 py-2 bg-adron-body rounded-3xl items-center">
                    <input
                      type="file"
                      name="proof"
                      onChange={(e) => {
                        if (e.target.files) {
                          values.proof = e.target.files[0];
                        }
                      }}
                      className="text-xs w-[70%]"
                    />
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
                    type="submit"
                    className="!w-fit px-12 py-2 text-xs bg-black text-white"
                    // onClick={handlePaymentSuccess}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default BankTransfer;
