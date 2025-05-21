import React from "react";
import { PaystackButton } from "react-paystack";

const PaystackPayment = ({
  email,
  amount,
  onSuccess,
  onClose,
}: {
  email: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const publicKey = "your-public-key-here"; // Replace with your Paystack public key

  const componentProps = {
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  return (
    <PaystackButton
      {...componentProps}
      className="px-4 py-2 bg-black text-white rounded-md"
    />
  );
};

export default PaystackPayment;
