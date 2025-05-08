import React from "react";
import CopyButton from "../CopyButton";
import Button from "../Button";

const TransactionDetail = ({ id }) => {
  return (
    <div className="space-y-5">
      <h4 className="absolute top-4 left-4 font-bold text-lg">
        Transaction Details
      </h4>
      <div className="flex flex-col divide-y divide-gray-200 mt-5">
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="font-bold text-xs">Chuks Federick Bomboclatt</p>
            <p className="font-bold text-xs">(Polaris Bank)</p>
          </div>
          <img src="/mika.png" alt="" className="h-7 w-7" />
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Description</p>
            <p className="font-bold text-xs">Property Investment</p>
          </div>
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Transaction Type</p>
            <p className="font-bold text-xs">Wallet Funding</p>
          </div>
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Payment Method</p>
            <p className="font-bold text-xs">Local Fund Transfer</p>
          </div>
          <div className="flex flex-col text-left">
            <p className="text-gray-400 text-xs">Fees</p>
            <p className="font-bold text-xs">N0.00</p>
          </div>
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Transaction Reference</p>
            <p className="font-bold text-xs">01hws5tdgy677782hdgeg3</p>
          </div>
          <CopyButton text="01hws5tdgy677782hdgeg3" />
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Status</p>
            <p className="font-bold text-xs flex gap-1 items-center">
              {" "}
              <span className="bg-adron-green h-2 w-2 rounded-full"></span>{" "}
              Completed
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          label="Share"
          className="bg-transparent !text-black !w-fir px-6 text-xs"
        />
        <Button label="Download" className="bg-black !w-fir px-6 text-xs" />
      </div>
    </div>
  );
};

export default TransactionDetail;
