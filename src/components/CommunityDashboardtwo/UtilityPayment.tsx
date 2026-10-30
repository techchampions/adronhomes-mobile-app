import { Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { FiZap } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { useGetUserWalletdata } from "../../data/hooks";
import { formatPrice } from "../../data/utils";
import { useElectricityRate, usePayUtitlity } from "../../hooks/estateCommunity/useEstateCommunity";

const UtilityPayment: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const { data: wallet, isLoading } = useGetUserWalletdata();
  const { data: rate, isLoading: rateLoading } = useElectricityRate();
  const { mutate, isPending } = usePayUtitlity();
  const [meter, setMeter] = useState("");
  const [amount, setAmount] = useState("");
  const [confirming, setConfirming] = useState(false);

  const unitPrice = Number(rate?.data?.unit_price);
  const hasPrice = Number.isFinite(unitPrice) && unitPrice > 0;
  const balance = Number(wallet?.wallet_balance || 0);
  const value = Number(amount) || 0;
  const units = hasPrice && value > 0 ? value / unitPrice : 0;
  const remaining = balance - value;
  const estateId = context.data?.estate_info.id;
  const canPay =
    meter.trim().length > 0 &&
    value >= 1 &&
    remaining >= 0 &&
    hasPrice &&
    !!estateId &&
    !isPending;

  const pay = () => {
    if (!estateId || !canPay) return;
    mutate(
      {
        chargeable_id: meter.trim(),
        amount: value,
        estate_id: estateId,
        payment_method: "virtual_wallet",
        payment_type: "Electricity",
      },
      {
        onSuccess: () => {
          setConfirming(false);
          setMeter("");
          setAmount("");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#79B833]">
            Utilities
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#032147]">Buy electricity</h3>
          <p className="mt-1 text-sm text-gray-500">
            Purchase units for your meter. Payment is taken from your wallet.
          </p>
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
            <p className="font-semibold text-[#032147]">Electricity</p>
            <p className="text-sm text-gray-500">
              {rateLoading
                ? "Loading unit price..."
                : hasPrice
                  ? `${formatPrice(unitPrice)} per unit`
                  : "Unit price is unavailable"}
            </p>
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Meter number</span>
          <input
            value={meter}
            onChange={(event) => setMeter(event.target.value)}
            placeholder="Enter meter number"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Amount</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
            inputMode="decimal"
            placeholder="Enter amount"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
          />
        </label>

        <div className="space-y-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm">
          <Row label="Units" value={units.toFixed(2)} />
          <Row label="Total" value={formatPrice(value)} />
          <Row label="Balance after purchase" value={formatPrice(Math.max(remaining, 0))} />
        </div>

        {value > 0 && remaining < 0 && (
          <p className="text-sm text-red-600">
            Your wallet does not have enough for this purchase.
          </p>
        )}

        <button
          type="submit"
          disabled={!canPay}
          className="h-12 w-full rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          {value > 0 ? `Pay ${formatPrice(value)} with wallet` : "Pay with wallet"}
        </button>
      </form>

      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6">
            <h4 className="text-lg font-bold text-[#032147]">Confirm wallet payment</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              If you continue, your wallet will be debited{" "}
              <span className="font-semibold text-[#032147]">{formatPrice(value)}</span>{" "}
              for electricity on meter {meter.trim()}. The amount is taken from your wallet
              balance as soon as you confirm.
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
                {isPending ? "Debiting..." : "Confirm and pay"}
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
