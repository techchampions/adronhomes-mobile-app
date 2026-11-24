import { Wallet2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { FiZap } from "react-icons/fi";
import { RiUpload2Line } from "react-icons/ri";
import { Link, useOutletContext } from "react-router-dom";
import { useGetAccounts, useGetUserWalletdata } from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import {
  EstateUtility,
  useEstateUtilities,
  usePayUtitlity,
} from "../../hooks/estateCommunity/useEstateCommunity";
import { useUserStore } from "../../zustand/UserStore";
import CopyButton from "../CopyButton";

type PaymentMethod = "virtual_wallet" | "bank_transfer";

const UtilityPayment: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const estateId = context.data?.estate_info.id;
  const { data: wallet, isLoading } = useGetUserWalletdata();
  const { data: utilitiesResponse, isLoading: utilitiesLoading } =
    useEstateUtilities(estateId);
  useGetAccounts();
  const { accounts } = useUserStore();
  const { mutate, isPending } = usePayUtitlity();

  const utilities = utilitiesResponse?.data || [];
  const [selectedCode, setSelectedCode] = useState("electricity");
  const [meter, setMeter] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("virtual_wallet");
  const [bankName, setBankName] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [confirming, setConfirming] = useState(false);

  const selectedUtility = useMemo(
    () => utilities.find((item) => item.code === selectedCode) || null,
    [utilities, selectedCode],
  );

  const isElectricity = selectedCode === "electricity";
  const unitPrice = Number(selectedUtility?.unit_price);
  const balanceDue = Number(selectedUtility?.balance_due ?? 0);
  const amountDue = Number(selectedUtility?.amount_due ?? 0);
  const amountPaid = Number(selectedUtility?.amount_paid ?? 0);
  const hasElectricityPrice = Number.isFinite(unitPrice) && unitPrice > 0;
  const hasChargeConfigured = amountDue > 0 || balanceDue > 0;
  const balance = Number(wallet?.wallet_balance || 0);
  const value = Number(amount) || 0;
  const units =
    isElectricity && hasElectricityPrice && value > 0 ? value / unitPrice : 0;
  const remainingWallet = balance - value;
  const utilityAccount = accounts.find((item) => item.type === "estate_utility");

  const canPayWallet =
    method === "virtual_wallet" &&
    value >= 1 &&
    remainingWallet >= 0 &&
    !!estateId &&
    !isPending &&
    (isElectricity
      ? hasElectricityPrice && meter.trim().length > 0
      : hasChargeConfigured && value <= balanceDue);

  const canPayBank =
    method === "bank_transfer" &&
    !isElectricity &&
    value >= 1 &&
    value <= balanceDue &&
    hasChargeConfigured &&
    !!estateId &&
    bankName.trim().length > 1 &&
    !!proof &&
    !!utilityAccount &&
    !isPending;

  const canPay = method === "virtual_wallet" ? canPayWallet : canPayBank;

  const selectUtility = (utility: EstateUtility) => {
    setSelectedCode(utility.code);
    setConfirming(false);
    setProof(null);
    setBankName("");
    setAmount("");
    if (utility.code === "electricity") {
      setMethod("virtual_wallet");
    }
  };

  const pay = () => {
    if (!estateId || !canPay) return;
    mutate(
      {
        estate_id: estateId,
        amount: value,
        payment_type: selectedCode,
        payment_method: method,
        chargeable_id: isElectricity
          ? meter.trim()
          : String(new Date().getFullYear()),
        bank_name: method === "bank_transfer" ? bankName.trim() : undefined,
        proof_of_payment:
          method === "bank_transfer" ? proof || undefined : undefined,
      },
      {
        onSuccess: () => {
          setConfirming(false);
          setMeter("");
          setAmount("");
          setBankName("");
          setProof(null);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
            Utilities
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#032147]">
            Estate utility payments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Pay any amount toward your outstanding estate service or capital
            charge. Wallet payments deduct immediately; bank transfers deduct
            after admin confirmation.
          </p>
          <Link
            to="/dashboard/estate/utility-history"
            className="mt-3 inline-flex text-sm font-semibold text-[#209dd7] hover:underline"
          >
            View payment history
          </Link>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#032147] px-4 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Wallet2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-white/70">Wallet balance</p>
            <p className={`text-lg font-bold ${isLoading ? "animate-pulse" : ""}`}>
              {isLoading ? "Loading..." : formatPrice(balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {(utilitiesLoading ? [] : utilities).map((utility) => (
          <button
            key={utility.code}
            type="button"
            onClick={() => selectUtility(utility)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selectedCode === utility.code
                ? "border-[#79B833] bg-[#79B833]/10"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <p className="font-semibold text-[#032147]">{utility.name}</p>
            <p className="mt-1 text-sm text-gray-500">
              {utility.code === "electricity"
                ? utility.unit_price != null
                  ? `${formatPrice(Number(utility.unit_price))} / unit`
                  : "Price unavailable"
                : `Due ${formatPrice(Number(utility.balance_due || 0))}`}
            </p>
          </button>
        ))}
      </div>

      <form
        className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canPay) setConfirming(true);
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#79B833]/15 text-[#79B833]">
            <FiZap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-[#032147]">
              {selectedUtility?.name || "Select a utility"}
            </p>
            <p className="text-sm text-gray-500">
              {utilitiesLoading
                ? "Loading rates..."
                : isElectricity
                  ? hasElectricityPrice
                    ? `${formatPrice(unitPrice)} per unit`
                    : "Unit price unavailable"
                  : hasChargeConfigured
                    ? `Outstanding balance ${formatPrice(balanceDue)}`
                    : "No amount due has been set for this estate yet"}
            </p>
          </div>
        </div>

        {isElectricity ? (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">
              Meter number
            </span>
            <input
              value={meter}
              onChange={(event) => setMeter(event.target.value)}
              placeholder="Enter meter number"
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
            />
          </label>
        ) : (
          <div className="grid gap-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-600 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-400">Total due</p>
              <p className="font-semibold text-[#032147]">
                {formatPrice(amountDue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Paid</p>
              <p className="font-semibold text-[#032147]">
                {formatPrice(amountPaid)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Outstanding</p>
              <p className="font-semibold text-[#032147]">
                {formatPrice(balanceDue)}
              </p>
            </div>
          </div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">
            {isElectricity ? "Amount" : "Amount to pay"}
          </span>
          <input
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value.replace(/[^\d.]/g, ""))
            }
            inputMode="decimal"
            placeholder={
              isElectricity
                ? "Enter amount"
                : `Enter amount up to ${formatPrice(balanceDue)}`
            }
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
          />
          {!isElectricity && value > balanceDue && (
            <p className="mt-1 text-xs text-red-600">
              Amount cannot exceed your outstanding balance.
            </p>
          )}
        </label>

        {!isElectricity && (
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["virtual_wallet", "Wallet"],
                ["bank_transfer", "Bank Transfer"],
              ] as const
            ).map(([option, label]) => (
              <button
                key={option}
                type="button"
                onClick={() => setMethod(option)}
                className={`h-11 rounded-full text-sm font-semibold ${
                  method === option
                    ? "bg-[#032147] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {method === "bank_transfer" && !isElectricity && (
          <div className="space-y-4 rounded-2xl border border-dashed border-gray-200 p-4">
            {!utilityAccount ? (
              <p className="text-sm text-red-600">
                Estate Utility Account has not been configured yet.
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  Transfer{" "}
                  <span className="font-semibold text-[#032147]">
                    {formatPrice(value)}
                  </span>{" "}
                  to the Estate Utility Account below, then upload your receipt.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#032147]">
                        {utilityAccount.account_number}
                      </p>
                      <p className="text-xs text-gray-400">Account Number</p>
                    </div>
                    <CopyButton text={utilityAccount.account_number} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#032147]">
                      {utilityAccount.bank_name}
                    </p>
                    <p className="text-xs text-gray-400">Bank Name</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#032147]">
                      {utilityAccount.account_name}
                    </p>
                    <p className="text-xs text-gray-400">Account Name</p>
                  </div>
                </div>
              </>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Your account name
              </span>
              <input
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
                placeholder="Name on the account you paid from"
                className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Bank transfer receipt
              </span>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-[70%] text-xs"
                  onChange={(event) =>
                    setProof(event.target.files?.[0] || null)
                  }
                />
                <RiUpload2Line className="h-5 w-5 text-gray-400" />
              </div>
              {proof && (
                <p className="mt-1 text-xs text-gray-500">{proof.name}</p>
              )}
            </label>
          </div>
        )}

        <div className="space-y-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm">
          {isElectricity && <Row label="Units" value={units.toFixed(2)} />}
          <Row label="Total" value={formatPrice(value)} />
          {method === "virtual_wallet" && (
            <Row
              label="Wallet after purchase"
              value={formatPrice(Math.max(remainingWallet, 0))}
            />
          )}
          {!isElectricity && (
            <Row
              label="Outstanding after payment"
              value={formatPrice(Math.max(balanceDue - value, 0))}
            />
          )}
        </div>

        {method === "virtual_wallet" && value > 0 && remainingWallet < 0 && (
          <p className="text-sm text-red-600">
            Your wallet does not have enough for this payment.
          </p>
        )}

        <button
          type="submit"
          disabled={!canPay}
          className="h-12 w-full rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          {method === "bank_transfer"
            ? `Submit ${formatPrice(value)} bank transfer`
            : value > 0
              ? `Pay ${formatPrice(value)} with wallet`
              : "Pay with wallet"}
        </button>
      </form>

      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h4 className="text-lg font-bold text-[#032147]">
              {method === "bank_transfer"
                ? "Confirm bank transfer"
                : "Confirm wallet payment"}
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {method === "bank_transfer" ? (
                <>
                  Submit{" "}
                  <span className="font-semibold text-[#032147]">
                    {formatPrice(value)}
                  </span>{" "}
                  for {selectedUtility?.name}. Your outstanding balance will be
                  reduced after an admin validates the receipt.
                </>
              ) : (
                <>
                  Your wallet will be debited{" "}
                  <span className="font-semibold text-[#032147]">
                    {formatPrice(value)}
                  </span>{" "}
                  for {selectedUtility?.name}
                  {isElectricity ? ` on meter ${meter.trim()}` : ""}.
                  {!isElectricity &&
                    " Your outstanding balance will be reduced immediately."}
                </>
              )}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setConfirming(false)}
                className="h-11 flex-1 rounded-full border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Go back
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={pay}
                className="h-11 flex-1 rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-300"
              >
                {isPending
                  ? "Submitting..."
                  : method === "bank_transfer"
                    ? "Submit receipt"
                    : "Confirm and pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-[#032147]">{value}</span>
    </div>
  );
}

export default UtilityPayment;
