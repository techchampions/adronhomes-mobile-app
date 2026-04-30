import React from "react";
import { UserProperty } from "../../data/types/dashboardHomeTypes";
import LinkButton from "../LinkButton2";
interface Prop {
  item: UserProperty;
}
const GiftNotification: React.FC<Prop> = ({ item }) => {
  // const { openTransModal } = useModalStore();
  // const handleOpen = () => {
  //   openTransModal(
  //     <SelectGiftPackage packages={item.eligible_gifts} property_id={item.id} />
  //   );
  // };
  return (
    <div className=" my-auto px-12 py-5 text-white space-y-2">
      <div className="font-adron-bold text-lg">Gift available</div>
      <div className="text-sm">
        Gifts available for {item.property.name} {item.property.size} SqM
      </div>
      {/* <Button
        label="Claim now!"
        className="w-fit! px-7 text-sm"
        onClick={handleOpen}
      /> */}
      <LinkButton
        link={`/dashboard/my-property/${item.id}`}
        label="Claim now!"
        className="w-fit! px-7 text-sm"
      />
    </div>
  );
};

export default GiftNotification;
