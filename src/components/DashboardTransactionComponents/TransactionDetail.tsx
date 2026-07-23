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
import { Download } from "lucide-react";
import DownloadReceipt from "../receipt/DownloadReceipt";

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
      <div className="flex items-center gap-1">
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
      <div className="bg-white p-4 text-black">
        <div className="flex w-full justify-center">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="mr-2 h-10 flex-shrink-0 md:h-10"
          />
        </div>

        <h3 className="pt-4 text-center text-2xl font-[500]">
          {data?.user_transaction.purpose === "property"
            ? "Payment Details"
            : "Transaction Details"}
        </h3>

        <div className="mt-5 flex flex-col border-t border-gray-200">
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">From</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.beneficiary_name}
              </p>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Description</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.description}
              </p>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Payment Method</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.payment_type}
              </p>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Payment Type</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.transaction_type ||
                  (data?.user_transaction.purpose === "fund" ? "Credit" : "Debit")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Amount Paid</p>
              <p className="text-xs font-bold">
                {formatPrice(data?.user_transaction.amount_paid ?? 0)}
              </p>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Reference</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.reference}
              </p>
            </div>
            <CopyButton text={data?.user_transaction.reference || ""} />
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <div className="text-xs font-bold">
                {renderStatusBadge(data?.user_transaction.status ?? 2)}
              </div>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3">
            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-xs font-bold">
                {data?.user_transaction.created_at
                  ? new Date(data.user_transaction.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{ position: "fixed", left: "-10000px", top: 0 }}
      >
        <div ref={printref}>
          <DownloadReceipt
            title={
              data?.user_transaction.purpose === "property"
                ? "Property Payment Receipt"
                : "Transaction Receipt"
            }
            amount={
              data?.user_transaction.amount_paid ||
              data?.user_transaction.amount ||
              0
            }
            status={data?.user_transaction.status ?? 2}
            reference={data?.user_transaction.reference}
            rows={[
              { label: "From", value: data?.user_transaction.beneficiary_name },
              { label: "Description", value: data?.user_transaction.description },
              {
                label: "Payment Method",
                value: data?.user_transaction.payment_type,
              },
              {
                label: "Transaction Type",
                value:
                  data?.user_transaction.transaction_type ||
                  (data?.user_transaction.purpose === "fund"
                    ? "Credit"
                    : "Debit"),
              },
              { label: "Reference", value: data?.user_transaction.reference },
              {
                label: "Date",
                value: data?.user_transaction.created_at
                  ? new Date(
                      data.user_transaction.created_at
                    ).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "N/A",
              },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ShareButton
          url={receiptData?.download_url}
          title="Adron Homes payment receipt"
          text="View my Adron Homes payment receipt"
          className="h-11 justify-center border border-gray-300 bg-white !text-gray-800 hover:!bg-gray-50"
        />

        <Button
          onClick={handleDownloadPdf}
          label={isDownloading ? "Generating..." : "Download PDF"}
          icon={<Download className="h-4 w-4" />}
          className="h-11 bg-gray-950 px-4 text-xs text-white hover:bg-gray-800"
          disabled={isDownloading || gettingReceipt}
        />
      </div>
    </div>
  );
};

export default TransactionDetail;
