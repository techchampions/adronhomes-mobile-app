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
import domtoimage from 'dom-to-image';
import Toast from "../Toast";
// import Toast from "../Toast";

const TransactionDetail = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetTransactionByID(id);
  const printref = React.useRef<HTMLDivElement>(null);
  const { data: receiptData, isLoading: gettingReceipt } = useGetPaymentReciept(id);
  const [isDownloading, setIsDownloading] = useState(false);

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
      1: {
        label: "Completed",
        style: "bg-[#79B833]", // Replaced bg-adron-green
      },
      2: {
        label: "Failed",
        style: "bg-[#DC2626]", // Replaced bg-red-600
      },
      0: {
        label: "Pending",
        style: "bg-[#4B5563]", // Replaced bg-gray-600
      },
    };

    const { label, style } = statusMap[status];

    return (
      <div className="flex gap-1 items-center">
        <span className={`h-2 w-2 rounded-full ${style}`}></span>
        {label}
      </div>
    );
  };

  const handleDownloadPdf = async () => {
    const element = printref.current;
    if (!element) {
      console.error('Element to capture is not available');

      return;
    }

    setIsDownloading(true);

    try {
      // Get the actual rendered dimensions of the element
      const rect = element.getBoundingClientRect();
      const elementWidth = rect.width;
      const elementHeight = rect.height;

      // Define a scale factor for better quality
      const scale = 4; // Reduced from 4 to balance quality and file size

      // dom-to-image options
      const imageOptions = {
        quality: 0.95, // High quality PNG
        bgcolor: '#ffffff', // Ensure white background
        width: elementWidth * scale,
        height: elementHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${elementWidth}px`,
          height: `${elementHeight}px`,
        },
      };

      // Generate the image
      const imgData = await domtoimage.toPng(element, imageOptions);

      // Initialize jsPDF with points (pt) for A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // A4 dimensions in points: 595 x 842
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 595 pt
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 842 pt
      const margin = 20; // 20pt margin
      const usablePdfWidth = pdfWidth - 2 * margin;
      const usablePdfHeight = pdfHeight - 2 * margin;

      // Load the image to get its natural dimensions
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => (img.onload = resolve));

      const imgWidth = img.naturalWidth / scale; // Adjust for scale
      const imgHeight = img.naturalHeight / scale;
      const aspectRatio = imgWidth / imgHeight;

      // Calculate dimensions to fit within usable PDF area
      let finalImgWidth = usablePdfWidth;
      let finalImgHeight = usablePdfWidth / aspectRatio;

      // If height exceeds usable PDF height, scale by height instead
      if (finalImgHeight > usablePdfHeight) {
        finalImgHeight = usablePdfHeight;
        finalImgWidth = usablePdfHeight * aspectRatio;
      }

      // Center the image on the page
      const xOffset = (pdfWidth - finalImgWidth) / 2;
      const yOffset = margin; // Start from top margin

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
      pdf.save('adron-receipt.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // alert('Failed to generate receipt. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <div ref={printref} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <div className="w-full justify-center flex ">
         {/* <div className=""> */}
           <img
            src="/logo.png"
            alt="Company Logo"
            className="h-10 md:h-10 mr-1 md:mr-2 flex-shrink-0"
          />
       
         {/* </div> */}

        
      </div>
         <h3 className="  pt-4 font-[500] text-2xl w-full text-center">
          {data?.user_transaction.purpose === "property"
            ? `Payment Details`
            : `Transaction Details`}
        </h3>
        <div className="flex flex-col mt-5" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">From</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.beneficiary_name}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">Description</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.description}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">Payment Method</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.payment_type}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">Payment Type</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.transaction_type
                  ? data.user_transaction.transaction_type
                  : data?.user_transaction.purpose === "fund"
                  ? "Credit"
                  : "Debit"}
              </p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-[#9CA3AF] text-xs">Amount Paid</p>
              <p className="font-bold text-xs">
                {formatPrice(data?.user_transaction.amount_paid ?? 0)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">Transaction Reference</p>
              <p className="font-bold text-xs">
                {data?.user_transaction.reference}
              </p>
            </div>
            <CopyButton text={data?.user_transaction.reference} />
          </div>
          <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div className="flex flex-col">
              <p className="text-[#9CA3AF] text-xs">Status</p>
              <div className="font-bold text-xs">
                {renderStatusBadge(data?.user_transaction.status ?? 2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
      
        <ShareButton
          url={receiptData?.download_url}
          className="text-xs bg-transparent !text-black hover:!bg-transparent"
        />

        <Button
          onClick={handleDownloadPdf}
          label={isDownloading ? 'Generating...' : 'Download'}
          className="bg-[#000000] !w-fit px-6 text-xs text-[#ffffff]"
          disabled={isDownloading || gettingReceipt}
        />
      </div>
    </div>
  );
};

export default TransactionDetail;