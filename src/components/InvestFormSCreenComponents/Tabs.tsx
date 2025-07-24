import { useState } from "react";

const tabs = [
  "Basic Info",
  "Other Information",
  // "Charges & Fees",
  // "Customer Picture",
  // "Employer",
  "Next of Kin",
  "PassPort Photo",
  // "Document Management",
];

type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};

const Tabs = ({ activeTab, setActiveTab }: Props) => (
  <div className="flex text-xs py-6">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        className={`px-4 py-2 whitespace-nowrap ${
          activeTab === i
            ? "border-b-2 border-adron-green text-adron-green font-bold"
            : "text-gray-500"
        }`}
        // onClick={() => setActiveTab(i)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
