// steps/InterswitchStep.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Shield, CreditCard } from "lucide-react";
// import { useInterswitchPayment } from '../../../hooks/useInterswitchPayment';
import { Button } from "../ui/Button";
import { useInterswitchPayment } from "../../../hooks/useInterswitchPyament";
import { InterswitchLogo } from "./PaymentMethodStep";

interface InterswitchStepProps {
  amount: number;
  contractId: number;
  email: string;
  reference: string;
  merchantCode: string;
  paymentItemId: string;
  paymentId?: number;
  customerName?: string;
  phone?: string;
  onApprove: (response: any) => void;
  onCancel: () => void;
  onError?: (error: string) => void;
  onProcessingStateChange?: (isProcessing: boolean) => void;
}

export function InterswitchStep({
  amount,
  contractId,
  email,
  reference,
  merchantCode,
  paymentItemId,
  paymentId,
  customerName = "Customer",
  phone = "",
  onApprove,
  onCancel,
  onError,
  onProcessingStateChange,
}: InterswitchStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const initializeInterswitchPayment = useInterswitchPayment();

  // Notify parent about processing state
  useEffect(() => {
    onProcessingStateChange?.(isProcessing);
  }, [isProcessing, onProcessingStateChange]);

  const handlePayWithInterswitch = () => {
    if (!merchantCode) {
      onError?.("Merchant code is missing");
      return;
    }

    setIsProcessing(true);

    initializeInterswitchPayment({
      email: email,
      amount: amount,
      reference: reference,
      merchant_code: merchantCode,
      payment_item_id: paymentItemId,
      customerName: customerName,
      phone: phone,
      onSuccess: (response) => {
        console.log("[Interswitch] Payment successful!", response);
        setIsProcessing(false);
        onApprove(response);
      },
      onClose: () => {
        console.log("[Interswitch] Payment dialog closed by user");
        setIsProcessing(false);
        onCancel();
      },
      onError: (error) => {
        console.log("[Interswitch] Payment failed or error occurred", error);
        setIsProcessing(false);
        onError?.(error?.message || "Payment failed");
        onCancel();
      },
    });
  };

  const handleCancelPayment = () => {
    if (!isProcessing) {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-6 border"
        style={{
          // background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.05) 100%)',
          borderColor: "rgba(255, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow"
            // style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #CC5500 100%)' }}
          >
            <InterswitchLogo className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3
              className="font-semibold mb-1"
              style={{ color: "var(--color-adron-black)" }}
            >
              Complete Interswitch Payment
            </h3>
            <p
              className="text-sm"
              style={{ color: "var(--color-adron-gray-500)" }}
            >
              You will be securely redirected to Interswitch to complete your
              payment of{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--color-adron-green)" }}
              >
                ₦{amount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="rounded-lg p-4 space-y-3"
          style={{
            backgroundColor: "var(--color-adron-gray-50)",
            border: "1px solid var(--color-adron-gray-200)",
          }}
        >
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: "var(--color-adron-gray-400)" }}
            >
              Amount
            </span>
            <span
              className="font-semibold"
              style={{ color: "var(--color-adron-green)" }}
            >
              ₦{amount.toLocaleString()}
            </span>
          </div>
          <div
            className="h-px"
            style={{ backgroundColor: "var(--color-adron-gray-200)" }}
          ></div>
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: "var(--color-adron-gray-400)" }}
            >
              Contract ID
            </span>
            <span
              className="font-mono text-sm"
              style={{ color: "var(--color-adron-black)" }}
            >
              {contractId}
            </span>
          </div>
          <div
            className="h-px"
            style={{ backgroundColor: "var(--color-adron-gray-200)" }}
          ></div>
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: "var(--color-adron-gray-400)" }}
            >
              Reference
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--color-adron-black)" }}
            >
              {reference}
            </span>
          </div>
          <div
            className="h-px"
            style={{ backgroundColor: "var(--color-adron-gray-200)" }}
          ></div>
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: "var(--color-adron-gray-400)" }}
            >
              Payment Method
            </span>
            <span
              className="font-semibold"
              style={{ color: "var(--color-adron-green)" }}
            >
              Interswitch
            </span>
          </div>
        </div>

        <div
          className="border-l-4 p-4 rounded-lg"
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.05)",
            borderLeftColor: "#FF0000",
          }}
        >
          <div className="flex gap-3">
            <Shield
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: "#FF6B00" }}
            />
            <p
              className="text-sm"
              style={{ color: "var(--color-adron-gray-500)" }}
            >
              A secure connection will be established to Interswitch. Your
              payment details will be handled securely.
            </p>
          </div>
        </div>
      </div>

<div className="sticky bottom-0 pt-4 pb-2 bg-white mt-4 flex justify-between gap-4">
        <Button
          onClick={handleCancelPayment}
          disabled={isProcessing}
          variant="secondary"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayWithInterswitch}
          disabled={isProcessing || !merchantCode}
          isLoading={isProcessing}
          className="flex-1 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)",
          }}
        >
          <span>Pay with Interswitch</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {isProcessing && (
        <div className="space-y-3">
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "#FF6B00" }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#FF6B00" }}
            ></div>
            <span>
              Processing payment... Please complete the payment in the
              Interswitch window.
            </span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--color-adron-gray-200)" }}
          >
            <div
              className="h-full rounded-full animate-pulse"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, #FF6B00 0%, #CC5500 100%)",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
