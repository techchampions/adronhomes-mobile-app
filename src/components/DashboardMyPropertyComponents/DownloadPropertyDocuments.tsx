import React from "react";
import { ContractDocument } from "../../data/types/PropertyPlanDetailTypes";
import { Link } from "react-router-dom";
import { IoDownloadOutline } from "react-icons/io5";
interface Props {
  contractDocuments: ContractDocument[];
}
const DownloadPropertyDocuments: React.FC<Props> = ({ contractDocuments }) => {
  return (
    <div>
      <h4 className="absolute top-4 left-4 font-bold text-lg">
        Download Property Documents
      </h4>
      <div className="flex flex-col gap-2 py-6 divide-y-1 divide-gray-300">
        {contractDocuments.map((item, index) => (
          <div className="flex justify-between w-full p-2 text-sm" key={index}>
            <span className="line-clamp-1">{item.document_name}</span>
            <a
              href={item.document_file}
              className="flex items-center text-xs gap-1 text-gray-500 font-bold"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <IoDownloadOutline />
              <span>Download</span>
            </a>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadPropertyDocuments;
