import SavedSwiperPropertyList from "../components/DashboardNewPropertyComponent/SavedSwiperPropertyList";
import { useGetSavedProperties } from "../data/hooks";

const SavedPropertyScreen = () => {
  const { data, isLoading, isError } = useGetSavedProperties();
  const properties = data?.saved_property.data || [];
  return (
    <div className="">
      <div className="flex flex-col justify-center mx-auto text-center space-y-2 my-7">
        <p className="text-sm md:text-md w-[65%] md:w-full mx-auto font-bold mb-5">
          A list of your favorite properties{" "}
        </p>
      </div>

      <SavedSwiperPropertyList
        properties={properties}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SavedPropertyScreen;
