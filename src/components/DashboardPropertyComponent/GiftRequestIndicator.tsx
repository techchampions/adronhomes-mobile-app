import { Gift } from "lucide-react";
import React from "react";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import RequestedGift from "./RequestedGift";
interface Prop {
  gift_request?: GiftRequest;
}
const GiftRequestIndicator: React.FC<Prop> = ({ gift_request }) => {
  const modal = useModalStore();
  const handleClick = () => {
    if (gift_request) {
      modal.openTransModal(<RequestedGift gift_request={gift_request} />);
    }
  };
  return (
    <div className="bg-adron-green/20 text-green-800 border border-adron-green rounded-xl py-2 px-4 flex gap-2 items-center">
      <Gift />
      <div className="flex items-center flex-1 justify-between">
        <div className="flex-1 text-xs md:text-sm">
          <b className="font-adron-bold">Gifts available</b>{" "}
          <span>
            you have already requested for the gifts available on this property
          </span>
        </div>
        <Button
          label="View Gift Items"
          className="w-fit! px-5 text-xs"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default GiftRequestIndicator;
