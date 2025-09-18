import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import { useGetPropertyByID } from "../data/hooks";
import Loader from "./Loader";
import ApiErrorBlock from "./ApiErrorBlock";
import { formatPrice } from "../data/utils";
import { IoGiftOutline } from "react-icons/io5";

type Prop = {
  id?: number | string;
  units?: number;
};
const PropertySummary: React.FC<Prop> = ({ id, units }) => {
  const { data, isError, isLoading } = useGetPropertyByID(id);
  const property = data?.data.properties[0];
  const features = data?.data.properties[0].features || [];
  const allowedFeatures = ["Gym", "Light"];
  const displayFeatures = features.filter((item) =>
    allowedFeatures.includes(item)
  );

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
          <h4 className="text-xl font-semibold">{property?.name}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaMapMarkerAlt className="h-4 w-4" />
            {property?.street_address}, {property?.state}, {property?.country}
          </p>
          <div className="flex items-center text-sm md:text-xs mt-2 justify-between font-bold text-gray-500 gap-4">
            <span className="flex items-center gap-1 truncate">
              {/* <TfiRulerAlt2 />  */}
              <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />
              {/* 648 Sq M */}
              {property?.size} Sq M
            </span>
            {displayFeatures.map((feature, index) => (
              <span className="flex items-center gap-1 truncate">
                {feature === "Gym" ? (
                  <img
                    src="/dumbbell.svg"
                    width={14}
                    height={14}
                    alt="dumbbell"
                  />
                ) : feature === "Light" ? (
                  <GiStreetLight />
                ) : (
                  <IoGiftOutline />
                )}{" "}
                {feature}{" "}
              </span>
            ))}
            <div className="flex items-center gap-1 text-xs ">
              {/* {property?.type} */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right text-2xl font-bold flex items-center gap-1">
        {formatPrice(property?.price ?? 0)}

        {units && units > 1 && (
          <span className="text-[10px] text-gray-400"> × {units} units</span>
        )}
      </div>
    </div>
  );
};

export default PropertySummary;
