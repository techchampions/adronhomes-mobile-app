import { useState } from "react";
import { PropertyFilters } from "../../../data/api";
// import { Pagination } from "swiper/modules";
import { usePropertiespage, useFilterProperties, useFilterPropertiesnoauth } from "../../../data/hooks";
import FilterBar from "../../DashboardNewPropertyComponent/FilterBar";
import SwiperPropertyList from "../../DashboardNewPropertyComponent/SwiperPropertyList";
import Pagination from "../../Pagination";


const NewPropertyScreennoauth = () => {
  const [page, setPage] = useState(1);
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState<PropertyFilters>({});
const numb=1
  const { data, isLoading, isError } = usePropertiespage(page);
  const {
    data: propertyData,
    isLoading: loadingProperties,
    isError: errorProperty,
  } = useFilterPropertiesnoauth(page,"",filters,);

  const totalPages = propertyData?.last_page || 0;
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

  const properties = propertyData?.data || [];
  // const properties =
  //   filters && Object.values(filters).some((v) => v !== "")
  //     ? data?.data || []
  //     : data?.properties?.data || [];

  // const pagination = data?.properties;
  return (
    <div className="">
      <div className="flex flex-col justify-center mx-auto text-center space-y-2 my-7">
        <p className="text-sm md:text-md w-[65%] md:w-full mx-auto font-bold mb-5">
          Discover affordable properties within your budget{" "}
        </p>
        <div className="bg-white flex w-fit mx-auto rounded-full px-4 my-1 text-xs justify-between items-center gap-2 mb-4 md:mb-0">
          <span>{data?.properties_header[0].list_description[0]}</span>
          <span className="text-lg">•</span>
          <span>{data?.properties_header[0].list_description[1]}</span>
        </div>
      </div>

      <FilterBar
        initialFilters={{}}
        onFilter={(values) => {
          const mapped: PropertyFilters = {
            state: values.state,
            propertyType: values.propertyType,
            status: values.status,
            min: values.min,
            max: values.max,
          };
          console.log("the filters are", mapped);
          setPage(1); // Reset pagination when filters change
          setFilters(mapped);
        }}
      />
      <SwiperPropertyList
        properties={properties}
        isError={isError || errorProperty}
        isLoading={isLoading || loadingProperties}
        isSavePropertyList={false}
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!propertyData?.prev_page_url}
        hasNext={!!propertyData?.next_page_url}
      />
    </div>
  );
};

export default NewPropertyScreennoauth;