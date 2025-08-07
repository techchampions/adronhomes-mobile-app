import { Form, Formik } from "formik";
import { FaHeart, FaMapMarker } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline, IoMdBed } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GiStreetLight } from "react-icons/gi";
import { useEnquireProperty, useGetPropertyByID } from "../data/hooks";
import { formatDate, formatPrice } from "../data/utils";
import ApiErrorBlock from "../components/ApiErrorBlock";
import Loader from "../components/Loader";
import { LiaToiletSolid } from "react-icons/lia";
import { TbBed } from "react-icons/tb";
import { IoCarSportOutline, IoConstructOutline } from "react-icons/io5";
import { useUserStore } from "../zustand/UserStore";
import { useToastStore } from "../zustand/useToastStore";
import PropertyList from "../components/PropertyList";
import HorizontalPropertyList from "../components/DashboardPropertyComponent/HorizontalPropertyList";
const PropertyDetail = () => {
  const params = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const id = params?.id;
  const { showToast } = useToastStore();
  const { data, isError, isLoading } = useGetPropertyByID(id ?? "");
  const { mutate: enquire, isPending } = useEnquireProperty();
  if (isError) return <ApiErrorBlock />;
  if (isLoading) return <Loader />;
  const item = data?.data.properties[0];
  const features = item?.features || [];

  const address = `${data?.data.properties[0].street_address}, ${data?.data.properties[0].lga}, ${data?.data.properties[0].state} ${data?.data.properties[0].country}`;

  const invest = () => {
    // navigate(`/invest-property/${id}`);
    navigate(`/invest-property-form/${id}`);
  };
  const totalFees = data?.data.properties[0].details.reduce(
    (sum, item) => sum + item.value,
    0
  );
  // const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  //   <div
  //     onClick={onClick}
  //     className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/60 bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
  //   >
  //     <svg
  //       className="w-5 h-5 text-gray-800"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth={2.5}
  //       viewBox="0 0 24 24"
  //     >
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  //     </svg>
  //   </div>
  // );

  // const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  //   <div
  //     onClick={onClick}
  //     className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/60 bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
  //   >
  //     <svg
  //       className="w-5 h-5 text-gray-800"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth={2.5}
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M15 19l-7-7 7-7"
  //       />
  //     </svg>
  //   </div>
  // );

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
                  {item?.size}Sq M
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
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full md:w-[70%] gap-10">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Overview</h4>
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
                        <span>{item?.parking_space} Vehicle Parking Space</span>
                      </li>
                    )}
                    {item?.year_built != null && (
                      <li className="flex items-center gap-2 px-2">
                        <IoConstructOutline />
                        <span>Built Year {formatDate(item?.year_built)}</span>
                      </li>
                    )}
                  </div>
                  <p className="text-sm ml-5">{item?.overview}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Description</h4>
                  <p className="text-sm ml-5">{item?.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Features</h4>
                  <div className="text-md ml-5 grid grid-cols-3 text-gray-500 space-y-2">
                    {features.map((list) => (
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

                {/* New Additional details */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-md">Fees and Charges</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Split details in half for two tables */}
                    {item?.details && item.details.length > 0 ? (
                      <>
                        <div className="relative overflow-x-hidden">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <tbody>
                              {item.details
                                .slice(0, Math.ceil(item.details.length / 2))
                                .map((detail) => (
                                  <tr
                                    key={detail.id}
                                    className="bg-white border-b border-gray-200"
                                  >
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                      {detail.name.trim()}
                                    </th>
                                    <td className="px-6 py-4">
                                      {formatPrice(detail.value)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="relative overflow-x-hidden">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <tbody>
                              {item.details
                                .slice(Math.ceil(item.details.length / 2))
                                .map((detail) => (
                                  <tr
                                    key={detail.id}
                                    className="bg-white border-b border-gray-200"
                                  >
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                      {detail.name.trim()}
                                    </th>
                                    <td className="px-6 py-4">
                                      {detail.value.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
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
                        Maximum of{" "}
                        {data?.data.properties[0].property_duration_limit}{" "}
                        Months
                      </p>
                    </div>
                    <div className="flex-flex-col">
                      <p className="text-xs text-gray-500">Payment Schedule</p>
                      <p className="text-sm capitalize">
                        {data?.data.properties[0].payment_schedule.map(
                          (item, index) => `${item} `
                        )}
                      </p>
                    </div>
                    <div className="flex-flex-col bg-[#CFFFCF] rounded-xl p-4">
                      <p className="text-xs text-gray-500">Fees & Charges</p>
                      <p className="text-sm"> {formatPrice(totalFees || 0)}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Interest Form  */}
              <div className="w-full md:w-[30%]">
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
                    <div className="flex justify-between text-xs gap-1">
                      <Button
                        label="Submit Form"
                        type="submit"
                        isLoading={isPending}
                        disabled={isPending}
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
            {/* <h4 className="font-bold">Similar Properties</h4> */}
            <HorizontalPropertyList
              title="Similar Properties"
              properties={data?.data.similar_property_user || []}
            />
            {/* <PropertyList properties={data?.data.similar_property_user || []} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
