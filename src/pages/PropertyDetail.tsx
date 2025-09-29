import { Form, Formik } from "formik";
import { PiRoadHorizonDuotone } from "react-icons/pi";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMapMarker,
} from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuFence } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Navigation } from "swiper/modules";
import DOMPurify from "dompurify";
import "swiper/css";
import "swiper/css/navigation";
import { GiGate, GiStreetLight } from "react-icons/gi";
import {
  useEnquireProperty,
  useGetPropertyByID,
  useToggleSaveProperty,
} from "../data/hooks";
import { formatDate, formatPrice } from "../data/utils";
import ApiErrorBlock from "../components/ApiErrorBlock";
import Loader from "../components/Loader";
import { LiaLandmarkSolid, LiaToiletSolid } from "react-icons/lia";
import { TbBed } from "react-icons/tb";
import {
  IoCarSportOutline,
  IoClose,
  IoConstructOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useUserStore } from "../zustand/UserStore";
import { useToastStore } from "../zustand/useToastStore";
import HorizontalPropertyList from "../components/DashboardPropertyComponent/HorizontalPropertyList";
import { FileStack, LoaderCircle, MapPinned, PhoneCall } from "lucide-react";
import { MdOutlineLandscape } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useModalStore } from "../zustand/useModalStore";
import InlineLoader from "../components/InlineLoader";
// import DiscountBanner from "../components/DashboardPropertyComponent/DiscountBanner";
const PropertyDetail = () => {
  const modal = useModalStore();
  const params = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [showMap, setshowMap] = useState(false);
  const [showFiles, setshowFiles] = useState(false);
  const id = params?.id;
  const { showToast } = useToastStore();
  const { data, isError, isLoading } = useGetPropertyByID(id ?? "");
  const { mutate: toggleSave, isPending: isSaving } = useToggleSaveProperty();
  const { mutate: enquire, isPending } = useEnquireProperty();
  // const [showDiscountBanner, setshowDiscountBanner] = useState(
  //   data?.data.properties[0].is_discount || false
  // );
  // Refs for navigation
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  if (isError) return <ApiErrorBlock />;
  if (isLoading || !data) return <Loader />;
  const item = data?.data.properties;
  const photoLenght = item?.photos.length || 0;
  const features = item?.features || [];
  const isRented =
    item?.purpose?.includes("rent") || item?.purpose?.includes("Rent") || false;

  let address = "All Adron locations.";
  if (item.street_address && item.state && item.country) {
    address = `${item.street_address}, ${item.state} ${item.country}`;
  }

  const unitsAvialable = item?.unit_available || 0;
  // Filter items by purpose

  const bungalows = item.details.filter(
    (item) => item.purpose.toLowerCase() == "bungalow"
  );
  const duplexes = item.details.filter(
    (item) => item.purpose.toLowerCase() == "duplex"
  );

  // Calculate totals
  const bungalowTotal = bungalows.reduce((sum, item) => sum + item.value, 0);
  const duplexTotal = duplexes.reduce((sum, item) => sum + item.value, 0);

  const invest = () => {
    // navigate(`/invest-property/${id}`);
    navigate(`/dashboard/invest-property-form/${id}`);
  };
  const totalFees = data?.data.properties.details.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const description = data.data.properties.description;
  const sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div className="flex flex-col w-full px-4 md:px-0 pb-0">
      {/* <DiscountBanner
        discount_name={item.discount_name}
        discount_percent={item.discount_percentage}
        discount_unit={item.discount_percentage}
        isOpen={showDiscountBanner}
        close={() => setshowDiscountBanner(false)}
      /> */}
      <div className="w-full flex flex-col md:flex-row justify-between md:items-start my-5">
        <div className="flex flex-col gap-4  md:w-[70%]">
          <h4 className="font-bold text-3xl md:text-6x">
            {/* Treasure Parks and Gardens */}
            {data?.data.properties.name}
          </h4>
          <p className="flex gap-2">
            <FaMapMarker />
            <span>{address}</span>
          </p>
        </div>
        <div className="flex justify-between gap-4 mt-3 md:mt-0">
          <div
            className="p-4 rounded-full bg-white/50 w-fit cursor-pointer"
            onClick={() => toggleSave(item.id)}
          >
            {isSaving ? (
              <InlineLoader />
            ) : (
              <FaHeart
                className={`${
                  item.is_saved ? "text-adron-green" : "text-black"
                }`}
              />
            )}
          </div>
          {item.whatsapp_link && isRented ? (
            <a href={item.whatsapp_link}>
              <Button
                label="Inquire on WhatsApp"
                icon={<IoLogoWhatsapp size={18} />}
                className="px-6 py-3 text-sm"
              />
            </a>
          ) : unitsAvialable < 1 ? (
            <Button
              label="Sold out"
              className="!bg-transparent !text-red-500 border text-xs px-6"
              onClick={() => showToast("This Property is sold out", "error")}
            />
          ) : (
            <Button
              label="Subscribe"
              className="px-10 text-sm"
              onClick={invest}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10">
        {/* Property details */}

        {/* Main slider and thumbnails */}
        <div className="w-full mx-auto">
          {/* Main slider */}

          {photoLenght > 0 && (
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden mt-4">
              <Swiper
                spaceBetween={10}
                slidesPerView={1.3}
                // navigation={true}
                onInit={(swiperInstance) => setSwiper(swiperInstance)} // Store swiper instance when it's initialized
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                modules={[Navigation]}
                breakpoints={{
                  320: {
                    slidesPerView: photoLenght < 2 ? 1 : 1.1,
                  },
                }}
                className="w-full h-full rounded-xl"
              >
                {item?.photos.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`Image ${idx + 1}`}
                      className="object-cover h-full w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
          )}

          <div className="flex flex-col my-5 gap-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center text-sm justify-between font-bold text-gray-500 gap-4 md:gap-10">
                <span className="flex items-center gap-1 truncate">
                  {/* <TfiRulerAlt2 />  */}
                  <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />
                  {item?.size} Sq M
                </span>
                <span className="flex items-center gap-1 truncate">
                  <GiStreetLight /> Str Light
                </span>
                <span className="flex items-center gap-1 truncate">
                  {/* <FaDumbbell /> */}
                  <img
                    src="/dumbbell.svg"
                    width={18}
                    height={18}
                    alt="dumbbell"
                  />
                  Gym
                </span>
                <div className="flex items-center gap-1 text-sm">
                  {item?.type.name}
                </div>
              </div>
              {isRented ? (
                <div className="flex flex-col items-end mt-3 md:mt-0 text-cyan-700">
                  For Rent
                </div>
              ) : (
                <div className="flex flex-col items-end mt-3 md:mt-0">
                  <div className="flex items-center gap-2">
                    {item?.is_discount && (
                      <div className="bg-red-700 text-white text-xs px-2 py-1 rounded-full">
                        {item.discount_percentage}% off
                      </div>
                    )}
                    <div className="text-2xl font-bold ">
                      {formatPrice(item?.price ?? 0)}
                    </div>
                  </div>
                  {item?.initial_deposit && (
                    <div className="flex items-center text-gray-700 text-xs bg-[#CFFFCF] p-2 rounded-full">
                      Initial Deposit{" "}
                      <span className="text-bold text-adron-green text-sm ml-2">
                        {formatPrice(item?.initial_deposit || 0)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full md:w-[70%] gap-10">
                {item?.nearby_landmarks !== null && (
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <LiaLandmarkSolid />
                      <h4 className="font-bold text-md">Landmarks:</h4>
                    </div>
                    <div className="flex flex-wrap ml-5 text-sm">
                      <span className="bg-gray-300 py-1 px-2 rounded-md">
                        {item?.nearby_landmarks}
                      </span>
                      {/* {item?.nearby_landmarks?.map((item, index) => (
                        <span
                          className="bg-gray-400 p-1 rounded-sm"
                          key={index}
                        >
                          {item}
                        </span>
                      ))} */}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {item?.category == "estate" ? (
                    <div className="text-sm flex flex-wrap ml-5 divide-adron-gray-300 divide-x-1 py-1 mb-2 border-b-1 border-b-gray-300">
                      {item?.topography != null && (
                        <li className="flex items-center gap-2 px-2">
                          <MdOutlineLandscape />
                          <span>{item.topography}</span>
                        </li>
                      )}
                      {item?.road_access != null && (
                        <li className="flex items-center gap-2 px-2">
                          <PiRoadHorizonDuotone />{" "}
                          <span>{item?.road_access}</span>
                        </li>
                      )}
                      {item?.gated_estate != null && (
                        <li className="flex items-center gap-2 px-2">
                          <GiGate />{" "}
                          <span>
                            {item.gated_estate === "Yes" ? "Gated" : "No gates"}
                          </span>
                        </li>
                      )}
                      {item?.fencing != null && (
                        <li className="flex items-center gap-2 px-2">
                          <LuFence />{" "}
                          <span>
                            {item.fencing === "Yes" ? "Fenced" : "Not Fenced"}
                          </span>
                        </li>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm flex flex-wrap ml-5 divide-adron-gray-300 divide-x-1 py-1 mb-2 border-b-1 border-b-gray-300">
                      {item?.no_of_bedroom != null && (
                        <li className="flex items-center gap-2 px-2">
                          <TbBed />
                          <span>{item?.no_of_bedroom} Bedrooms</span>
                        </li>
                      )}
                      {item?.number_of_bathroom != null && (
                        <li className="flex items-center gap-2 px-2">
                          <LiaToiletSolid />
                          <span>{item?.number_of_bathroom} Bathroom</span>
                        </li>
                      )}
                      {item?.parking_space != null && (
                        <li className="flex items-center gap-2 px-2">
                          <IoCarSportOutline />
                          <span>
                            {item?.parking_space} Vehicle Parking Space
                          </span>
                        </li>
                      )}
                      {item?.year_built != null && (
                        <li className="flex items-center gap-2 px-2">
                          <IoConstructOutline />
                          <span>Built Year {formatDate(item?.year_built)}</span>
                        </li>
                      )}
                    </div>
                  )}
                  <p className="text-sm ml-5 break-words">{item?.overview}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Description</h4>
                  <div className="text-sm ml-5 break-words text-left">
                    {/* <div
                      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                      className="rich-text-content"
                      style={{
                        contain: "content", // Isolates the content from parent styles
                        all: "initial", // Reset all inherited styles
                      }}
                    /> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                      // className="prose max-w-none rich-text-content"
                      className="prose  prose-lg
                      max-w-none prose-headings:font-bold [&>*]:text-gray-700 [&>*]:text-xs prose-headings:text-gray-900 [&>h2]:!font-adron-bold [&>h1]:text-3xl [&>h2]:text-2xl [&>h3]:text-xl [&>p]:my-5 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:text-xs [&>a]:text-blue-600 [&>a]:no-underline [&>a]:border-b-2 [&>a]:border-blue-300 [&>a]:hover:border-blue-600 [&>strong]:text-gray-900 [&>ul]:list-disc [&>ol]:list-decimal [&>li]:my-1 blockquote:border-l-4 blockquote:border-gray-300 blockquote:pl-4 blockquote:italic [&>img]:rounded-lg [&>img]:shadow-md [&>table]:border [&>table]:border-gray-200 [&>th]:bg-gray-50 [&>th]:p-2 [&>td]:p-2 "
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Features</h4>
                  <div className="text-md ml-5 grid grid-cols-1 md:grid-cols-3 text-gray-500 space-y-2">
                    {features.map((list) => (
                      <div key={list} className="flex gap-2 items-center">
                        <IoIosCheckmarkCircleOutline /> <div>{list}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Address</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="relative overflow-x-hidden">
                      <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <div>
                          <div className="p-3 flex justify-between gap-2 bg-white border-b border-gray-200">
                            <div className="font-medium text-gray-900 whitespace-nowrap truncate">
                              Country
                            </div>
                            <div className=" truncate ">{item.country}</div>
                          </div>

                          <div className="p-3 flex justify-between gap-2 bg-white border-b border-gray-200">
                            <div className=" font-medium text-gray-900 whitespace-nowrap ">
                              State
                            </div>
                            <div className="">{item.state}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative overflow-x-hidden">
                      <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <div>
                          <div className="p-3 flex justify-between gap-2 bg-white border-b border-gray-200">
                            <div className=" font-medium text-gray-900 whitespace-nowrap">
                              Nearby Landmark
                            </div>
                            <div className="">{item.nearby_landmarks}</div>
                          </div>

                          <div className="p-3 flex justify-between gap-2 bg-white border-b border-gray-200">
                            <div className=" font-medium text-gray-900 whitespace-nowrap">
                              Address
                            </div>
                            <div className=" line-clamp-1 truncate">
                              {item.street_address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.nearby_landmarks && (
                      <div className="relative overflow-x-hidden">
                        <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <div>
                            <div className="p-3 flex justify-between gap-2 bg-white border-b border-gray-200">
                              <div className=" font-medium text-gray-900 whitespace-nowrap">
                                Near-by Landmark
                              </div>
                              <div className="">{item.nearby_landmarks}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Property Document Type</h4>
                  <div className="flex items-center gap-2 ml-5 text-gray-500">
                    <GrDocumentUser />
                    <span>{item.title_document_type}</span>
                  </div>
                </div>
                {/* New Additional details */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Fees and Charges</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Split details in half for two tables */}
                    {item?.details && item.details.length > 0 ? (
                      <>
                        <div className="relative overflow-x-hidden">
                          <div className="bg-white font-extrabold p-3 border-b flex justify-between border-gray-200 min-w-0">
                            Bungalow
                          </div>
                          <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                            {bungalows.length > 0 ? (
                              <>
                                {bungalows.map((detail) => (
                                  <div
                                    key={detail.id}
                                    className="bg-white p-3 border-b flex justify-between border-gray-200 min-w-0"
                                  >
                                    <div className="">
                                      <div
                                        // scope="row"
                                        className="truncate font-medium text-gray-900 whitespace-nowrap"
                                      >
                                        {detail.name.trim()}{" "}
                                        {detail.purpose && (
                                          <div className="text-xs text-gray-500">
                                            purpose: {detail.purpose}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <span className=" truncate ">
                                      {formatPrice(detail.value)}
                                    </span>
                                  </div>
                                ))}
                                <div className="bg-white font-adron-mid p-3 border-b flex justify-between border-gray-200 min-w-0">
                                  <div className="">
                                    <div
                                      // scope="row"
                                      className="truncate text-gray-900 whitespace-nowrap"
                                    >
                                      Total:{" "}
                                    </div>
                                  </div>
                                  <span className=" truncate ">
                                    {formatPrice(bungalowTotal)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="">No Items Found...</div>
                            )}
                          </div>
                        </div>
                        <div className="relative overflow-x-hidden">
                          <div className="bg-white font-extrabold p-3 border-b flex justify-between border-gray-200 min-w-0">
                            Duplex
                          </div>

                          <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                            {duplexes.length > 0 ? (
                              <>
                                {duplexes.map((detail) => (
                                  <div
                                    key={detail.id}
                                    className="bg-white p-3 border-b flex justify-between border-gray-200 min-w-0"
                                  >
                                    <div className="">
                                      <div
                                        // scope="row"
                                        className="truncate font-medium text-gray-900 whitespace-nowrap"
                                      >
                                        {detail.name.trim()}{" "}
                                        {detail.purpose && (
                                          <div className="text-xs text-gray-500">
                                            purpose: {detail.purpose}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <span className="">
                                      {formatPrice(detail.value)}
                                    </span>
                                  </div>
                                ))}
                                <div className="bg-white p-3 font-adron-mid border-b flex justify-between border-gray-200 min-w-0">
                                  <div className="">
                                    <div
                                      // scope="row"
                                      className="truncate text-gray-900 whitespace-nowrap"
                                    >
                                      Total:{" "}
                                    </div>
                                  </div>
                                  <span className=" truncate ">
                                    {formatPrice(duplexTotal)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="">No Items found...</div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500 text-sm col-span-2">
                        No additional details available.
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Structure */}
                <div className="flex flex-col gap-4">
                  <h4 className="textxl font-bold">Payment Structure</h4>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex-flex-col">
                      <p className="text-xs text-gray-500">Payment type</p>
                      <p className="text-sm">Interval Payment</p>
                    </div>
                    <div className="flex-flex-col">
                      <p className="text-xs text-gray-500">
                        Payment Duration Limit
                      </p>
                      <p className="text-sm">
                        Maximum of {item.property_duration_limit} Months
                      </p>
                    </div>
                    <div className="flex-flex-col">
                      <p className="text-xs text-gray-500">Payment Schedule</p>
                      {item.payment_schedule ? (
                        <p className="text-sm capitalize">
                          {item.payment_schedule.map(
                            (item, index) => `${item} `
                          )}
                        </p>
                      ) : (
                        <p className="text-sm capitalize">
                          No payment schedule available
                        </p>
                      )}
                    </div>
                    <div className="flex-flex-col bg-[#CFFFCF] rounded-xl p-4">
                      <p className="text-xs text-gray-500">Fees & Charges</p>
                      <p className="text-sm">
                        {totalFees == 0
                          ? "No Fees & Charges"
                          : formatPrice(totalFees || 0)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Interest Form  */}
              <div className="w-full md:w-[30%] space-y-4">
                <Formik
                  initialValues={{
                    description: "",
                    interest_option: item?.type.name,
                    property_id: item?.id,
                    name: user?.first_name,
                    email: user?.email,
                    phone: user?.phone_number,
                  }}
                  onSubmit={(values, { setFieldValue, resetForm }) => {
                    console.log("Request values:", values);
                    showToast("sent", "success");
                    if (values.description) {
                      enquire(values, {
                        onSuccess(data, variables, context) {
                          showToast("Message sent successfully", "success");
                          resetForm();
                          // setFieldValue("description", "");
                        },
                        onError(error, variables, context) {
                          showToast("Failed to send message", "error");
                        },
                      });
                    } else {
                      showToast("Your message is Empty", "error");
                    }
                  }}
                >
                  <Form className="bg-white rounded-4xl p-5">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xl md:text-lg font-bold">
                        Make Enquiries
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Filled the interest form and send us a message about
                        this property.{" "}
                      </p>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="description"
                          className="flex gap-1 items-center text-[10px] text-adron-gray-300"
                        >
                          Message
                        </label>

                        <InputField
                          className="py-3 rounded-lg h-[75px]"
                          placeholder="I am interested in this property"
                          type="textarea"
                          name="description"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-xs gap-1">
                      <Button
                        label="Submit Form"
                        type="submit"
                        isLoading={isPending}
                        disabled={isPending}
                        className="border bg-transparent !text-black border-adron-black mt-8"
                      />
                      {item.whatsapp_link && (
                        <a href={item.whatsapp_link}>
                          <Button
                            label="Chat on WhatsApp"
                            icon={<IoLogoWhatsapp size={18} />}
                          />
                        </a>
                      )}
                      {item.contact_number && (
                        <a href={`tel:${item.contact_number}`}>
                          <Button
                            label="Call Marketer"
                            className="!bg-blue-950"
                            icon={<PhoneCall size={18} />}
                          />
                        </a>
                      )}
                    </div>
                  </Form>
                </Formik>
                {item.property_map && (
                  <Button
                    rightIcon={<MapPinned size={16} />}
                    label="See Property on map"
                    onClick={() => setshowMap(!showMap)}
                  />
                )}

                {item.video_link && (
                  <div className="video-responsive w-full h-[250px] md:h-[150px] rounded-2xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={item.video_link || ""}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {item.property_files && item.property_files.length > 0 && (
                  <Button
                    rightIcon={<FileStack />}
                    label="See Property file"
                    onClick={() => setshowFiles(!showFiles)}
                    className="!bg-gray-700"
                  />
                )}
              </div>
            </div>
            {item.whatsapp_link && isRented ? (
              <a href={item.whatsapp_link} className="w-fit">
                <Button
                  label="Inquire on WhatsApp"
                  icon={<IoLogoWhatsapp size={18} />}
                  className="px-6 py-3 text-sm"
                />
              </a>
            ) : unitsAvialable < 1 ? (
              <Button
                label="Sold out"
                className="!bg-transparent !text-red-500 px-6 !w-fit border text-xs py-3"
                onClick={() => showToast("This Property is sold out", "error")}
              />
            ) : (
              <Button
                label="Subscribe"
                className="px-6 !w-fit text-sm"
                onClick={invest}
              />
            )}
          </div>
          <div className="flex flex-col mt-14 gap-4">
            {/* <h4 className="font-bold">Similar Properties</h4> */}
            <HorizontalPropertyList
              title="Similar Properties"
              properties={data?.data.similar_property_user || []}
            />
            {/* <PropertyList properties={data?.data.similar_property_user || []} /> */}
          </div>
        </div>
      </div>
      {showMap && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setshowMap(false)}
        >
          <div
            className="bg-white p-5 rounded-xl shadow-lg w-[98%] md:w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-3 text-gray-600 bg-white p-2 rounded-full hover:text-gray-900"
              onClick={() => setshowMap(false)}
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            <div className="w-full md:w-[600px] h-[360px] rounded-lg overflow-hidden">
              {/* <StreetView lat={40.748817} lng={-73.985428} /> */}
              <iframe
                src={item.property_map || ""}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {showFiles && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setshowFiles(false)}
        >
          <div
            className="bg-white p-5 rounded-xl shadow-lg w-[98%] md:w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-3 text-gray-600 bg-white p-2 rounded-full hover:text-gray-900"
              onClick={() => setshowMap(false)}
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            <div className="w-full md:w-[600px] h-[360px] rounded-lg overflow-hidden">
              <iframe
                src={item.property_files[0] || ""}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;