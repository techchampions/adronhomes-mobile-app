import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useRoutes } from "react-router-dom";
import { useGetUser } from "../../data/hooks";
import Loader from "../Loader";
import ApiErrorBlock from "../ApiErrorBlock";

interface Props {
  name: string;
  email: string;
  joinedDate: string;
  location: string;
  imageUrl: string;
}

const UserProfileCard: React.FC<Props> = ({
  name,
  email,
  joinedDate,
  location,
  imageUrl,
}) => {
  const { data, isLoading, isError } = useGetUser();
  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;

  if (data) {
    const userData = data.user;
    return (
      <div className="bg-white py-6 px-12 rounded-3xl flex flex-col md:flex-row justify-between items-center md:items-end">
        <div className="flex items-start gap-6 py-5">
          <img
            src={imageUrl}
            alt={name}
            className="w-[140px] h-[140px] rounded-full object-cover"
          />
          <div className="space-y-1.5">
            <h4 className="text-2xl font-bold">
              {userData.first_name} {userData.last_name}
            </h4>
            <p className="text-gray-600 text-sm">{userData.email}</p>
            <p className="text-gray-500 text-xs">
              Joined {userData.created_at}
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
  }
};

export default UserProfileCard;
