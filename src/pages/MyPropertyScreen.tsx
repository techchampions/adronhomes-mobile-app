import PropertyList from "../components/DashboardPropertyComponent/PropertyList";
import { useGetUserPropertiesPlan } from "../data/hooks";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { formatPrice } from "../data/utils";
import { useState } from "react";
import Pagination from "../components/Pagination";

const MyPropertyScreen = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetUserPropertiesPlan(page);
  const totalPages = data?.user_properties.last_page || 0;
  if (isError) {
    return <ApiErrorBlock />;
  }
  const properties = data?.user_properties.data ?? [];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit col-span-2 md:col-span-1">
          <p className="text-gray-400 text-sm">Total Properties</p>
          <div className=" flex w-fit mx-auto font-bold rounded-full justify-between items-center gap-2 ">
            <span>{data?.total_property?.breakdown[1]?.count ?? 0} Houses</span>
            <span className="">•</span>
            <span>{data?.total_property?.breakdown[0]?.count ?? 0} Lands</span>
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
      <PropertyList
        properties={properties}
        isError={isError}
        isloading={isLoading}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!data?.user_properties.prev_page_url}
        hasNext={!!data?.user_properties.next_page_url}
      />
    </div>
  );
};

export default MyPropertyScreen;
