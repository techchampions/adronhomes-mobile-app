import { Gift } from "lucide-react";
import React from "react";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import SelectGiftPackage from "./SelectGiftPackage";
interface Prop {
  eligible_gifts: EligibleGift[];
  property_id: number;
  plan_id?: number;
}
const GiftIndicator: React.FC<Prop> = ({
  eligible_gifts,
  property_id,
  plan_id,
}) => {
  const modal = useModalStore();
  const handleClick = () => {
    if (eligible_gifts.length > 0) {
      modal.openTransModal(
        <SelectGiftPackage
          packages={eligible_gifts}
          property_id={property_id}
          plan_id={plan_id}
        />
      );
    }
  };
  return (
    <div className="bg-adron-green/20 text-green-800 border border-adron-green rounded-xl py-2 px-4 flex gap-2 items-center">
      <Gift />
      <div className="flex items-center flex-1 justify-between">
        <div className="flex-1 text-xs md:text-sm">
          <b className="font-adron-bold">Gifts available</b>{" "}
          <span>you have gifts available for this property</span>
        </div>
        <Button
          label="Claim now!"
          className="w-fit! px-5 text-xs"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default GiftIndicator;
