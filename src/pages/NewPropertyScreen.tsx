import { useState } from "react";
import SwiperPropertyList from "../components/DashboardNewPropertyComponent/SwiperPropertyList";
import FilterBar from "../components/DashboardNewPropertyComponent/FilterBar";
import { usePropertiespage } from "../data/hooks";
import { PropertyFilters } from "../data/api";

const NewPropertyScreen = () => {
  const [page, setPage] = useState(1);
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState<PropertyFilters>({});

  const { data, isLoading, isError } = usePropertiespage(page, filters);
  const properties =
    filters && Object.values(filters).some((v) => v !== "")
      ? data?.data || []
      : data?.properties?.data || [];

  // const pagination = data?.properties;
  return (
    <div className="">
      <div className="flex flex-col justify-center mx-auto text-center space-y-2 my-7">
        <p className="text-sm md:text-md w-[65%] md:w-full mx-auto font-bold mb-5">
          Discover affordable properties within your budget{" "}
        </p>
        <div className="bg-white flex w-fit mx-auto rounded-full px-4 my-1 text-xs justify-between items-center gap-2 mb-4 md:mb-0">
          <span>28 Properties</span>
          <span className="text-lg">•</span>
          <span>16 Locations</span>
        </div>
      </div>

      <FilterBar
        initialFilters={{}}
        onFilter={(values) => {
          const mapped = {
            state: values.state,
            type: values.propertyType,
            status: values.status,
            minPrice: values.min,
            maxPrice: values.max,
          };

          setPage(1); // Reset pagination when filters change
          setFilters(mapped);
        }}
      />
      <SwiperPropertyList
        properties={properties}
        isError={isError}
        isLoading={isLoading}
        isSavePropertyList={false}
      />
    </div>
  );
};

export default NewPropertyScreen;
