import React, { useState } from "react";
import Button from "../Button";
import InputAmount from "../PaymentComponents/InputAmount";
import { useModalStore } from "../../zustand/useModalStore";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { formatPrice } from "../../data/utils";

export type PaymentStatus = 0 | 1 | 2;

export type PaymentItem = {
  id: number;
  plan_id: number;
  title: string;
  date: string;
  status: PaymentStatus;
  amount: number;
};

type Props = {
  data: PaymentItem[];
  isLoading?: boolean;
  isError?: boolean;
};

const tabs = ["All", "Paid", "Pending", "Missed"] as const;
type Tab = (typeof tabs)[number];

const PaymentList: React.FC<Props> = ({ data, isLoading, isError }) => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { resetPaymentDetails, setPaymentDetails } = usePaymentBreakDownStore();

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => {
          if (activeTab === "Missed") return item.status === 2;
          if (activeTab === "Paid") return item.status === 1;
          if (activeTab === "Pending") return item.status === 0;
          return false;
        });

  const renderStatusBadge = (status: PaymentStatus) => {
    const statusMap: Record<PaymentStatus, { label: string; style: string }> = {
      1: {
        label: "Paid",
        style: "bg-green-100 text-green-600 border-green-400",
      },
      2: { label: "Pending", style: "bg-red-100 text-red-600 border-red-400" },
      0: {
        label: "Pending",
        style: "bg-gray-100 text-gray-600 border-gray-400",
      },
    };

    const { label, style } = statusMap[status];

    return (
      <span
        className={`hidden md:block text-xs border py-1 rounded-full w-24 text-center mx-auto font-medium ${style}`}
      >
        {label}
      </span>
    );
  };
  const makePayment = () => {
    openModal(<InputAmount goBack={makePayment} />);
  };

  const renderList = () => {
    return (
      <div className="">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer grid grid-cols-3 md:grid-cols-4 justify-between items-center p-4 even:bg-gray-100 rounded-3xl"
          >
            <div>
              <div className="font-medium text-sm">{item.date}</div>
              <div className="text-xs text-gray-500">{item.title}</div>
            </div>
            {renderStatusBadge(item.status)}
            <div className="text-sm font-semibold text-end">
              {formatPrice(item.amount)}
            </div>
            <div className="flex justify-end">
              {item.status != 1 && (
                <Button
                  label="Make Payment"
                  className="bg-black text-[9px] md:text-xs !w-fit px-4 md:px-6"
                  onClick={() => {
                    resetPaymentDetails();
                    setPaymentDetails({
                      planId: item.plan_id,
                    });

                    openModal(
                      <InputAmount
                        goBack={makePayment}
                        repaymentAmount={item.amount}
                        dueDate={item.date}
                      />
                    );
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <ApiErrorBlock />
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="text-center py-4">
          <NotFound />
        </div>
      );
    }

    return renderList();
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
        {/* <div>
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
        </div> */}
      </div>

      {/* List */}
      {renderContent()}

      {/* Pagination */}

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
