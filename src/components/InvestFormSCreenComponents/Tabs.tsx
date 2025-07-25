import { useState } from "react";

const tabs = [
  "OwnerShip Info",
  "Other Information",
  "Next of Kin",
  "Identity Info",
];

type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};

const Tabs = ({ activeTab, setActiveTab }: Props) => (
  <div className="flex flex-wrap text-xs py-2 md:py-6">
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
