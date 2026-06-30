// components/MessagingPlatform.tsx
import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import {
  formatTimeAgo,
  getChannelDisplayName,
  getChannelImage,
  getChannelInitials,
} from "../../data/utils";
import { useGetAllConversations } from "../../hooks/estateCommunity/useEstateCommunity";
import { useUserStore } from "../../zustand/UserStore";

interface Prop {
  show: boolean;
  setShow: (show: boolean) => void;
  selectedChannel?: Conversation;
  handleChannelSelect: (channel: Conversation) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}
const ChannelList: React.FC<Prop> = ({
  show,
  selectedChannel,
  setShow,
  handleChannelSelect,
  isMobile,
  setIsMobile,
}) => {
  const { user } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const context: CommunityOutletContext = useOutletContext();
  const { data, isLoading: loading } = useGetAllConversations(
    context.data?.estate_info.id
  );
  const channels = data?.data.data || [];

  const renderChannelImage = (channel: Conversation) => {
    const initials = getChannelInitials(channel, user?.id);
    const profilePicture = getChannelImage(channel, user?.id);
    if (profilePicture) {
      return <img src={profilePicture} alt="" className="w-full h-full" />;
    }
    return initials;
  };
  const handleClick = (channel: Conversation) => {
    handleChannelSelect(channel);
    if (isMobile) {
      setShow(false);
    }
  };
  return (
    // CHANNELLIST
    <div
      className={`
          flex flex-col border-r border-gray-100 bg-white
          ${
            isMobile
              ? `absolute inset-0 z-20 transition-transform duration-300 ease-in-out ${
                  show ? "translate-x-0" : "-translate-x-full"
                }`
              : "relative w-80 flex-shrink-0"
          }
        `}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#79B833] text-sm"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#79B833]"></div>
          </div>
        ) : channels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <FiUser className="w-8 h-8 mb-2" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleClick(channel)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                selectedChannel?.id === channel.id ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r overflow-hidden from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {renderChannelImage(channel)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-800 text-sm truncate capitalize">
                      {getChannelDisplayName(channel, user?.id)}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {formatTimeAgo(channel.updated_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {channel.last_message}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelList;
