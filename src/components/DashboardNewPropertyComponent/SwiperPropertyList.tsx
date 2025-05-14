import React from "react";
import { Property } from "../../data/types/propertiesPageTypes";
import SwiperPropertyCard from "./SwiperPropertyCard";
import Loader from "../Loader";
import ApiErrorBlock from "../ApiErrorBlock";
import NoPropertyFound from "../NoPropertyFound";

type Props = {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
};
const SwiperPropertyList: React.FC<Props> = ({
  properties,
  isError,
  isLoading,
}) => {
  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;
  if (properties.length <= 0) return <NoPropertyFound />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-12">
      {properties.map((property) => (
        <SwiperPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default SwiperPropertyList;
