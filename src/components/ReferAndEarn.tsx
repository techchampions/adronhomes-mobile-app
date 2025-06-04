import { FaCircleExclamation } from "react-icons/fa6";
import CopyButton from "./CopyButton";
import Button from "./Button";

const ReferAndEarn = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="absolute top-4 left-8 text-xl font-bold">Referrals</div>
      <div className="flex flex-col relative rounded-2xl bg-[#44691B] text-white p-4 gap-2 text-left overflow-hidden mt-5">
        <img
          src="/images/referNearn-bg.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <p className="w-fit text-2xl font-bold">
          ₦10,000 <br />
        </p>
        <p className="text-xs text-white/50">Referral Balance</p>
        <img
          src="/images/gift.svg"
          alt=""
          className="absolute bottom-0 right-0 h-16 w-16 transform -scale-x-100"
        />
      </div>
      <div className="bg-adron-green-200 rounded-2xl flex justify-center text-center items-center gap-10 p-4">
        <div className="flex flex-col">
          <p className="text-adron-green font-bold text-2xl">4</p>
          <p className="text-xs">Total Referrals</p>
        </div>
        <div className="h-[50px] w-[2px] bg-adron-green"></div>
        <div className="flex flex-col">
          <p className="text-adron-green font-bold text-2xl">3</p>
          <p className="text-xs">Active Referrals</p>
        </div>
      </div>
      <div className="flex text-gray-400 text-xs items-center gap-2">
        <FaCircleExclamation size={24} />
        <p>Please note: Referral cash is only earned from active referrals.</p>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-bold">Referral Link</label>
        <input
          className="bg-adron-body rounded-3xl p-4 text-xs"
          disabled
          value="htttp://myownreferral.adronhomes.com/kfiee"
        />
        <CopyButton
          text="htttp://myownreferral.adronhomes.com/kfiee"
          className="flex w-ful p-2 justify-end"
        />
      </div>
      <div className="w-full flex justify-end mt-10">
        <Button
          label="Transfer to Wallet"
          className=" !w-fit bg-black px-6 text-xs "
        />
      </div>
    </div>
  );
};

export default ReferAndEarn;
