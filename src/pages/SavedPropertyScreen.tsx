import React from "react";
import SwiperPropertyList from "../components/DashboardNewPropertyComponent/SwiperPropertyList";
import FilterBar from "../components/DashboardNewPropertyComponent/FilterBar";

const properties = [
  {
    id: "prop-001",
    name: "Treasure Island Homes",
    location: "Ejigbo Wuse, Lagos",
    street_address: "12 Green Way",
    lga: "Ejigbo",
    state: "Lagos",
    country: "Nigeria",
    price: "₦4,507,500",
    features: ["600sqm", "Paved Roads", "Gym Facility"],
    type: "Bungalow",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
  {
    id: "prop-002",
    name: "Sunrise Garden Villas",
    location: "Maitama, Abuja",
    street_address: "45 Sunrise Street",
    lga: "Maitama",
    state: "FCT",
    country: "Nigeria",
    price: "₦8,000,000",
    features: ["500sqm", "Street Lights", "Fitness Center"],
    type: "Duplex",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
  {
    id: "prop-003",
    name: "Ocean Breeze Apartments",
    location: "Lekki Phase 1, Lagos",
    street_address: "88 Coral Avenue",
    lga: "Lekki",
    state: "Lagos",
    country: "Nigeria",
    price: "₦12,500,000",
    features: ["350sqm", "24hr Light", "Clubhouse"],
    type: "Apartment",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
  {
    id: "prop-545",
    name: "Ocean Breeze Apartments",
    location: "Lekki Phase 1, Lagos",
    street_address: "88 Coral Avenue",
    lga: "Lekki",
    state: "Lagos",
    country: "Nigeria",
    price: "₦12,500,000",
    features: ["350sqm", "24hr Light", "Clubhouse"],
    type: "Apartment",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
  {
    id: "prop-657",
    name: "Ocean Breeze Apartments",
    location: "Lekki Phase 1, Lagos",
    street_address: "88 Coral Avenue",
    lga: "Lekki",
    state: "Lagos",
    country: "Nigeria",
    price: "₦12,500,000",
    features: ["350sqm", "24hr Light", "Clubhouse"],
    type: "Apartment",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
  {
    id: "prop-242",
    name: "Ocean Breeze Apartments",
    location: "Lekki Phase 1, Lagos",
    street_address: "88 Coral Avenue",
    lga: "Lekki",
    state: "Lagos",
    country: "Nigeria",
    price: "₦12,500,000",
    features: ["350sqm", "24hr Light", "Clubhouse"],
    type: "Apartment",
    photos: [
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
      "/images/treasure-park-bg.png",
    ],
  },
];

const SavedPropertyScreen = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center mx-auto text-center space-y-2 my-7">
        <p className="text-sm md:text-md w-[65%] md:w-full mx-auto font-bold mb-5">
          A list of your favorite properties{" "}
        </p>
      </div>

      <SwiperPropertyList properties={properties} />
    </div>
  );
};

export default SavedPropertyScreen;
