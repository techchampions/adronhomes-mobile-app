const SubscriptionPending = () => {
  return (
    <div className="w-sm max-w-xs md:max-w-sm flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="border-b-2 border-r-2 rounded-full animate-spin h-20 w-20">
            {/* <Loader2 size={70} className="text-zinc-300 animate-spin" /> */}
          </div>
        </div>
        <div className={`text-2xl font-bold capitalize text-zinc-700`}>
          Your Payment is Pending!
        </div>
      </div>
      <div className="space-y-2 text-sm text-center leading-4">
        <p className="">
          We have received your proof of payment for the bank transfer payment
          you made.
        </p>
        <p className="">
          Please allow us to verify your payments within 48hours after which
          your property plan will be created and you will be able to monitor
          your property from your dashboard.
        </p>
        <p>Thank you for choosing Adron Homes.</p>
      </div>
    </div>
  );
};

export default SubscriptionPending;
