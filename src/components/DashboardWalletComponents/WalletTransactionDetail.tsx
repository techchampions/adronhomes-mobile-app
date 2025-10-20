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
import LinkButton from "../LinkButton";
import ShareButton from "../onboardingMobileScreen/onboardingComponents/ShareButton";
import React, { useState } from "react";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';

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
      1: {
        label: "Completed",
        style: "bg-adron-green",
      },
      2: { label: "Failed", style: "bg-red-600" },
      0: {
        label: "Pending",
        style: "bg-gray-600",
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

const handleDownloadPdf= async()=>{
  const element=printref.current;
  if(!element){
    return
  }
  setIsDownloading(true)
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
    <div className="space-y-5">
            <div ref={printref} >
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
        Transaction Details
        </h3>
      <div className="flex flex-col divide-y divide-gray-200 mt-5">
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">From</p>
            <p className="font-bold text-xs">
              {data?.data.beneficiary_name}
              {/* {data?.user_transaction.payment_type === "Bank Transfer"
                ? data.user_transaction.bank_name
                : data?.user_transaction.payment_type} */}
            </p>
            {/* <p className="font-bold text-xs">(Polaris Bank)</p> */}
          </div>
          {/* <img src="/mika.png" alt="" className="h-7 w-7" /> */}
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Description</p>
            <p className="font-bold text-xs">{data?.data.description}</p>
          </div>
        </div>
        {/* <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Payment Method</p>
            <p className="font-bold text-xs">
              {data?.data.payment_type}
            </p>
          </div>
        </div> */}
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Payment Type</p>
            <p className="font-bold text-xs">
              {data?.data.transaction_type
                ? data.data.transaction_type
                : data?.data.purpose === "fund"
                ? "Credit"
                : "Debit"}
            </p>
          </div>
          <div className="flex flex-col text-left">
            <p className="text-gray-400 text-xs">Amount Paid</p>
            <p className="font-bold text-xs">
              {formatPrice(data?.data.amount ?? 0)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Transaction Reference</p>
            <p className="font-bold text-xs">{data?.data.reference}</p>
          </div>
          <CopyButton text={data?.data.reference} />
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Status</p>
            <div className="font-bold text-xs ">
              {/* {" "}
              <span className="bg-adron-green h-2 w-2 rounded-full"></span>{" "}
              Completed */}
              {renderStatusBadge(data?.data.status ?? 2)}
            </div>
          </div>
        </div>
      </div>
            </div>
       
      <div className="flex justify-between">
       <ShareButton
          url={recieptData?.download_url}
          className="text-xs bg-transparent !text-black hover:!bg-transparent"
        />
       
        <Button
          onClick={handleDownloadPdf}
          label={isDownloading ? 'Generating...' : 'Download'}
          className="bg-[#000000] !w-fit px-6 text-xs text-[#ffffff]"
          disabled={isDownloading}
        />
      </div>
    </div>
  );
};

export default WalletTransactionDetail;