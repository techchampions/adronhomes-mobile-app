import { UserProperty } from "../../data/types/userPropertiesTypes";
import NotFound from "../NotFound";
import PropertyCardProgress from "./PropertyCardProgress";

interface PropertyListProps {
  properties: UserProperty[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const renderList = () => {
    if (properties.length <= 0) {
      return <NotFound />;
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
