import React from "react";
import { Property } from "../../../data/types/propertiesPageTypes";
import SmallLoader from "../../SmallLoader";
import ApiErrorBlock from "../../ApiErrorBlock";
import NoPropertyFound from "../../NoPropertyFound";
import SwiperPropertyCard from "../../DashboardNewPropertyComponent/SwiperPropertyCard";

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
}) => {
  if (isLoading) return <div className="text-center ">  <SmallLoader /></div>;
  if (isError) return <ApiErrorBlock />;
  if (properties.length <= 0) return <NoPropertyFound />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
      {properties.map((property, index) => (
        <SwiperPropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default SwiperPropertyList;