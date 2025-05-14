import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import { useGetPropertyByID } from "../data/hooks";
import Loader from "./Loader";
import ApiErrorBlock from "./ApiErrorBlock";
import { formatPrice } from "../data/utils";

type Prop = {
  id: number | string;
};
const PropertySummary: React.FC<Prop> = ({ id }) => {
  const { data, isError, isLoading } = useGetPropertyByID(id);
  const property = data?.data.properties[0];
  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <img
          //   src="/treasure-park-bg.png"
          src={property?.display_image}
          className="h-[100px] w-[150px] rounded-lg "
          alt=""
        />
        <div className="w-full md:w-auto space-y-2 md:space-y-0">
          <h4 className="text-xl font-semibold">
            {property?.name}
            Treasure Parks and Gardens
          </h4>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaMapMarkerAlt className="h-4 w-4" />
            {/* 34, Shimawa, Ogun
                  State, Nigeria */}
            {property?.street_address}, {property?.lga}, {property?.state},{" "}
            {property?.country}
          </p>
          <div className="flex items-center text-sm md:text-xs mt-2 justify-between font-bold text-gray-500 gap-4">
            <span className="flex items-center gap-1 truncate">
              {/* <TfiRulerAlt2 />  */}
              <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />
              {/* 648 Sq M */}
              {property?.size}
            </span>
            <span className="flex items-center gap-1 truncate">
              <GiStreetLight />
              Str Light
            </span>
            <span className="flex items-center gap-1 truncate">
              {/* <FaDumbbell /> */}
              <img src="/dumbbell.svg" width={18} height={18} alt="dumbbell" />
              Gym
            </span>
            <div className="flex items-center gap-1 text-xs ">
              {/* {property?.type} */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right text-2xl font-bold">
        {formatPrice(property?.price ?? 0)}
      </div>
    </div>
  );
};

export default PropertySummary;
