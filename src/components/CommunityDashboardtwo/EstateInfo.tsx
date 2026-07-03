import React from "react";
import { FiCheckCircle, FiCreditCard, FiHome } from "react-icons/fi";
import { formatPrice } from "../../data/utils";
interface Prop {
  estate: EstateDashboardData;
}
const EstateInfoSection: React.FC<Prop> = ({ estate }) => {
  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#79B833]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4F7E1D]">
            Resident community
          </span>
          {/* <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Sits inside your existing navbar and sidebar
        </span> */}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            {estate.estate_info.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {estate?.estate_info.name} portal for estate groups, land owner
            groups, building chats, access codes, utility bills, service
            charges, documents, and maintenance requests.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiCheckCircle className="text-[#79B833]" />
              Payment plan
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {estate.ownership_and_balances.payment_type === "1" &&
                "Installment"}
              {estate.ownership_and_balances.payment_type === "2" && "One Time"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiCreditCard className="text-[#79B833]" />
              Amount Paid
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {formatPrice(estate?.ownership_and_balances.paid_amount)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiCreditCard className="text-[#79B833]" />
              Balance
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {formatPrice(estate.ownership_and_balances.remaining_balance)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiHome className="text-[#79B833]" />
              Request
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {estate?.maintenance_requests.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateInfoSection;
