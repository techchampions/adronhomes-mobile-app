import PropertyList from "../components/DashboardPropertyComponent/PropertyList";
import { useGetUserPropertiesPlan } from "../data/hooks";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { formatPrice } from "../data/utils";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { IoInformationCircle } from "react-icons/io5";

const MyPropertyScreen = () => {
  const [page, setPage] = useState(1);
  const tabs = ["Pending", "Awaiting", "In Progress", "Completed"];
  type Tab = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<Tab>("Pending");

  const { data, isLoading, isError } = useGetUserPropertiesPlan(page);
  let totalPages = data?.user_properties.last_page || 0;
  let hasPrev = !!data?.user_properties.prev_page_url;
  let hasNext = !!data?.user_properties.next_page_url;

  if (isError) {
    return <ApiErrorBlock />;
  }
  const landData = data?.total_property.breakdown.find(
    (item) => item.type_name === "Land"
  );
  const numberofLands = landData?.count;
  const houseData = data?.total_property.breakdown.find(
    (item) => item.type_name === "Residential"
  );
  const numberofHouses = houseData?.count;
  let properties = data?.new_form_properties.data ?? [];
  let propertyInfo = "";
  if (activeTab === "In Progress") {
    properties = data?.user_properties.data ?? [];
    totalPages = data?.user_properties.last_page || 0;
    hasPrev = !!data?.user_properties.prev_page_url;
    hasNext = !!data?.user_properties.next_page_url;
    propertyInfo =
      "These are properties where you’ve made at least the initial deposit. Payment and processing are ongoing.";
  } else if (activeTab === "Awaiting") {
    properties = data?.new_form_properties.data ?? [];
    totalPages = data?.new_form_properties.last_page || 0;
    hasPrev = !!data?.new_form_properties.prev_page_url;
    hasNext = !!data?.new_form_properties.next_page_url;
    propertyInfo =
      "These are properties that are awaiting contract ID assignment.";
  } else if (activeTab === "Pending") {
    properties = data?.pending_user_properties.data ?? [];
    totalPages = data?.pending_user_properties.last_page || 0;
    hasPrev = !!data?.pending_user_properties.prev_page_url;
    hasNext = !!data?.pending_user_properties.next_page_url;
    propertyInfo =
      "These are properties where your payment is yet to be confirmed by AdronHomes Admin. Confirmation is required to proceed.";
  } else if (activeTab === "Completed") {
    properties = data?.completed_user_properties.data ?? [];
    totalPages = data?.completed_user_properties.last_page || 0;
    hasPrev = !!data?.completed_user_properties.prev_page_url;
    hasNext = !!data?.completed_user_properties.next_page_url;
    propertyInfo =
      "These are fully paid properties, including at least 50% of infrastructure and other related fees.";
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit col-span-2 md:col-span-1">
          <p className="text-gray-400 text-sm">Total Properties</p>
          <div className=" flex w-fit mx-auto font-bold rounded-full justify-between items-center gap-2 ">
            <span>{numberofHouses || 0} Houses</span>
            <span className="">•</span>
            <span>{numberofLands || 0} Lands</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="font-bold truncate">
            {formatPrice(data?.total_invoice ?? 0)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="font-bold truncate">
            {formatPrice(data?.total_amount_paid ?? 0)}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-4 lg:p-6">
        <div className="flex gap-5 text-sm font-medium mb-6 px-0 sm:px-10 lg:px-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab
                  ? "text-black underline underline-offset-5"
                  : "text-gray-400"
              } transition text-xs md:text-sm`}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="w-full pb-4">
          <div className="w-full justify-center flex items-start gap-1  text-gray-400">
            <IoInformationCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-xs md:text-sm flex-1">{propertyInfo}</span>
          </div>
        </div>
        <PropertyList
          properties={properties}
          isError={isError}
          isloading={isLoading}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};

export default MyPropertyScreen;
