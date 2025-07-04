import { useState } from "react";
import SwiperPropertyList from "../components/DashboardNewPropertyComponent/SwiperPropertyList";
import FilterBar from "../components/DashboardNewPropertyComponent/FilterBar";
import { usePropertiespage } from "../data/hooks";
import { PropertyFilters } from "../data/api";
import Button from "../components/Button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Pagination from "../components/Pagination";

const NewPropertyScreen = () => {
  const [page, setPage] = useState(1);
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState<PropertyFilters>({});

  const { data, isLoading, isError } = usePropertiespage(page, filters);
  const totalPages = data?.properties.last_page || 0;
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

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

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!data?.properties.prev_page_url}
        hasNext={!!data?.properties.next_page_url}
      />
      {/* <div className="flex w-full justify-center gap-2 items-center mt-10">
        <Button
          label="Prev"
          icon={<IoArrowBack />}
          onClick={handlePrev}
          className="!w-fit px-3 text-xs"
          disabled={!data?.properties.prev_page_url}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === page || // current
              p === page - 1 ||
              p === page - 2 ||
              p === page + 1 ||
              p === page + 2
          )
          .map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs ${
                p === page
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        <Button
          label="Next"
          rightIcon={<IoArrowForward />}
          onClick={handleNext}
          disabled={!data?.properties.next_page_url}
          className="!w-fit px-3 text-xs"
        />
      </div> */}
    </div>
  );
};

export default NewPropertyScreen;
