import CopyButton from "../CopyButton";
import Button from "../Button";
import { useGetPaymentReciept, useGetTransactionByID } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import { formatPrice } from "../../data/utils";
import { TransactionStatus } from "../../data/types/userTransactionsTypes";
import SmallLoader from "../SmallLoader";
import ShareButton from "../onboardingMobileScreen/onboardingComponents/ShareButton";
import { jsPDF } from "jspdf";
import React, { useState } from "react";
import domtoimage from "dom-to-image";

// Extend Window interface for ReactNativeWebView
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface PDFMessage {
  type: "DOWNLOAD_PDF";
  filename: string;
  base64: string;
}

const TransactionDetail = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetTransactionByID(id);
  const printref = React.useRef<HTMLDivElement>(null);
  const { data: receiptData, isLoading: gettingReceipt } = useGetPaymentReciept(id);
  const [isDownloading, setIsDownloading] = useState(false);

  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  const renderStatusBadge = (status: TransactionStatus) => {
    const statusMap: Record<TransactionStatus, { label: string; style: string }> = {
      1: { label: "Completed", style: "bg-[#79B833]" },
      2: { label: "Failed", style: "bg-[#DC2626]" },
      0: { label: "Pending", style: "bg-[#4B5563]" },
    };

    const { label, style } = statusMap[status];
    return (
      <div className="flex gap-1 items-center">
        <span className={`h-2 w-2 rounded-full ${style}`}></span>
        {label}
      </div>
    );
  };

  const handleDownloadPdf = async (): Promise<void> => {
    const element = printref.current;
    if (!element) {
      console.warn("No element found for PDF generation");
      return;
    }

    setIsDownloading(true);

    try {
      const rect = element.getBoundingClientRect();
      const elementWidth = rect.width;
      const elementHeight = rect.height;

      const scale = 3;
      const imageOptions = {
        quality: 0.98,
        bgcolor: "#ffffff",
        width: elementWidth * scale,
        height: elementHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${elementWidth}px`,
          height: `${elementHeight}px`,
        },
      };

      const imgData = await domtoimage.toPng(element, imageOptions);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const usableWidth = pdfWidth - margin * 2;
      const usableHeight = pdfHeight - margin * 2;

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => (img.onload = resolve));

      const imgWidth = img.naturalWidth / scale;
      const imgHeight = img.naturalHeight / scale;
      const ratio = imgWidth / imgHeight;

      let finalWidth = usableWidth;
      let finalHeight = finalWidth / ratio;

      if (finalHeight > usableHeight) {
        finalHeight = usableHeight;
        finalWidth = finalHeight * ratio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = margin;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

      const pdfOutput = pdf.output("arraybuffer");
      const pdfOutputBase64 = btoa(
        new Uint8Array(pdfOutput).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const message: PDFMessage = {
        type: "DOWNLOAD_PDF",
        filename: `transaction-receipt-${data?.user_transaction.reference || id}.pdf`,
        base64: pdfOutputBase64,
      };

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      } else {
        // Fallback for web environment
        pdf.save(`transaction-receipt-${data?.user_transaction.reference || id}.pdf`);
      }
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5 bg-white text-black">
      {/* ---- CAPTURED AREA (PDF ONLY) ---- */}
      <div ref={printref} className="bg-white text-black p-4">
        <div className="w-full flex justify-center">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-10 md:h-10 mr-2 flex-shrink-0"
          />
        </div>

        <h3 className="pt-4 font-[500] text-2xl text-center">
          {data?.user_transaction.purpose === "property"
            ? `Payment Details`
            : `Transaction Details`}
        </h3>

        <div className="flex flex-col mt-5 border-t border-gray-200">
          {/* From */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">From</p>
              <p className="font-bold text-xs">{data?.user_transaction.beneficiary_name}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Description</p>
              <p className="font-bold text-xs">{data?.user_transaction.description}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Payment Method</p>
              <p className="font-bold text-xs">{data?.user_transaction.payment_type}</p>
            </div>
          </div>

          {/* Payment Type + Amount */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Payment Type</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.transaction_type ||
                  (data?.user_transaction.purpose === "fund" ? "Credit" : "Debit")}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">Amount Paid</p>
              <p className="font-bold text-xs">
                {formatPrice(data?.user_transaction.amount_paid ?? 0)}
              </p>
            </div>
          </div>

          {/* Reference */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Reference</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.reference}
              </p>
            </div>
            <CopyButton text={data?.user_transaction.reference || ""} />
          </div>

          {/* Status */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Status</p>
              <div className="font-bold text-xs">
                {renderStatusBadge(data?.user_transaction.status ?? 2)}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-gray-400 text-xs">Date</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.created_at 
                  ? new Date(data.user_transaction.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- BUTTONS (NOT INCLUDED IN PDF) ---- */}
      <div className="flex justify-between px-4">
        <ShareButton
          url={receiptData?.download_url}
          className="text-xs bg-transparent !text-black hover:!bg-transparent border border-gray-300 px-4 py-2 rounded"
        />

        <Button
          onClick={handleDownloadPdf}
          label={isDownloading ? "Generating..." : "Download PDF"}
          className="bg-black !w-fit px-6 text-xs text-white hover:bg-gray-800"
          disabled={isDownloading || gettingReceipt}
        />
      </div>
    </div>
  );
};

export default TransactionDetail;