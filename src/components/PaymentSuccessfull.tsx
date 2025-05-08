import React from "react";

const PaymentSuccessfull = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-4">
      <img src="/ep_success-filled.svg" alt="" className="h-32 w-32" />
      <h4 className="font-bold">Success</h4>
      <p className="text-gray-400 text-center text-sm">{text}</p>
    </div>
  );
};

export default PaymentSuccessfull;
