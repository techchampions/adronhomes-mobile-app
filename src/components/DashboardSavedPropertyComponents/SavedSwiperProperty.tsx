import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
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
  FaRegHeart,
} from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import Button from "../Button";
import { formatPrice } from "../../data/utils";
import { useToastStore } from "../../zustand/useToastStore";
import { useToggleSaveProperty } from "../../data/hooks";

import LinkButton from "../LinkButton";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Property } from "../../data/types/propertiesPageTypes";

interface Props {

  saved_property: Property | null;

}

export default function SavedSwiperPropertyCard({ saved_property }: Props) {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { mutate: toggleSave } = useToggleSaveProperty();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      if (
        typeof swiper.params.navigation === "object" &&
        swiper.params.navigation !== null
      ) {
        swiper.params.navigation = {
          ...swiper.params.navigation,
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      } else {
        swiper.params.navigation = {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      }
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);


  // Handle null property case
  if (!saved_property) {
    return (
      <div className="rounded-3xl">
        <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-gray-200 animate-pulse">
          <div className="w-full h-full rounded-[40px] bg-gray-300"></div>
        </div>
        <div className="mt-4 space-y-2 bg-white p-6 rounded-3xl">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse mt-4"></div>
        </div>
      </div>
    );
  }


  const isRented =
    saved_property?.purpose?.includes("rent") ||
    saved_property?.purpose?.includes("Rent") ||
    false;


  const address = `${saved_property?.street_address || ''}, ${saved_property?.lga || ''}, ${saved_property?.state || ''} ${saved_property?.country || ''}`;
  
  const features = saved_property?.features || [];
  const hasFeatures = features.length > 0;


  const toggleSaveProperty = async () => {
    toggleSave(saved_property?.id || 0, {
      onSuccess: () => {
        showToast("Property removed successfully", "success");
        setIsSaved(!isSaved);
      },
    });
  };

  const photos = Array.isArray(saved_property?.photos) ? saved_property.photos : [];
  const hasPhotos = photos.length > 0;

  return (
    <div className="rounded-3xl">
      <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
        {/* Swiper Carousel */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onInit={(swiperInstance) => setSwiper(swiperInstance)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          className="w-full h-full rounded-[40px]"
        >
          {hasPhotos ? (
            photos.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="object-cover rounded-3xl h-full w-full"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src="/placeholder.jpg"
                alt="No property images available"
                className="object-cover rounded-3xl h-full w-full"
              />
            </SwiperSlide>
          )}
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
          {saved_property?.name || "Property Name"}
        </h4>
        <div className="text-xs text-gray-400 flex items-center mt-1 truncate">
          <FaMapMarkerAlt className="mr-1" /> 
          {address}
        </div>

        {/* Fixed: Replaced <p> with <div> to fix hydration error */}
        <div className="text-lg font-black text-adron-black mt-4 flex justify-between items-center">
          <span>{formatPrice(saved_property?.price ?? 0)}</span>
          <div className="mr-2 cursor-pointer" onClick={toggleSaveProperty}>
            {isSaved ? (
              <FaHeart className="text-adron-green" size={20} />
            ) : (
              <FaRegHeart className="text-gray-500" size={20} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-[10px] font-bold text-gray-500 gap-2">
            {hasFeatures ? (
              <>
                <span className="flex items-center gap-1 truncate">
                  <img src="/ruler.svg" width={14} height={14} alt="ruler" />
                  {features[0] || "Size"}
                </span>
                <span className="flex items-center gap-1 truncate">
                  <GiStreetLight /> {features[1] || "Feature"}
                </span>
                <span className="flex items-center gap-1 truncate">
                  <img src="/dumbbell.svg" width={14} height={14} alt="dumbbell" />
                  {features[2] || "Gym"}
                </span>
              </>
            ) : (
              <span className="text-gray-400">No features available</span>
            )}
          </div>
        </div>

        
        <div className="flex items-center gap-2 text-[10px]">
          <div>Payment Duration:</div>
          <div className="font-bold">
            {saved_property?.property_duration_limit || 0} month(s) max

          </div>
        </div>

        <div className="grid grid-cols-2 items-center justify-between gap-2">
          <Button
            label="View Property"
            className="bg-adron-green text-xs py-3"
            onClick={() =>
              navigate(`/dashboard/properties/${saved_property?.id}`)
            }
          />
          {isRented ? (
            <LinkButton

              href={saved_property?.whatsapp_link || "#"}
              label="Inquire"
              icon={<IoLogoWhatsapp className="h-4 w-4" />}
              className="text-xs py-3 !bg-transparent !text-green-700 border hover:!bg-green-700 hover:!text-white"
            />

          ) : (saved_property?.unit_available ?? 0) < 1 ? (

            <Button
              label="Sold out"
              className="!bg-transparent !text-red-500 border text-xs py-3"
              onClick={() => showToast("This Property is sold out", "error")}
            />
          ) : (
            <Button
              label="Subscribe"
              className="!bg-transparent !text-black border hover:!text-white hover:!bg-black text-xs py-3"
              onClick={() =>
                navigate(
                  `/dashboard/invest-property-form/${saved_property?.id}`
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}