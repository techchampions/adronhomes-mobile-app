import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
} from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import Button from "../Button";
import { formatPrice } from "../../data/utils";

interface Props {
  property: {
    id: number;
    name: string;
    street_address: string;
    lga: string;
    state: string;
    country: string;
    location: string;
    price: number;
    features: string[];
    photos: string[];
    type: string;
  };
}

export default function SwiperPropertyCard({ property }: Props) {
  const navigate = useNavigate();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiper, setSwiper] = useState(null); // State to store the swiper instance

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.update(); // Ensure the navigation buttons are updated after initialization
    }
  }, [swiper]); // Ensure this effect runs when the swiper instance is available

  const address = `${property.street_address}, ${property.lga}, ${property.state} ${property.country}`;
  // const features = property.features;

  return (
    <div className="rounded-3xl">
      <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
        {/* Swiper Carousel */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onInit={(swiperInstance) => setSwiper(swiperInstance)} // Store swiper instance when it's initialized
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          className="w-full h-full rounded-[40px]"
        >
          {property.photos.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Image ${idx + 1}`}
                className="object-cover rounded-3xl h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronLeft size={30} />
        </button>
        <button
          ref={nextRef}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronRight size={30} />
        </button>
      </div>

      {/* Property Info */}
      <div className="mt-4 space-y-2 bg-white p-6 rounded-3xl">
        <h4 className="text-lg font-adron-text-body font-semibold truncate">
          {property.name}
        </h4>
        <p className="text-xs text-gray-400 flex items-center mt-1">
          <FaMapMarkerAlt className="mr-1" /> {address}
          {/* {`${property.street_address}, ${property.lga}, ${property.state} ${property.country}`} */}
        </p>

        <p className="text-lg font-black text-adron-black mt-4 flex justify-between">
          {formatPrice(property.price ?? 0)} <FaHeart className="mr-2" />
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-[10px] font-bold text-gray-500 gap-2">
            <span className="flex items-center gap-1 truncate">
              {/* <TfiRulerAlt2 />  */}
              <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />

              {property.features[0]}
            </span>
            <span className="flex items-center gap-1 truncate">
              <GiStreetLight /> {property.features[1]}
            </span>
            <span className="flex items-center gap-1 truncate">
              {/* <FaDumbbell /> */}
              <img src="/dumbbell.svg" width={14} height={14} alt="dumbbell" />
              {property.features[2]}
            </span>
          </div>
          <div className="text-gray-400 flex items-center gap-1 text-xs">
            {property.type}
          </div>
        </div>

        <div className="flex items-center justify-between mt-[20px] md:mt-[43px] gap-2">
          <Button
            label="View Property"
            className="bg-adron-green text-xs py-3"
            onClick={() => navigate(`/properties/${property.id}`)}
          />
          <Button
            label="Invest in Property"
            className="!bg-adron-black text-xs py-3"
            onClick={() => navigate(`/invest-property/${property.id}`)}
          />
        </div>
      </div>
    </div>
  );
}
