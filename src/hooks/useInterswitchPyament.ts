// hooks/useInterswitchPayment.ts
type InterswitchProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  merchant_code: string;
  payment_item_id: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  onError?: (error: any) => void;
  customerName?: string;
  phone?: string;
};

export const useInterswitchPayment = () => {
  const initializePayment = ({
    email,
    amount,
    reference,
    merchant_code,
    payment_item_id = "4397138",
    onSuccess,
    onClose,
    onError,
    customerName = "Customer",
    phone = "",
  }: InterswitchProps) => {
    console.log(amount);
    const interswitchConfig = {
      merchant_code: merchant_code,
      pay_item_id: payment_item_id,
      pay_item_name: "FUND WALLET",
      amount: `${amount * 100}`,
      txn_ref: reference,
      currency: "566", // NGN currency code
      cust_email: email,
      cust_name: customerName,
      cust_id: email,
      site_redirect_url: window.location.origin,
      mode: "LIVE", // or "LIVE" for production
      onComplete: (response: any) => {
        console.log("response", response);
        if (response.ResponseCode === "00") {
          // Payment successful
          onSuccess(response);
        } else {
          // Payment failed
          const errorMessage = response.ResponseMessage || "Payment failed";
          onError?.(errorMessage);
          onClose();
        }
      },
      onclose: onClose,
      oncancel: () => {
        console.log("Payment cancelled by user");
        onClose();
      },
      onAbort: () => {
        console.log("Payment aborted");
        onClose();
      },
      onended: () => {
        console.log("Payment ended");
        onClose();
      },
    };

    const interswitch = window as any;
    if (interswitch && interswitch.webpayCheckout) {
      interswitch.webpayCheckout(interswitchConfig);
    } else {
      console.error("Interswitch webpayCheckout not available");
      onError?.("Payment gateway not available");
      onClose();
    }
  };

  return initializePayment;
};