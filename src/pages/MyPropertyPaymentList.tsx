import React from "react";
import PaymentList, {
  PaymentItem,
} from "../components/DashboardMyPropertyComponents/PaymentList";

const Payments: PaymentItem[] = [
  {
    id: 1,
    title: "Wallet Top up",
    date: "March 18th, 2020",
    status: "Paid",
    amount: "₦15,000,000",
  },
  {
    id: 2,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Missed",
    amount: "₦10,000,000",
  },
  {
    id: 3,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Missed",
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
    status: "Missed",
    amount: "₦10,000,000",
  },
  {
    id: 7,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Missed",
    amount: "₦10,000,000",
  },
  {
    id: 8,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Missed",
    amount: "₦10,000,000",
  },
  // ...more
];

const MyPropertyPaymentList = () => {
  return (
    <div>
      <PaymentList data={Payments} />
    </div>
  );
};

export default MyPropertyPaymentList;
