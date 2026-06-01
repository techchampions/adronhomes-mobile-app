import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import React from "react";
type Props = {
  status: "success" | "failed" | "pending";
  text?: string;
};
const PaymentStatus: React.FC<Props> = ({ status, text }) => {
  return (
    <div className="w-xs max-w-sm flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        {status === "success" && (
          <CheckCircle2 size={70} className="text-green-500" />
        )}
        {status === "failed" && (
          <AlertCircle size={70} className="text-red-500" />
        )}
        {status === "pending" && (
          <Loader2 size={70} className="text-gray-500" />
        )}
        <div
          className={`text-2xl font-bold capitalize ${
            status === "success"
              ? "text-green-500"
              : status === "failed"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="">{text || ""}</div>
    </div>
  );
};

export default PaymentStatus;
