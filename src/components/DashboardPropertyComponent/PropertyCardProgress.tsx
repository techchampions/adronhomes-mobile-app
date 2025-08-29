import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../zustand/useModalStore";
import SelectPaymentMethod from "../DashboardMyPropertyComponents/SelectPaymentMethod";
import { formatDate } from "../../data/utils";

type PropertyCardProps = {
  id: number;
  createdAt: string;
  user_property_id: number;
  imageUrl: string;
  title: string;
  state: string;
  lga: string;
  progress: number;
  raisedAmount: number;
  targetAmount: number;
  units: number;
  status: number;
  payment_method: string;
  payment_type: number;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  user_property_id,
  createdAt,
  imageUrl,
  title,
  state,
  lga,
  progress,
  raisedAmount,
  targetAmount,
  units,
  status,
  payment_method,
  payment_type,
}) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  // const progressPercent = Math.min(
  //   100,
  //   (raisedAmount / targetAmount) * 100
  // ).toFixed(1);
  const handleNavigation = () => {
    navigate(`/dashboard/my-property/${id}`);
  };
  const makePayment = () => {
    openModal(
      <SelectPaymentMethod
        goBack={closeModal}
        amount={raisedAmount}
        user_property_id={user_property_id}
        payment_type={payment_type}
      />
    );
  };
  const location = `${lga}, ${state}`;
  // if (units > 1) {
  //   raisedAmount = raisedAmount * units;
  //   targetAmount = targetAmount * units;
  // }

  return (
    <div className="bg-white rounded-3xl p-6 w-full shadow">
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-2 items-start">
          <img
            src={imageUrl || "/treasure-park-bg.png"}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col text-xs text-gray-400 items-start gap-1">
            <div className="bg-adron-body rounded-lg px-2 py-1  text-gray-400 text-xs ">
              x {units} units
            </div>
            <div className="">{formatDate(createdAt)}</div>
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
      <div className="mt-4 flex items-center justify-between">
        <Button
          label="View Details"
          className="!w-fit px-4 text-[9px] md:text-xs"
          onClick={handleNavigation}
        />
        {status === 0 && payment_method === "paystack" && (
          <Button
            label="Make Payment"
            className="!w-fit px-4 text-[9px] md:text-xs !bg-transparent !text-adron-green border-1 border-adron-green"
            onClick={makePayment}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
