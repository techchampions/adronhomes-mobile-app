import React from "react";
import { Property, SavedProperty } from "../../data/types/propertiesPageTypes";
import SwiperPropertyCard from "./SwiperPropertyCard";
import ApiErrorBlock from "../ApiErrorBlock";
import NoPropertyFound from "../NoPropertyFound";
import SmallLoader from "../SmallLoader";
import SavedSwiperPropertyCard from "../DashboardSavedPropertyComponents/SavedSwiperProperty";

type Props = {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
  isSavePropertyList: boolean;
};
const SwiperPropertyList: React.FC<Props> = ({
  properties,
  isError,
  isLoading,
  isSavePropertyList,
}) => {
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;
  if (properties.length <= 0) return <NoPropertyFound />;
  if (isSavePropertyList) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-12">
        {properties.map((property) => (
          <SavedSwiperPropertyCard
            key={property.id}
            saved_property={property}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-12">
      {properties.map((property) => (
        <SwiperPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default SwiperPropertyList;
