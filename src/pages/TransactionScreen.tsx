// pages/TransactionsPage.tsx
import React from "react";
import ReusableList, { ListItem } from "../components/ReusableList";
import MyList, { TransactionItem } from "../components/MyList";

const transactions: TransactionItem[] = [
  {
    id: 1,
    title: "Wallet Top up",
    date: "March 18th, 2020",
    status: "Completed",
    amount: "₦15,000,000",
  },
  {
    id: 2,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 3,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 4,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Pending",
    amount: "₦10,000,000",
  },
  {
    id: 5,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Pending",
    amount: "₦10,000,000",
  },
  {
    id: 6,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 7,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 8,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  // ...more
];

const TransactionsPage = () => {
  const renderStatusBadge = (status?: string) => {
    const colorMap: Record<string, string> = {
      Completed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Failed: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full ${colorMap[status ?? ""]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Transactions</h1>
      <MyList data={transactions} />
      {/* <ReusableList
        items={transactions}
        renderRight={(item) => (
          <div className="flex flex-col items-end">
            {renderStatusBadge(item.status)}
            <span className="text-sm text-gray-700 font-medium mt-1">
              {item.amount}
            </span>
          </div>
        )}
      /> */}
    </div>
  );
};

export default TransactionsPage;
