import React from "react";

type WalletTransaction = {
  id: number;
  title: string;
  date: string;
  status: "Completed" | "Pending";
  amount: string;
};

const walletHistory: WalletTransaction[] = [
  {
    id: 1,
    title: "Wallet Top up",
    date: "March 18th, 20:00",
    status: "Completed",
    amount: "₦5,000,000",
  },
  {
    id: 2,
    title: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    status: "Completed",
    amount: "₦10,000,000",
  },
  {
    id: 3,
    title: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    status: "Pending",
    amount: "₦10,000,000",
  },
  {
    id: 4,
    title: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    status: "Completed",
    amount: "₦10,000,000",
  },
  {
    id: 5,
    title: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    status: "Pending",
    amount: "₦10,000,000",
  },
];

const StatusBadge = ({ status }: { status: WalletTransaction["status"] }) => {
  const isCompleted = status === "Completed";
  return (
    <span
      className={`px-3 py-1 w-fit hidden md:block mx-auto rounded-full text-xs font-medium border ${
        isCompleted
          ? "text-green-600 border-green-300 bg-green-50"
          : "text-gray-500 border-gray-300 bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

const WalletHistory: React.FC = () => {
  return (
    <div className="bg-white p-4 md:p-10 rounded-3xl">
      <div className="flex items-center justify-between mb-4 px-4">
        <h4 className="text-gray-800 font-semibold text-lg">History</h4>
        <button className="text-green-600 text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      <ul className="space-y-2">
        {walletHistory.map((tx, idx) => (
          <li
            key={tx.id}
            className={`grid grid-cols-2 md:grid-cols-3 items-center justify-between px-4 py-3 rounded-3xl ${
              idx % 2 !== 0 ? "bg-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm text-gray-800 font-medium">{tx.title}</p>
              <p className="text-xs text-gray-500">{tx.date}</p>
            </div>
            <StatusBadge status={tx.status} />
            <p className="text-sm font-semibold text-end text-gray-800">
              {tx.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletHistory;
