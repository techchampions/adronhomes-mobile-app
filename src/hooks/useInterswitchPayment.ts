// hooks/useInterswitchPayment.ts
type InterswitchProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  merchant_code: string;
  payment_item_id: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
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
        }
      },
      onAbort: () => {
        alert("Transaction aborted!");
      },
    };

    const interswitch = window as any;
    if (interswitch) {
      interswitch.webpayCheckout(interswitchConfig);
    } else {
      onClose();
    }

    // if (interswitch) {
    //   console.log("yes, interswitch");
    //   interswitch.setCallback(function (response: any) {
    //     if (response.response_code === "00") {
    //       // Payment successful
    //       onSuccess(response);
    //     } else {
    //       // Payment failed or closed
    //       onClose();
    //     }
    //   });

    //   interswitch.loadIframe();
    // } else {
    //   console.error("Interswitch inline checkout not loaded");
    //   onClose();
    // }
  };

  return initializePayment;
};