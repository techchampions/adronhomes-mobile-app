import React from "react";
interface Prop {
  paymentMethod: string;
}
const StartingPayment: React.FC<Prop> = ({ paymentMethod }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="p-4 bg-white rounded-xl w-xs h-[20rem] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-adron-green">
          <div className="w-10 h-10 border-b-2 rounded-full border-adron-green animate-spin"></div>
          <div className="">Initializing {paymentMethod}...</div>
        </div>
      </div>
    </div>
  );
};

export default StartingPayment;
