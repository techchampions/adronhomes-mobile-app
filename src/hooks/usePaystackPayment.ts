// hooks/usePaystackPayment.ts
type PaystackProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
};

export const usePaystackPayment = () => {
  const initializePayment = ({
    email,
    amount,
    reference,
    onSuccess,
    onClose,
  }: PaystackProps) => {
    const paystack = (window as any).PaystackPop?.setup({
      key: "pk_test_7631f13b844e3b3125dd51ed9c10f8f6a9e1559b", // 🔁 Replace with your Paystack public key
      email,
      ref: reference,
      amount: amount * 100, // convert to kobo
      currency: "NGN",
      callback: onSuccess,
      onClose,
    });

    paystack?.openIframe();
  };

  return initializePayment;
};
