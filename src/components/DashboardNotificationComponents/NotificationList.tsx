import React, { useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import NotificationDetail from "./NotificationDetail";
import { Notification } from "../../data/types/notificationTypes";
import { formatDate } from "../../data/utils";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound, { NotFoun2 } from "../NotFound";
import SmallLoader from "../SmallLoader";

// export type NotificationStatus = "All" | "Read" | "Unread";

type Props = {
  data: Notification[];
  isError: boolean;
  isLoading: boolean;
};

const tabs = ["All", "Read", "Unread"] as const;
type Tab = (typeof tabs)[number];

const NotificationList: React.FC<Props> = ({ data, isError, isLoading }) => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => {
          if (activeTab === "Read") return item.is_read === 1;
          if (activeTab === "Unread") return item.is_read === 0;
          return false;
        });
  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }
    if (isError) {
      return <ApiErrorBlock />;
    }
    if (filteredData.length <= 0) {
      return <NotFoun2  />;
    }
    return renderList();
  };

  const renderList = () => {
    return (
      <div className="">
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(<NotificationDetail id={item.id} />)}
            className="cursor-pointer flex justify-between gap-4 items-center p-4 even:bg-gray-100 rounded-3xl"
          >
            <div className="w-[70%]">
              <div className="text-xs">{item.title}</div>
              <div className="text-xs text-gray-400 truncate">
                {item.content}
              </div>
            </div>
            <div className="text-xs text-gray-400 text-end truncate">
              {formatDate(item.created_at ?? "")}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
        {/* <div>
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
        </div> */}
      </div>

      {/* List */}
      {renderContent()}
    </div>
  );
};

export default NotificationList;
