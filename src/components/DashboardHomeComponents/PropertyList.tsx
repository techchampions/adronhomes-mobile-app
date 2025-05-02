import React from "react";
// types.ts
type PropertyPlan = {
  id: number;
  name: string;
  size: string;
  amount: string;
  progress: number; // between 0 - 100
  isHighlighted?: boolean;
};

const plans: PropertyPlan[] = [
  {
    id: 1,
    name: "Amade Suites & Gardens",
    size: "678 Sq M",
    amount: "₦170,000,000",
    progress: 60,
  },
  {
    id: 2,
    name: "Amade Suites & Gardens",
    size: "678 Sq M",
    amount: "₦170,000,000",
    progress: 80,
    isHighlighted: true,
  },
  {
    id: 3,
    name: "Amade Suites & Gardens",
    size: "678 Sq M",
    amount: "₦170,000,000",
    progress: 90,
  },
  {
    id: 4,
    name: "Amade Suites & Gardens",
    size: "678 Sq M",
    amount: "₦170,000,000",
    progress: 45,
    isHighlighted: true,
  },
  {
    id: 5,
    name: "Amade Suites & Gardens",
    size: "678 Sq M",
    amount: "₦170,000,000",
    progress: 70,
  },
];

const PropertyPlanList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-400">My Property Plans</h4>
        <button className="text-xs px-4 py-1.5 border rounded-full border-gray-300 text-gray-600 hover:bg-gray-100">
          In Progress <span className="ml-1">▼</span>
        </button>
      </div>

      <ul className="space-y-2">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className={`p-4 rounded-3xl ${
              plan.isHighlighted ? "bg-gray-100" : ""
            } flex justify-between items-center`}
          >
            <div>
              <p className="font-semibold text-gray-500 text-sm">{plan.name}</p>
              <p className="text-xs text-gray-500">{plan.size}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-black text-sm">{plan.amount}</p>
              <div className="mt-1 h-1 bg-adron-green-200 rounded-full w-full">
                <div
                  className="bg-adron-green h-full rounded-full"
                  style={{ width: `${plan.progress}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyPlanList;
