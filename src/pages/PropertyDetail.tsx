import Slider from "react-slick";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { FaHeart, FaMapMarker } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline, IoLogoWhatsapp } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SelectField from "../components/SelectField";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import PropertyList from "../components/PropertyList";
import { useGetPropertyByID } from "../data/hooks";
import { formatPrice } from "../data/utils";
import ApiErrorBlock from "../components/ApiErrorBlock";
import Loader from "../components/Loader";

const PropertyDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id;
  const { data, isError, isLoading } = useGetPropertyByID(id ?? "");
  if (isError) return <ApiErrorBlock />;
  if (isLoading) return <Loader />;
  const item = data?.data.properties[0];

  const address = `${data?.data.properties[0].street_address}, ${data?.data.properties[0].lga}, ${data?.data.properties[0].state} ${data?.data.properties[0].country}`;

  const invest = () => {
    navigate(`/invest-property/${id}`);
  };

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/60 bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
    >
      <svg
        className="w-5 h-5 text-gray-800"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/60 bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
    >
      <svg
        className="w-5 h-5 text-gray-800"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col w-full px-4 md:px-0 pb-32">
      <div className="w-full flex flex-col md:flex-row justify-between md:items-start my-5">
        <div className="flex flex-col gap-4  md:w-[70%]">
          <h4 className="font-bold text-3xl md:text-6x line-clamp-2">
            {/* Treasure Parks and Gardens */}
            {data?.data.properties[0].name}
          </h4>
          <p className="flex gap-2">
            <FaMapMarker />
            <span>{address}</span>
          </p>
        </div>
        <div className="flex justify-between gap-4 mt-3 md:mt-0">
          <div className="p-4 rounded-full bg-white w-fit">
            <FaHeart />
          </div>
          <Button
            label="Invest in Property"
            className="px-6 text-sm"
            onClick={invest}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10">
        {/* Property details */}

        {/* Main slider and thumbnails */}
        <div className="w-full mx-auto">
          {/* Main slider */}
          {/* Swiper Carousel */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden mt-4">
            <Swiper
              spaceBetween={10}
              slidesPerView={1.3}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                320: {
                  slidesPerView: 2.3,
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
            {/* Custom Navigation Buttons */}
            {/* <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow">
              <FaChevronLeft size={20} />
            </button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow">
              <FaChevronRight size={20} />
            </button> */}
          </div>
          <div className="flex flex-col my-5 gap-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center text-sm justify-between font-bold text-gray-500 gap-4 md:gap-10">
                <span className="flex items-center gap-1 truncate">
                  {/* <TfiRulerAlt2 />  */}
                  <img src="/ruler.svg" width={14} height={14} alt="dumbbell" />

                  {item?.size}
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
                  {/* {item?.type} */}
                </div>
              </div>
              <div className=" flex items-center gap-1 text-2xl font-bold mt-3 md:mt-0">
                {formatPrice(item?.price ?? 0)}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full md:w-[70%] gap-10">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Overview</h4>
                  <p className="text-sm ml-5">{item?.overview}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Description</h4>
                  <p className="text-sm ml-5">{item?.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Features</h4>
                  <div className="text-md ml-5 grid grid-cols-3 text-gray-500 space-y-2">
                    {item?.features?.map((list) => (
                      <div key={list} className="flex gap-2 items-center">
                        <IoIosCheckmarkCircleOutline /> <div>{list}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Address</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-x-hidden">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              Country
                            </th>
                            <td className="px-6 py-4">{item?.country}</td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              State
                            </th>
                            <td className="px-6 py-4">{item?.state}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="relative overflow-x-hidden">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              LGA
                            </th>
                            <td className="px-6 py-4">{item?.lga}</td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Address
                            </th>
                            <td className="px-6 py-4 line-clamp-1 truncate">
                              {item?.street_address}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Additional Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-x-hidden">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              Legal Documentation Fees
                            </th>
                            <td className="px-6 py-4">10000000</td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              Survey plan
                            </th>
                            <td className="px-6 py-4">1000000 </td>
                          </tr>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              Architectural Drawing fee
                            </th>
                            <td className="px-6 py-4">10000000 </td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              Structure Drawing fee
                            </th>
                            <td className="px-6 py-4">1000000 </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="relative overflow-x-hidden">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              M & E Drawing
                            </th>
                            <td className="px-6 py-4">100000 </td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Certification fee
                            </th>
                            <td className="px-6 py-4 line-clamp-1 truncate">
                              1000000{" "}
                            </td>
                          </tr>
                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Total
                            </th>
                            <td className="px-6 py-4">10000000 </td>
                          </tr>

                          <tr className="bg-white border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Developmental fee
                            </th>
                            <td className="px-6 py-4 line-clamp-1 truncate">
                              1000000{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Interest Form  */}
              <div className="w-full md:w-[30%]">
                <Formik
                  initialValues={{
                    message: "",
                  }}
                  onSubmit={(values) => {
                    console.log("Filter values:", values);
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
                          htmlFor="location"
                          className="flex gap-1 items-center text-[10px] text-adron-gray-300"
                        >
                          Message
                        </label>

                        <InputField
                          className="py-3 rounded-lg h-[75px]"
                          placeholder="I am interested in this property"
                          type="textarea"
                          name="message"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs gap-1">
                      <Button
                        label="Submit Form"
                        type="submit"
                        className="border bg-transparent !text-black border-adron-black mt-8 flex-1 py-1"
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <Button
              label="Invest in Property"
              className="px-6 text-sm !w-fit"
              onClick={invest}
            />
          </div>
          <div className="flex flex-col mt-14 gap-4">
            <h4 className="font-bold">Similar Properties</h4>
            {/* <PropertyList properties={properties} /> */}
          </div>
          <div className="flex flex-col mt-14 gap-4">
            <h4 className="font-bold">Recently Viewed</h4>
            {/* <PropertyList properties={properties} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
