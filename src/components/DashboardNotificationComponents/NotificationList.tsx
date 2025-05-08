import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import NotificationDetail from "./NotificationDetail";

export type NotificationStatus = "All" | "Read" | "Unread";

export type NotificationItem = {
  id: number;
  title: string;
  date: string;
  status: NotificationStatus;
  desc: string;
};

type Props = {
  data: NotificationItem[];
};

const tabs: (NotificationStatus | "All")[] = ["All", "Read", "Unread"];

const NotificationList: React.FC<Props> = ({ data }) => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const isNotificationStatus = (tab: string): tab is NotificationStatus => {
    return ["Read", "Unread"].includes(tab);
  };

  const filteredData =
    activeTab === "All"
      ? data
      : isNotificationStatus(activeTab)
      ? data.filter((item) => item.status === activeTab)
      : [];

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs & Sort */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "text-black" : "text-gray-400"
              } transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <button className="border border-gray-300 text-xs px-4 py-1 rounded-3xl flex items-center gap-1">
            Latest
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="">
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(<NotificationDetail id={item.id} />)}
            className="flex justify-between gap-4 items-center p-4 even:bg-gray-100 rounded-3xl"
          >
            <div className="w-[70%]">
              <div className="text-xs">{item.title}</div>
              <div className="text-xs text-gray-400 truncate">{item.desc}</div>
            </div>
            <div className="text-xs text-gray-400 text-end truncate">
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots (Static for now) */}
      <div className="flex justify-center mt-4 gap-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default NotificationList;
