import React, { useEffect, useState } from "react";
import { useModalStore } from "../../zustand/useModalStore";
import NotificationDetail from "./NotificationDetail";
import { Notification } from "../../data/types/notificationTypes";
import { formatDate } from "../../data/utils";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound, { NotFoun2 } from "../NotFound";
import SmallLoader from "../SmallLoader";
import { useNotificationStore } from "./notificationstore";

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

  const { setAllNotifications, markAsRead, isRead,setreadNotifications } = useNotificationStore();
  
 useEffect(() => {
  if (!data || data.length === 0) return;


  const allIds = data.map((item) => item.id.toString());
  setAllNotifications(allIds);


  const readIds = data
    .filter((item) => item.is_read === 1)
    .map((item) => item.id.toString());

  setreadNotifications(readIds);

}, [data, setAllNotifications, setreadNotifications]);


  const filteredData = data.filter((item) => {
    const isItemRead = isRead(item.id.toString());
    if (activeTab === "Read") return isItemRead;
    if (activeTab === "Unread") return !isItemRead;
    return true;
  });

  const renderContent = () => {
    if (isLoading) return <SmallLoader />;
    if (isError) return <ApiErrorBlock />;
    if (filteredData.length <= 0) return <NotFoun2 />;
    return renderList();
  };

  const renderList = () => (
    <div className="space-y-2">
      {filteredData.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            markAsRead(item.id.toString()); 
            openModal(<NotificationDetail id={item.id} />);
          }}
          className={`cursor-pointer flex justify-between gap-4 items-center p-4 rounded-3xl transition
            ${
              isRead(item.id.toString())
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 hover:bg-gray-50"
            }
          `}
        >
          <div className="w-[70%]">
            <div className="text-xs font-medium">{item.title}</div>
            <div className="text-xs text-gray-400 truncate">{item.content}</div>
          </div>
          <div className="text-xs text-gray-400 text-end truncate">
            {formatDate(item.created_at ?? "")}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-2 md:p-6 rounded-3xl">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-4 p-4 md:p-0">
        <div className="flex gap-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`transition ${
                activeTab === tab ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {renderContent()}
    </div>
  );
};

export default NotificationList;
