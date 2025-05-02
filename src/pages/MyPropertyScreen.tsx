import React from "react";
import PropertyList from "../components/DashboardPropertyComponent/PropertyList";
const properties = [
  {
    id: 1,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Treasure Islands and Gardens Phantom",
    location: "Ejigbo Wuse, Lagos",
    raisedAmount: 4507500,
    targetAmount: 140500500,
  },
  {
    id: 2,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Treasure Islands and Gardens Phantom",
    location: "Ikoyi, Lagos",
    raisedAmount: 23500000,
    targetAmount: 100000000,
  },
  {
    id: 3,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Treasure Islands and Gardens Phantom",
    location: "Wuse Zone 5, Abuja",
    raisedAmount: 8000000,
    targetAmount: 95000000,
  },
  {
    id: 4,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Sunrise Estate",
    location: "Port Harcourt, Rivers",
    raisedAmount: 44500000,
    targetAmount: 60000000,
  },
  {
    id: 5,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Ocean Breeze Homes and Beach",
    location: "Lekki Phase 1, Lagos",
    raisedAmount: 32000000,
    targetAmount: 120000000,
  },
  {
    id: 6,
    imageUrl: "/images/treasure-park-bg.png",
    title: "Ocean Breeze Homes and Beach",
    location: "Lekki Phase 1, Lagos",
    raisedAmount: 32000000,
    targetAmount: 120000000,
  },
];

const MyPropertyScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">total Properties</p>
          <div className=" flex w-fit mx-auto font-bold rounded-full justify-between items-center gap-2 ">
            <span>2 Houses</span>
            <span className="">•</span>
            <span>3 Lands</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="font-bold">₦170,000,000</p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="font-bold">₦61,000,000</p>
        </div>
      </div>
      <PropertyList properties={properties} />
    </div>
  );
};

export default MyPropertyScreen;
