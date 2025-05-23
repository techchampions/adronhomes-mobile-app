import React from "react";
import Button from "../Button";

const RequestDocument = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5 gap-4">
      <img src="/ep_success-filled.svg" alt="" className="h-14 w-14" />
      <h4 className="font-bold">Payment Complete</h4>
      <p className="text-gray-400 text-center text-sm">
        Congrats! You just completed your payment for this property. Click the
        button below to request for your documents.
      </p>
      <Button label="Request Documents" className="text-sm" />
    </div>
  );
};

export default RequestDocument;
