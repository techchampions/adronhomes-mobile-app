import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

type PropertyCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  state: string;
  lga: string;
  progress: number;
  raisedAmount: number;
  targetAmount: number;
  units: number;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  imageUrl,
  title,
  state,
  lga,
  progress,
  raisedAmount,
  targetAmount,
  units,
}) => {
  const navigate = useNavigate();
  // const progressPercent = Math.min(
  //   100,
  //   (raisedAmount / targetAmount) * 100
  // ).toFixed(1);
  const handleNavigation = () => {
    navigate(`/my-property/${id}`);
  };
  const location = `${lga}, ${state}`;
  if (units > 1) {
    raisedAmount = raisedAmount * units;
    targetAmount = targetAmount * units;
  }

  return (
    <div className="bg-white rounded-3xl p-6 w-full">
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-2 items-start">
          <img
            src={imageUrl}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="bg-adron-body rounded-lg px-2 py-1  text-gray-400 text-xs ">
            x {units} units
          </div>
        </div>
        <div className="w-full">
          <h4 className="text-lg md:text-2xl text-adron-black leading-tight w-full line-clamp-2">
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
            style={{ width: `${progress}%` }}
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
        <Button
          label="View Details"
          className="!w-fit px-4 text-xs"
          onClick={handleNavigation}
        />
      </div>
    </div>
  );
};

export default PropertyCard;
