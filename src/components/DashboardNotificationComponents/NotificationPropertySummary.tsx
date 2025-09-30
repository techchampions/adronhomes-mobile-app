import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import { useGetPropertyByID } from "../../data/hooks";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import { formatPrice } from "../../data/utils";
import Button from "../Button";

type Prop = {
  id?: number | string;
  units?: number;
};
const NotificationPropertySummary: React.FC<Prop> = ({ id, units }) => {
  const { data, isError, isLoading } = useGetPropertyByID(id);
  const property = data?.data.properties;
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;
  const viewProperty = () => {
    window.location.href = `/properties/${id}`;
  };

  return (
    <div className="flex flex-row justify-between items-start gap-[3%]">
      <div className="flex flex-row gap-[2%] w-[77%]">
        <img
          src={property?.display_image}
          className="h-[70px] w-[30%] rounded-lg "
          alt=""
        />
        <div className="w-[69%] space-y-2 md:space-y-0">
          <h4 className="text-sm font-semibold truncate">{property?.name}</h4>
          <div className="text-[10px] text-gray-500 flex items-center gap-1 w-full">
            <FaMapMarkerAlt className="h-3 w-3" />
            <span className="w-full line-clamp-2">
              {property?.street_address}, {property?.lga}, {property?.state},{" "}
              {property?.country}
            </span>
          </div>
          <Button
            label="View Property"
            className="bg-black !py-1 text-[10px] !w-fit px-5"
            onClick={viewProperty}
          />
        </div>
      </div>
      <div className="text-right w-[20%] text-xs font-bold flex items-center gap-1 truncate">
        {formatPrice(property?.price ?? 0)}
      </div>
    </div>
  );
};

export default NotificationPropertySummary;
