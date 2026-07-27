import CopyButton from "../CopyButton";
import Button from "../Button";
import {
  useGetTransactionReciept,
  useGetWalletTransactionByID,
} from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import { formatPrice } from "../../data/utils";
import { TransactionStatus } from "../../data/types/userTransactionsTypes";
import SmallLoader from "../SmallLoader";
import ShareButton from "../onboardingMobileScreen/onboardingComponents/ShareButton";
import React, { useState } from "react";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';
import { Download } from "lucide-react";
import DownloadReceipt from "../receipt/DownloadReceipt";

interface PDFMessage {
  type: "DOWNLOAD_PDF";
  filename: string;
  base64: string;
}
const WalletTransactionDetail = ({ id }: { id: number }) => {
  const printref=React.useRef<HTMLDivElement>(null)
    const [isDownloading, setIsDownloading] = useState(false);
  const { data, isLoading, isError } = useGetWalletTransactionByID(id);
  const { data: recieptData, isLoading: gettingReciept } =
    useGetTransactionReciept(id);
  if (isLoading) {
    return <SmallLoader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }
  const renderStatusBadge = (status: TransactionStatus) => {
    const statusMap: Record<
      TransactionStatus,
      { label: string; style: string }
    > = {
      1: { label: "Completed", style: "bg-adron-green" },
      2: { label: "Failed", style: "bg-red-600" },
      0: { label: "Pending", style: "bg-gray-600" },
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
        filename: `transaction-receipt-${data?.data.reference || id}.pdf`,
        base64: pdfOutputBase64,
      };

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      } else {
        // Fallback for web environment
        pdf.save(`transaction-receipt-${data?.data.reference || id}.pdf`);
      }
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className="space-y-5">
      <div>
        <div className="flex w-full justify-center">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="mr-1 h-10 flex-shrink-0 md:mr-2 md:h-10"
          />
        </div>
        <h3 className="w-full pt-4 text-center text-2xl font-[500]">
          Transaction Details
        </h3>
        <div className="mt-5 flex flex-col divide-y divide-gray-200">
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">From</p>
              <p className="text-xs font-bold">{data?.data.beneficiary_name}</p>
            </div>
          </div>
          <div className="flex items-start justify-between py-3">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">Description</p>
              <p className="text-xs font-bold">{data?.data.description}</p>
            </div>
          </div>
          <div className="flex items-start justify-between py-3">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">Payment Type</p>
              <p className="text-xs font-bold">
                {data?.data.transaction_type ||
                  (data?.data.purpose === "fund" ? "Credit" : "Debit")}
              </p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-xs text-gray-400">Amount Paid</p>
              <p className="text-xs font-bold">
                {formatPrice(data?.data.amount ?? 0)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">Transaction Reference</p>
              <p className="text-xs font-bold">{data?.data.reference}</p>
            </div>
            <CopyButton text={data?.data.reference} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">Status</p>
              <div className="text-xs font-bold">
                {renderStatusBadge(data?.data.status ?? 2)}
              </div>
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
            title="Wallet Transaction Receipt"
            amount={data?.data.amount ?? 0}
            status={data?.data.status ?? 2}
            reference={data?.data.reference}
            rows={[
              { label: "From", value: data?.data.beneficiary_name },
              { label: "Description", value: data?.data.description },
              {
                label: "Transaction Type",
                value:
                  data?.data.transaction_type ||
                  (data?.data.purpose === "fund" ? "Credit" : "Debit"),
              },
              { label: "Payment Method", value: data?.data.payment_type },
              { label: "Reference", value: data?.data.reference },
              {
                label: "Date",
                value: data?.data.created_at
                  ? new Date(data.data.created_at).toLocaleString("en-NG", {
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
          url={recieptData?.download_url}
          title="Wallet transaction receipt"
          text="View my Adron Homes transaction receipt"
          className="h-11 justify-center border border-gray-300 bg-white !text-gray-800 hover:!bg-gray-50"
        />
        <Button
          onClick={handleDownloadPdf}
          label={isDownloading ? "Generating..." : "Download PDF"}
          icon={<Download className="h-4 w-4" />}
          className="h-11 bg-gray-950 px-4 text-xs text-white hover:bg-gray-800"
          disabled={isDownloading}
        />
      </div>
    </div>
  );
};

export default WalletTransactionDetail;
