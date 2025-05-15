import React from "react";
import Button from "../Button";
import { useGetNotificationByID } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import SmallLoader from "../SmallLoader";
import { formatDate, formatPrice } from "../../data/utils";

const NotificationDetail = ({ id }) => {
  const { data, isLoading, isError } = useGetNotificationByID(id);
  if (isError) {
    return <ApiErrorBlock />;
  }
  if (isLoading) {
    return <SmallLoader />;
  }
  return (
    <div className="space-y-5">
      <div className="absolute top-4 left-9 ">
        <h4 className="font-bold text-lg">{data?.notification.title}</h4>
        <p className="text-sm text-gray-400">
          {formatDate(data?.notification.created_at ?? "")}
        </p>
      </div>
      <div className="mt-10 text-sm space-y-4">
        <p className="">{data?.notification.content}</p>
        <ul className="text-gray-500 list-disc ml-5">
          <li>Spacious living room with natural light</li>
          <li>Modern kitchen with stainless steel appliances</li>
          <li>Master suite with en-suite bathroom</li>
          <li>Large backyard perfect for entertaining</li>
          <li>2-car garage</li>
          <li>Close to schools, shopping, and parks!</li>
        </ul>
        <p className="font-bold">
          Price: {formatPrice(data?.notification.property?.price ?? 0)}
        </p>
      </div>
      <div className="flex justify-between">
        <Button label="View Property" className="bg-black px-6 text-xs" />
      </div>
    </div>
  );
};
export default NotificationDetail;
