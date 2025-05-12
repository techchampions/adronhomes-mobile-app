// import React, { useState } from "react";
// import { useModalStore } from "../../zustand/useModalStore";
// import TransactionDetail from "./TransactionDetail";

// export type TransactionStatus = "All" | "Completed" | "Pending" | "Failed";

// export type TransactionItem = {
//   id: number;
//   title: string;
//   date: string;
//   status: TransactionStatus;
//   amount: string;
// };

// type Props = {
//   data: TransactionItem[];
// };

// const tabs: (TransactionStatus | "All")[] = [
//   "All",
//   "Completed",
//   "Pending",
//   "Failed",
// ];

// const TransactionsList: React.FC<Props> = ({ data }) => {
//   const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
//   const { openModal } = useModalStore();

//   const isTransactionStatus = (tab: string): tab is TransactionStatus => {
//     return ["Completed", "Pending", "Failed"].includes(tab);
//   };

//   const filteredData =
//     activeTab === "All"
//       ? data
//       : isTransactionStatus(activeTab)
//       ? data.filter((item) => item.status === activeTab)
//       : [];

//   const renderStatusBadge = (status: TransactionStatus) => {
//     const styles: Record<TransactionStatus, string> = {
//       Completed: "bg-green-100 text-green-600 border-green-400",
//       Pending: "bg-gray-100 text-gray-600 border-gray-400",
//       Failed: "bg-red-100 text-red-600 border-red-400",
//     };
//     return (
//       <span
//         className={`hidden md:block text-xs border px-3 py-1 rounded-full w-fit mx-auto font-medium ${styles[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white p-2 md:p-6 rounded-3xl">
//       {/* Tabs & Sort */}
//       <div className="flex justify-between items-center mb-4 p-4 md:p-0">
//         <div className="flex gap-4 text-sm font-medium">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               className={`${
//                 activeTab === tab ? "text-black" : "text-gray-400"
//               } transition`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div>
//           <button className="border border-gray-300 text-xs px-4 py-1 rounded-3xl flex items-center gap-1">
//             Latest
//             <svg
//               className="w-3 h-3"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* List */}
//       <div className="">
//         {filteredData.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => openModal(<TransactionDetail id={item.id} />)}
//             className="grid grid-cols-2 md:grid-cols-3 justify-between items-center p-4 even:bg-gray-100 rounded-3xl"
//           >
//             <div>
//               <div className="font-medium text-sm">{item.title}</div>
//               <div className="text-xs text-gray-500">{item.date}</div>
//             </div>
//             {renderStatusBadge(item.status)}
//             <div className="text-sm font-semibold text-end">{item.amount}</div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Dots (Static for now) */}
//       <div className="flex justify-center mt-4 gap-2">
//         <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default TransactionsList;

import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import TransactionDetail from "./TransactionDetail";
import {
  Transaction,
  TransactionStatus,
} from "../../data/types/userTransactionsTypes";
import Loader from "../Loader";
import { formatPrice } from "../../data/utils";

type Props = {
  data: Transaction[];
  isLoading: boolean;
  isError: boolean;
};

const tabs = ["All", "Completed", "Pending", "Failed"] as const;
type Tab = (typeof tabs)[number];

const TransactionsList: React.FC<Props> = ({ data, isLoading, isError }) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { openModal } = useModalStore();

  const renderStatusBadge = (status: TransactionStatus) => {
    const statusMap: Record<
      TransactionStatus,
      { label: string; style: string }
    > = {
      1: {
        label: "Completed",
        style: "bg-green-100 text-green-600 border-green-400",
      },
      0: { label: "Failed", style: "bg-red-100 text-red-600 border-red-400" },
      2: {
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

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => {
          if (activeTab === "Completed") return item.status === 1;
          if (activeTab === "Failed") return item.status === 0;
          return false;
        });
  const renderList = () => {
    return filteredData.map((item) => (
      <div
        key={item.id}
        onClick={() => openModal(<TransactionDetail id={item.id} />)}
        className="grid grid-cols-2 md:grid-cols-3 justify-between items-center p-4 even:bg-gray-100 rounded-3xl"
      >
        <div>
          <div className="font-medium text-xs md:text-sm truncate">
            {item.property.name}
          </div>
          <div className="text-xs text-gray-500">{item.created_at}</div>
        </div>
        {renderStatusBadge(item.status)}
        <div className="text-sm font-semibold text-end">
          {formatPrice(item.amount)}
        </div>
      </div>
    ));
  };
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <span className="text-red-500">Failed to load transactions.</span>
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="text-center py-4">
          <span className="text-gray-500">No transactions found.</span>
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-1 md:gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black" : "text-gray-400"
              } transition text-xs`}
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
      <div className="">{renderContent()}</div>

      {/* Pagination Dots (Static for now) */}
      <div className="flex justify-center mt-4 gap-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default TransactionsList;
