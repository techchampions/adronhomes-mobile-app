import SwiperPropertyList from "../components/DashboardNewPropertyComponent/SwiperPropertyList";
import SmallLoader from "../components/SmallLoader";
import { useSearchStore } from "../zustand/SearchStore";

const PropertySearchResultScreen = () => {
  const { searchResults, isLoading } = useSearchStore();
  const properties = searchResults || [];
  if (isLoading) {
    return <SmallLoader />;
  }
  return (
    <div className="">
      <div className="flex flex-col justify-center mx-auto text-center space-y-2 my-7">
        <p className="text-sm md:text-md w-[65%] md:w-full mx-auto font-bold mb-5">
          Search Results
        </p>
      </div>

      <SwiperPropertyList
        properties={properties}
        isError={false}
        isLoading={false}
        isSavePropertyList={false}
      />
    </div>
  );
};

export default PropertySearchResultScreen;
