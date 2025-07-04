import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProperty } from "../../data/types/dashboardHomeTypes";
import { formatPrice } from "../../data/utils";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
// types.ts
type Props = {
  plans: UserProperty[];
  isLoading: boolean;
  isError: boolean;
};

const PropertyPlanList: React.FC<Props> = ({ plans, isError, isLoading }) => {
  const navigate = useNavigate();

  const renderList = () => {
    return (
      <ul className="space-y-2">
        {plans.map((plan) => (
          <li
            onClick={() => navigate(`/my-property/${plan.id}`)}
            key={plan.id}
            className={`p-4 cursor-pointer rounded-3xl gap-2 even:bg-gray-100 flex justify-between items-center`}
          >
            <div className="w-[70%]">
              <p className="font-semibold text-gray-500 text-xs md:text-sm truncate">
                {plan.property.name}
              </p>
              <p className="text-xs text-gray-500">{plan.property.size} SQ m</p>
            </div>
            <div className="text-right w-[27%]">
              <p className="font-bold text-black text-sm truncate">
                {formatPrice(plan.property.price)}
              </p>
              <div className="mt-1 h-1 bg-adron-green-200 rounded-full w-full overflow-hidden">
                <div
                  className="bg-adron-green h-full rounded-full"
                  style={{ width: `${plan.payment_percentage}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <ApiErrorBlock />
        </div>
      );
    }

    if (plans.length === 0) {
      return (
        <div className="text-center py-4">
          <NotFound />
        </div>
      );
    }

    return renderList();
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-400">My Property Plans</h4>
        {/* <button className="text-xs px-4 py-1.5 border rounded-full border-gray-300 text-gray-600 hover:bg-gray-100">
          In Progress <span className="ml-1">▼</span>
        </button> */}
      </div>

      {/* LIST */}
      {renderContent()}
    </div>
  );
};

export default PropertyPlanList;
