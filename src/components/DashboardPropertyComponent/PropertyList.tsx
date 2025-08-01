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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-4">
        {properties.map((plan) => (
          <PropertyCardProgress
            payment_type={plan.plan?.payment_type}
            // transactionRef ={plan.plan.ref}
            createdAt={plan.created_at}
            key={plan.id}
            user_property_id={plan.id}
            id={plan.plan_id}
            status={plan.status}
            payment_method={plan.plan?.payment_method}
            units={plan.plan?.number_of_unit || 1}
            imageUrl={plan.property?.display_image || "/treasure-park-bg.png"}
            title={plan.property?.name || ""}
            lga={plan.property?.lga || ""}
            state={plan.property?.state || ""}
            raisedAmount={plan.plan?.paid_amount || 0}
            targetAmount={plan.plan?.total_amount || 0}
            progress={plan.plan?.payment_percentage || 0}
          />
        ))}
      </div>
    );
  };
  return renderList();
};

export default PropertyList;
