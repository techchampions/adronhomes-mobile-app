import { UserProperty } from "../../data/types/userPropertiesTypes";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
import SmallLoader from "../SmallLoader";
import PropertyCardProgress from "./PropertyCardProgress";

interface PropertyListProps {
  properties: UserProperty[];
  isloading: boolean;
  isError: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  isError,
  isloading,
}) => {
  const renderList = () => {
    if (isloading) {
      return <SmallLoader />;
    }
    if (properties.length <= 0) {
      return <NotFound />;
    }
    if (isError) {
      return <ApiErrorBlock />;
    }
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4">
        {properties.map((plan) => (
          <PropertyCardProgress
            key={plan.id}
            id={plan.id}
            imageUrl={plan.property.display_image}
            title={plan.property.name}
            lga={plan.property.lga}
            state={plan.property.state}
            raisedAmount={plan.paid_amount}
            targetAmount={plan.property.price}
            progress={plan.payment_percentage}
          />
        ))}
      </div>
    );
  };
  return renderList();
};

export default PropertyList;
