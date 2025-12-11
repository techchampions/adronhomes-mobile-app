import { useState } from "react";
// import SwiperPropertyList from "../components/DashboardNewPropertyComponent/SwiperPropertyList";
// import FilterBar from "../components/DashboardNewPropertyComponent/FilterBar";
// import { useFilterProperties, usePropertiespage } from "../data/hooks";
// import { PropertyFilters } from "../data/api";
// import Pagination from "../components/Pagination";
import { useOutletContext } from "react-router-dom";
import { PropertyFilters } from "../../../data/api";
import { useFilterProperties, useFilterPropertiesnoauth, usePropertiespage } from "../../../data/hooks";
import FilterBar from "../../DashboardNewPropertyComponent/FilterBar";
import SwiperPropertyList from "./newexplorepage";
import Pagination from "../../Pagination";
interface OutletContext {
  scrollContainerRef: React.RefObject<HTMLElement>;
}
const NewPropertyScreen = () => {
 const [page, setPage] = useState(1);
  const context = useOutletContext<OutletContext>();
  const scrollContainerRef = context?.scrollContainerRef || { current: null };
  // const [filters, setFilters] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState<PropertyFilters>({});

  const { data, isLoading, isError } = usePropertiespage(page);
  const {
    data: propertyData,
    isLoading: loadingProperties,
    isError: errorProperty,
  } = useFilterPropertiesnoauth(page,"", filters);
  const totalPages = propertyData?.last_page || 0;

  const properties = propertyData?.data || [];
  const handlePageChange = (page: number) => {
    setPage(page);
    // Scroll the main container to top
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full">
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
        onPageChange={handlePageChange}
        hasPrev={!!propertyData?.prev_page_url}
        hasNext={!!propertyData?.next_page_url}
      />
    </div>
  );
};

export default NewPropertyScreen;