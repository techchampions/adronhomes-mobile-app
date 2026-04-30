import { Gift } from "lucide-react";
import React from "react";
import { useModalStore } from "../../zustand/useModalStore";
import ClaimGift from "./ClaimGift";
interface Prop {
  packages: EligibleGift[];
  property_id: number;
  plan_id?: number;
}
const SelectGiftPackage: React.FC<Prop> = ({
  packages,
  property_id,
  plan_id,
}) => {
  const { openModal } = useModalStore();
  return (
    <div className="w-sm max-w-xs md:max-w-sm">
      <div className="text-center text-white text-3xl pb-10 font-adron-bold">
        Select Gift Package
      </div>
      <div className="grid gap-4">
        {packages.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                if (item) {
                  openModal(
                    <ClaimGift
                      gift={item}
                      property_id={property_id}
                      plan_id={plan_id}
                    />
                  );
                }
              }}
              className="text-center min-h-46 min-w-43 max-w-43 mx-auto flex flex-col items-center text-white cursor-pointer bg-gradient-to-br from-adron-green to-gray-600 p-6 group hover:from-adron-green-900 hover:to-black rounded-xl"
            >
              <div className="flex group-hover:hidden flex-col gap-4 items-center ">
                <div className="">
                  <Gift size={50} />
                </div>
                <div className="text-sm line-clamp-3">{item.promo_name}</div>
              </div>
              <div className="hidden group-hover:flex justify-center items-center my-auto text-3xl font-adron-bold">
                Claim Now !
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectGiftPackage;
