import React from "react";
import Button from "../Button";

const NotificationDetail = ({ id }) => {
  return (
    <div className="space-y-5">
      <div className="absolute top-4 left-9 ">
        <h4 className="font-bold text-lg">New Property Alert </h4>
        <p className="text-sm text-gray-400">15th May, 2024: 9:00PM</p>
      </div>
      <div className="mt-10 text-sm space-y-4">
        <p className="">
          We are excited to announce the availability of a beautiful 3-bedroom,
          2-bathroom home at 123 Maple Lane, Springfield, IL. This charming
          property features:
        </p>
        <ul className="text-gray-500 list-disc ml-5">
          <li>Spacious living room with natural light</li>
          <li>Modern kitchen with stainless steel appliances</li>
          <li>Master suite with en-suite bathroom</li>
          <li>Large backyard perfect for entertaining</li>
          <li>2-car garage</li>
          <li>Close to schools, shopping, and parks!</li>
        </ul>
        <p className="font-bold">Price: ₦61,000,000</p>
      </div>
      <div className="flex justify-between">
        <Button label="View Property" className="bg-black px-6 text-xs" />
      </div>
    </div>
  );
};
export default NotificationDetail;
