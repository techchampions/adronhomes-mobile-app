import React from "react";
import PaymentList, {
  PaymentItem,
  PaymentStatus,
} from "../components/DashboardMyPropertyComponents/PaymentList";
import { useParams } from "react-router-dom";
import {
  useGetPropertyPlanByID,
  useGetUserPropertiesPlanPaymentHistory,
} from "../data/hooks";
import { Transaction } from "../data/types/userTransactionsTypes";
import { formatDate, formatPrice } from "../data/utils";

const MyPropertyPaymentList = () => {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetUserPropertiesPlanPaymentHistory(
    id ?? ""
  );
  const payments: PaymentItem[] = (data?.properties?.data ?? []).map(
    (item: any) => ({
      id: item.id,
      title: item.property.name ?? "Untitled",
      date: formatDate(item.due_date),
      status: item.status,
      amount: formatPrice(item.amount),
    })
  );

  return (
    <div>
      <PaymentList data={payments} isError={isError} isLoading={isLoading} />
    </div>
  );
};

export default MyPropertyPaymentList;
