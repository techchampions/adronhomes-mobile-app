import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/utils";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: string;
  location: string;
  imageUrl?: string;
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
    <div className=" p-5 sm:p-6 md:p-8  flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center bg-gray-100 rounded-full">
              <FaUser className="text-gray-400 text-3xl" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-xs text-gray-500">Joined {formatDate(joinedDate)}</p>
          <div className="flex items-center justify-center sm:justify-start text-xs text-gray-500">
            <FaMapMarkerAlt className="mr-1 h-3 w-3" />
            <span>{location ??"N/A"}</span>
          </div>
        </div>
      </div>

      {/* Settings Link */}
      <div className="text-center md:text-right">
        <Link
          to="/dashboard/settings"
          className="inline-block  hover:bg-gray-200 transition px-4 py-2  text-sm font-medium text-gray-800 bg-white rounded-2xl"
        >
          Account Settings
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
