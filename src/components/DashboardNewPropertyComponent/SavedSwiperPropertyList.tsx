import React from "react";
import ApiErrorBlock from "../ApiErrorBlock";
import NoPropertyFound from "../NoPropertyFound";
import SmallLoader from "../SmallLoader";
import SavedSwiperPropertyCard from "../DashboardSavedPropertyComponents/SavedSwiperProperty";
import { SavedProperty } from "../../data/types/SavedPropertiesResponse";

type Props = {
  properties: SavedProperty[];
  isLoading: boolean;
  isError: boolean;
};
const SavedSwiperPropertyList: React.FC<Props> = ({
  properties,
  isError,
  isLoading,
}) => {
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;
  if (properties.length <= 0) return <NoPropertyFound />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-12">
      {properties.map((property) => (
        <SavedSwiperPropertyCard
          key={property.id}
          saved_property={property.property}
        />
      ))}
    </div>
  );
};

export default SavedSwiperPropertyList;