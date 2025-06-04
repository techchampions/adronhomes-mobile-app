import { MdPending } from "react-icons/md";
const PaymentPending = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center py-0 gap-4">
      {/* <img src="/ep_success-filled.svg" alt="" className="h-32 w-32" /> */}
      <MdPending className="h-32 w-32 text-gray-400" />
      <h4 className="font-bold">Processing</h4>
      <p className="text-gray-400 text-center text-sm">{text}</p>
    </div>
  );
};

export default PaymentPending;
