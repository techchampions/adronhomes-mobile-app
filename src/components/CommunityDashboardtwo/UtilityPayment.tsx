// components/UtilityPayment.tsx
import { Info, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { FiDroplet, FiWifi, FiZap } from "react-icons/fi";
import { useGetUserWalletdata } from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import ElectricPaymentForm from "./ElectricPaymentForm";
import WaterBillForm from "./WaterBillForm";

const UtilityPayment: React.FC = () => {
  const [paymentMethod, setpaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("electricity");
  const { data: userWalletData, isLoading } = useGetUserWalletdata();

  const utilities = [
    {
      id: "electricity",
      label: "Electricity",
      icon: FiZap,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "water",
      label: "Water",
      icon: FiDroplet,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "internet",
      label: "Internet",
      icon: FiWifi,
      color: "from-purple-400 to-purple-600",
    },
  ];
  const paymentMethods = [
    {
      label: "Paystack",
      id: "paystack",
      image: "/paystack-icon.svg",
    },
    {
      label: "Interswitch",
      id: "interswitch",
      image: "/Interswitch.svg",
    },
    {
      label: "Bank Transfer",
      id: "bank_transfer",
      image: "/bank-transfer-icon.svg",
    },
  ];

  const renderContent = () => {
    if (paymentType === "electricity") {
      return <ElectricPaymentForm payment_method={paymentMethod} />;
    }
    if (paymentType === "water") {
      return <WaterBillForm payment_method={paymentMethod} />;
    }
    if (paymentType === "internet") {
      return (
        <div className="border rounded-xl border-gray-200 text-gray-500  flex justify-center flex-col items-center">
          <Info />
          <div className="font-adron-mid">Coming Soon</div>
        </div>
      );
    }
  };

  return (
    <div className=" mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Utility Payments</h3>
          <p className="text-sm text-gray-500 mt-1">
            Pay your utility bills quickly and securely
          </p>
        </div>

        {/* Utility Selection Cards */}
        <div className="grid grid-cols-3 gap-3">
          {utilities.map((util) => {
            const Icon = util.icon;
            const isActive = paymentType === util.id;
            return (
              <button
                key={util.id}
                onClick={() => setPaymentType(util.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isActive
                    ? `border-[#79B833] bg-gradient-to-r ${util.color} text-white shadow-lg`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-6 h-6 mx-auto ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                />
                <p
                  className={`text-sm font-medium mt-2 ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {util.label}
                </p>
              </button>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {renderContent()}
          <div className="order-first sm:order-last">
            <div className="mb-4">
              <div className="text-xl font-adron-bold">
                Select Payment Method
              </div>
              <div className="text-sm text-gray-500">
                Select your preferred payment method below:
              </div>
            </div>
            <div className="space-y-1">
              {paymentMethods.map((item, i) => (
                <div
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === item.id
                      ? "bg-adron-green text-white border-none "
                      : "bg-transparent border  border-gray-300"
                  }`}
                  onClick={() => setpaymentMethod(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-10 w-10 rounded-full border border-green-200 p-2 bg-white"
                  />

                  <div>
                    <p className="font-adron-mid text-sm">{item.label}</p>
                    <p
                      className={`text-xs ${
                        paymentMethod === item.id
                          ? `text-white`
                          : `text-gray-500`
                      } `}
                    >
                      Pay with {item.label}
                    </p>
                  </div>
                </div>
              ))}
              <div
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "virtual wallet"
                    ? "bg-adron-green text-white border-none "
                    : "bg-transparent border  border-gray-300"
                }`}
                onClick={() => setpaymentMethod("virtual wallet")}
              >
                <div className="h-10 w-10 rounded-full border bg-white border-purple-200 text-purple-700 flex justify-center items-center">
                  <Wallet2 className="h-5 w-5" />
                </div>
                <div className="flex-1 flex justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-adron-mid text-sm ">Wallet</p>
                    <p
                      className={`text-xs ${
                        paymentMethod == "virtual wallet"
                          ? `text-white`
                          : `text-gray-500`
                      } `}
                    >
                      Pay with Virtual Wallet
                    </p>
                  </div>
                  <div className="">
                    <div className="font-bold text-sm">Balance</div>
                    <div
                      className={`text-xs ${isLoading && "animate-pulse"} ${
                        paymentMethod === "virtual wallet"
                          ? "text-white"
                          : "text-green-500"
                      }`}
                    >
                      {isLoading
                        ? "Loading..."
                        : formatPrice(userWalletData?.wallet_balance || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityPayment;
