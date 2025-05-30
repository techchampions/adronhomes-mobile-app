import { MdError } from "react-icons/md";

const StatusFailed = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center py-0 gap-4">
      {/* <img src="/ep_success-filled.svg" alt="" className="h-32 w-32" /> */}
      <MdError className="h-32 w-32 text-red-500" />
      <h4 className="font-bold text-red-500">Failed</h4>
      <p className="text-gray-400 text-center text-sm">{text}</p>
    </div>
  );
};

export default StatusFailed;
