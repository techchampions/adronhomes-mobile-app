import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/utils";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  location: string;
  imageUrl: string;
}

const UserProfileCard: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  joinedDate,
  location,
  imageUrl,
}) => {
  return (
    <div className="bg-white py-6 px-12 rounded-3xl flex flex-col md:flex-row justify-between items-center md:items-end">
      <div className="flex items-start gap-6 py-5">
        <img
          src={imageUrl}
          alt={firstName}
          className="w-[140px] h-[140px] rounded-full object-cover"
        />
        <div className="space-y-1.5">
          <h4 className="text-2xl font-bold">
            {firstName} {lastName}
          </h4>
          <p className="text-gray-600 text-sm">{email}</p>
          <p className="text-gray-500 text-xs">
            Joined {formatDate(joinedDate)}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            {location}
          </div>
        </div>
      </div>
      <Link to="/settings" className="text-sm font-semibold text-black">
        Account Settings
      </Link>
    </div>
  );
};

export default UserProfileCard;
