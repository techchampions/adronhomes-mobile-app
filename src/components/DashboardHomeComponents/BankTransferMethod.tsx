// import React, { useState } from "react";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod, { ApiError } from "./SelectPaymentMethod";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import { RiUpload2Line } from "react-icons/ri";
import { useFundWallet } from "../../data/hooks";
import PaymentPending from "../PaymentPending";
import { Form, Formik } from "formik";
import InputField from "../InputField";
import { useUserStore } from "../../zustand/UserStore";

const BankTransfer = ({
  goBack,
  amount,
}: {
  goBack: () => void;
  amount: number | null;
}) => {
  const { openModal } = useModalStore();
  const { accounts } = useUserStore();
  const fundAccount = accounts.find((item) => item.type === "fund");
  const initialValues = { proof: null as File | null, bank_name: "" };
  const { mutate: fundWallet, isPending: fundingWallet } = useFundWallet();

  const { showToast } = useToastStore();
  const GoToSelectPaymentMethod = () => {
    openModal(<SelectPaymentMethod goBack={goBack} amount={amount} />);
  };
  const handlePaymentSuccess = (values: typeof initialValues) => {
    console.log(values);
    fundWallet(
      {
        amount: amount || 0,
        payment_method: "bank_transfer",
        bank_name: values.bank_name,
        proof_of_payment: values.proof ?? undefined,
      },
      {
        onSuccess() {
          openModal(
            <PaymentPending text={"Payment is being confirmed by Admin."} />
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
                <p className="text-sm">{fundAccount?.account_number}</p>
                <p className="text-xs font-adron-thin text-gray-400">
                  Account Number
                </p>
              </div>
              <CopyButton text={fundAccount?.account_number} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">{fundAccount?.bank_name}</p>
              <p className="text-xs font-adron-thin text-gray-400">Bank Name</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">{fundAccount?.account_name}</p>
              <p className="text-xs font-adron-thin text-gray-400">
                Account Name
              </p>
            </div>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={handlePaymentSuccess}>
          {({ setFieldValue }) => (
            <Form className="flex flex-col gap-2">
              <InputField
                name="bank_name"
                placeholder="Enter your Account name"
                className="mt-4"
              />
              <label className="mt-4">
                <label className="block text-xs">Proof of Payment</label>
                <div className="flex justify-between w-full px-4 py-2 bg-adron-body rounded-lg items-center">
                  <input
                    type="file"
                    name="proof"
                    accept="image/*"
                    className="text-xs w-[70%]"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setFieldValue("proof", file);
                      }
                    }}
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
                  className="!w-fit px-12 py-2 text-xs bg-black text-white"
                  type="submit"
                  isLoading={fundingWallet}
                  disabled={fundingWallet}
                  // onClick={handlePaymentSuccess}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BankTransfer;
