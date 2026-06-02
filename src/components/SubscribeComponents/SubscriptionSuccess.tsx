import { CheckCircle2 } from "lucide-react";
const SubscriptionSuccess = () => {
  return (
    <div className="w-sm max-w-sm flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 size={70} className="text-green-500" />
        <div className={`text-2xl font-bold capitalize text-green-500`}>
          Congratulations!
        </div>
      </div>
      <div className="space-y-2 text-sm text-center leading-4">
        <p className="">
          Your payment has been received successfully by Adron Homes and
          Properties.
        </p>
        <p className="">
          We have sent you an email containing property details, please access
          your dashboard to monitor your property.
        </p>
        <p>Thank you for choosing Adron Homes.</p>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
