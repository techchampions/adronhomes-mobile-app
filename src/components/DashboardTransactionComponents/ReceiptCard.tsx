// ReceiptCard.js
import React from "react";
import AdronHomesLogo from "./path-to-your-logo.png"; // Import your logo image

const ReceiptCard = ({ recieptData }:{recieptData:any}) => {
  if (!recieptData) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md max-w-lg mx-auto my-10 font-sans">
      {/* Header section with green background */}
      <div className="bg-adron-green text-white text-center py-4 mb-6 rounded-t-lg">
        <div className="flex items-center justify-center space-x-2">
          <img src={AdronHomesLogo} alt="Adron Homes Logo" className="h-8" />
          <h1 className="text-xl font-bold">ADRON HOMES</h1>
        </div>
        <h2 className="text-xl font-semibold mt-2">Payment Receipt</h2>
      </div>

      {/* Main content */}
      <div className="px-4">
        <p className="mb-4">
          Hello **{recieptData.customer_name}**,
          <br />
          Thank you for your property payment. Here are the details:
        </p>

        {/* Receipt details table */}
        <div className="border border-gray-200 divide-y divide-gray-200">
          <div className="flex justify-between py-2 px-4">
            <p className="font-bold text-gray-700">Customer Name:</p>
            <p>{recieptData.customer_name}</p>
          </div>
          <div className="flex justify-between py-2 px-4 bg-gray-100">
            <p className="font-bold text-gray-700">Property:</p>
            <p>{recieptData.property}</p>
          </div>
          <div className="flex justify-between py-2 px-4">
            <p className="font-bold text-gray-700">Reference:</p>
            <p>{recieptData.reference}</p>
          </div>
          <div className="flex justify-between py-2 px-4 bg-gray-100">
            <p className="font-bold text-gray-700">Description:</p>
            <p>{recieptData.description}</p>
          </div>
          <div className="flex justify-between py-2 px-4">
            <p className="font-bold text-gray-700">Payment Type:</p>
            <p>{recieptData.payment_type}</p>
          </div>
          <div className="flex justify-between py-2 px-4 bg-gray-100">
            <p className="font-bold text-gray-700">Amount Paid:</p>
            <p>{recieptData.amount_paid}</p>
          </div>
          <div className="flex justify-between py-2 px-4">
            <p className="font-bold text-gray-700">Status:</p>
            <p>{recieptData.status}</p>
          </div>
          <div className="flex justify-between py-2 px-4 bg-gray-100 rounded-b-lg">
            <p className="font-bold text-gray-700">Date:</p>
            <p>{recieptData.date}</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-500">
          We appreciate your trust in AdronHomes.
        </p>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-xs text-gray-400">
        &copy; 2025 AdronHomes. All rights reserved.
      </div>
    </div>
  );
};

export default ReceiptCard;
