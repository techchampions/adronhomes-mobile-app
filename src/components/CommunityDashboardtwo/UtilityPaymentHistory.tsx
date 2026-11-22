import React, { useState } from "react";
import { FiClock, FiCreditCard, FiZap } from "react-icons/fi";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate, formatPrice } from "../../data/utils";
import { useUtilityPaymentHistory } from "../../hooks/estateCommunity/useEstateCommunity";

const typeLabel = (type: string) => {
  const labels: Record<string, string> = {
    electricity: "Electricity",
    annual_service_charge: "Estate Service Charge",
    annual_capital_charge: "Estate Capital Charge",
    estate_service_charge: "Estate Service Charge",
    estate_capital_charge: "Estate Capital Charge",
  };
  return labels[type] || type.replace(/_/g, " ");
};

const methodLabel = (method: string) => {
  if (method === "virtual_wallet") return "Wallet";
  if (method === "bank_transfer") return "Bank Transfer";
  return method.replace(/_/g, " ");
};

const statusMeta = (status: number) => {
  if (status === 1) {
    return { label: "Completed", className: "bg-green-50 text-green-700" };
  }
  if (status === 2) {
    return { label: "Rejected", className: "bg-red-50 text-red-700" };
  }
  return { label: "Pending", className: "bg-amber-50 text-amber-700" };
};

const UtilityPaymentHistory: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const estateId = context.data?.estate_info.id;
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } =
    useUtilityPaymentHistory(estateId, page);

  const payments = data?.data?.data || [];
  const currentPage = data?.data?.current_page || 1;
  const lastPage = data?.data?.last_page || 1;
  const total = data?.data?.total || 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
            Utilities
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#032147]">
            Utility payment history
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Review electricity, service charge, and capital charge payments for
            this estate.
          </p>
        </div>
        <Link
          to="/dashboard/estate/utilities"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#032147] px-5 text-sm font-semibold text-white"
        >
          Make a payment
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79B833]/15 text-[#79B833]">
              <FiClock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-[#032147]">Past payments</p>
              <p className="text-xs text-gray-500">
                {isLoading ? "Loading..." : `${total} record${total === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>
          {isFetching && !isLoading && (
            <span className="text-xs text-gray-400">Refreshing...</span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-sm text-red-600">
            Unable to load utility payment history.
          </div>
        ) : payments.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <FiZap className="h-5 w-5" />
            </div>
            <p className="font-medium text-[#032147]">No payments yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Your utility payments will appear here after you pay.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {payments.map((payment) => {
              const status = statusMeta(Number(payment.status));
              return (
                <div
                  key={payment.id}
                  className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-[#79B833]">
                      <FiCreditCard className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold capitalize text-[#032147]">
                        {typeLabel(payment.payment_type || payment.purpose)}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {methodLabel(payment.payment_method)} •{" "}
                        {formatDate(payment.created_at)}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-400">
                        Ref: {payment.reference}
                      </p>
                      {payment.description && (
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                          {payment.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <p className="font-semibold text-[#032147]">
                      {formatPrice(Number(payment.amount || 0))}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {lastPage > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
            <button
              type="button"
              disabled={currentPage <= 1 || isFetching}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="h-10 rounded-full border border-gray-200 px-4 text-sm font-medium text-gray-700 disabled:opacity-40"
            >
              Previous
            </button>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {lastPage}
            </p>
            <button
              type="button"
              disabled={currentPage >= lastPage || isFetching}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-10 rounded-full border border-gray-200 px-4 text-sm font-medium text-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilityPaymentHistory;
