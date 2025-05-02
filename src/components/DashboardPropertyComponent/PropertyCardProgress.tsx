import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Button";

type PropertyCardProps = {
  imageUrl: string;
  title: string;
  location: string;
  raisedAmount: number;
  targetAmount: number;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  title,
  location,
  raisedAmount,
  targetAmount,
}) => {
  const progressPercent = Math.min(
    100,
    (raisedAmount / targetAmount) * 100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 w-full">
      <div className="flex flex-col items-start gap-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="w-full">
          <h4 className="text-2xl text-adron-black leading-tight w-[60%]">
            {title}
          </h4>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            {location}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="w-full h-2.5 bg-adron-green-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-adron-green rounded-3xl"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">
            ₦{raisedAmount.toLocaleString()}
          </span>
          <span className="text-black">₦{targetAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Button label="View Details" className="!w-fit px-4 text-xs" />
      </div>
    </div>
  );
};

export default PropertyCard;
