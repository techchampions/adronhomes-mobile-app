// // components/TransactionList.tsx
// import React, { useEffect, useState } from "react";

// export type TransactionStatus = "Completed" | "Pending" | "Failed";

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

// const MyList: React.FC<Props> = ({ data }) => {
//   const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

//   useEffect(() => {
//       const filteredData =
//         activeTab === "All"
//           ? data
//           : data.filter((item) => item.status === activeTab);

//       return (filteredData)
//     }
//   }, [activeTab, data]);

//   const renderStatusBadge = (status: TransactionStatus) => {
//     const styles: Record<TransactionStatus, string> = {
//       Completed: "bg-green-100 text-green-600 border-green-400",
//       Pending: "bg-gray-100 text-gray-600 border-gray-400",
//       Failed: "bg-red-100 text-red-600 border-red-400",
//     };
//     return (
//       <span
//         className={`text-xs border px-3 py-1 rounded-full font-medium ${styles[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white p-4 rounded-3xl ">
//       {/* Tabs & Sort */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-4 text-sm font-medium">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               className={`${
//                 activeTab === tab ? "text-black" : "text-gray-400"
//               } transition`}
//               onClick={() => {
//                 setActiveTab(tab);
//                 console.log(activeTab, tab);
//               }}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div>
//           <button className="border border-gray-300 text-sm px-4 py-1 rounded-lg flex items-center gap-1">
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
//       <div className="divide-y">
//         {filteredData.map((item) => (
//           <div
//             key={item.id}
//             className="flex justify-between items-center py-4 hover:bg-gray-50 px-2 rounded-lg"
//           >
//             <div>
//               <div className="font-medium">{item.title}</div>
//               <div className="text-xs text-gray-500">{item.date}</div>
//             </div>
//             <div className="flex flex-col items-end gap-1">
//               {renderStatusBadge(item.status)}
//               <div className="text-sm font-semibold">{item.amount}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 gap-2">
//         <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default MyList;
// components/TransactionList.tsx
import React, { useState } from "react";

export type TransactionStatus = "All" | "Completed" | "Pending" | "Failed";

export type TransactionItem = {
  id: number;
  title: string;
  date: string;
  status: TransactionStatus;
  amount: string;
};

type Props = {
  data: TransactionItem[];
};

const tabs: (TransactionStatus | "All")[] = [
  "All",
  "Completed",
  "Pending",
  "Failed",
];

const MyList: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const isTransactionStatus = (tab: string): tab is TransactionStatus => {
    return ["Completed", "Pending", "Failed"].includes(tab);
  };

  const filteredData =
    activeTab === "All"
      ? data
      : isTransactionStatus(activeTab)
      ? data.filter((item) => item.status === activeTab)
      : [];

  const renderStatusBadge = (status: TransactionStatus) => {
    const styles: Record<TransactionStatus, string> = {
      Completed: "bg-green-100 text-green-600 border-green-400",
      Pending: "bg-gray-100 text-gray-600 border-gray-400",
      Failed: "bg-red-100 text-red-600 border-red-400",
    };
    return (
      <span
        className={`text-xs border px-3 py-1 rounded-full font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white p-4 rounded-3xl shadow">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4">
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
          <button className="border border-gray-300 text-sm px-4 py-1 rounded-lg flex items-center gap-1">
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
      <div className="divide-y">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-4 hover:bg-gray-50 px-2 rounded-lg"
          >
            <div>
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">{item.date}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {renderStatusBadge(item.status)}
              <div className="text-sm font-semibold">{item.amount}</div>
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

export default MyList;
