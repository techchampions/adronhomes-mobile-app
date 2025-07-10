import PropertyList from "../components/DashboardPropertyComponent/PropertyList";
import { useGetUserPropertiesPlan } from "../data/hooks";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { formatPrice } from "../data/utils";
import { useState } from "react";
import Pagination from "../components/Pagination";

const MyPropertyScreen = () => {
  const [page, setPage] = useState(1);
  const tabs = [
    "In Progress Properties",
    "My Pending Properties",
    "My Properties",
  ];
  type Tab = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<Tab>("In Progress Properties");

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
  let properties = data?.user_properties.data ?? [];
  if (activeTab === "In Progress Properties") {
    properties = data?.user_properties.data ?? [];
    totalPages = data?.user_properties.last_page || 0;
    hasPrev = !!data?.user_properties.prev_page_url;
    hasNext = !!data?.user_properties.next_page_url;
  } else if (activeTab === "My Pending Properties") {
    properties = data?.pending_user_properties.data ?? [];
    totalPages = data?.pending_user_properties.last_page || 0;
    hasPrev = !!data?.pending_user_properties.prev_page_url;
    hasNext = !!data?.pending_user_properties.next_page_url;
  } else if (activeTab === "My Properties") {
    properties = data?.completed_user_properties.data ?? [];
    totalPages = data?.completed_user_properties.last_page || 0;
    hasPrev = !!data?.completed_user_properties.prev_page_url;
    hasNext = !!data?.completed_user_properties.next_page_url;
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
        <div className="flex justify-between text-sm font-medium mb-6 px-0 sm:px-10 lg:px-30">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab
                  ? "text-black underline underline-offset-5"
                  : "text-gray-400"
              } transition text-xs`}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
            >
              {tab}
            </button>
          ))}
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
