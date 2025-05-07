import React, { useState } from "react";
import Button from "../Button";
import InputAmount from "../PaymentComponents/InputAmount";
import { useModalStore } from "../../zustand/useModalStore";

export type PaymentStatus = "All" | "Paid" | "Pending" | "Missed";

export type PaymentItem = {
  id: number;
  title: string;
  date: string;
  status: PaymentStatus;
  amount: string;
};

type Props = {
  data: PaymentItem[];
};

const tabs: (PaymentStatus | "All")[] = ["All", "Paid", "Pending", "Missed"];

const PaymentList: React.FC<Props> = ({ data }) => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const isPaymentStatus = (tab: string): tab is PaymentStatus => {
    return ["Paid", "Pending", "Missed"].includes(tab);
  };

  const filteredData =
    activeTab === "All"
      ? data
      : isPaymentStatus(activeTab)
      ? data.filter((item) => item.status === activeTab)
      : [];

  const renderStatusBadge = (status: PaymentStatus) => {
    const styles: Record<PaymentStatus, string> = {
      Paid: "bg-green-100 text-green-600 border-green-400",
      Pending: "bg-gray-100 text-gray-600 border-gray-400",
      Missed: "bg-red-100 text-red-600 border-red-400",
    };
    return (
      <span
        className={`hidden md:block text-xs border px-3 py-1 rounded-full w-fit mx-auto font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };
  const makePayment = () => {
    openModal(<InputAmount goBack={makePayment} />);
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black" : "text-gray-400"
              } transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <button className="border border-gray-300 text-xs px-4 py-1 rounded-3xl flex items-center gap-1">
            Latest
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-4 justify-between items-center p-4 even:bg-gray-100 rounded-3xl"
          >
            <div>
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-500">{item.date}</div>
            </div>
            {renderStatusBadge(item.status)}
            <div className="text-sm font-semibold text-end">{item.amount}</div>
            <div className="flex justify-end">
              {item.status == "Missed" && (
                <Button
                  label="Make Payment"
                  className="bg-black text-xs !w-fit px-6"
                  onClick={makePayment}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots (Static for now) */}
      <div className="flex justify-center mt-4 gap-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default PaymentList;
