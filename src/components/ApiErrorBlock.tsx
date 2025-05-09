import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ApiErrorBlock: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] h-[80vh] mx-auto bg-red relative">
      <img src="/500.svg" alt="error" className="h-full w-full" />
      <div className="flex flex-col gap-1 items-center">
        <FaExclamationTriangle size={24} className="text-red-400" />
        <h4 className="text-2xl font-bold text-red-400">Api Error</h4>
      </div>
    </div>
  );
};

export default ApiErrorBlock;
