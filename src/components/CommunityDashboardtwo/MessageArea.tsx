import React from "react";
import { FiArrowLeft, FiCheck, FiMoreVertical, FiUser } from "react-icons/fi";
import {
  getChannelDisplayName,
  getChannelInitials,
  isOwnMessage,
} from "../../data/utils";
import { useGetMessages } from "../../hooks/estateCommunity/useEstateCommunity";
import { useUserStore } from "../../zustand/UserStore";
import ChatInput from "./ChatInput";
interface Prop {
  selectedChannel?: Conversation;
  isMobile: boolean;
  setShowChannel: (show: boolean) => void;
}
const MessageArea: React.FC<Prop> = ({
  selectedChannel,
  isMobile,
  setShowChannel,
}) => {
  const { data, isLoading } = useGetMessages(selectedChannel?.channel);
  const messages = data?.data.data || [];
  const { user } = useUserStore();
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {selectedChannel ? (
        <>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center space-x-3 min-w-0">
              {isMobile && (
                <button
                  onClick={() => setShowChannel(true)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                >
                  <FiArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {getChannelInitials(selectedChannel, user?.id)}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {getChannelDisplayName(selectedChannel, user?.id)}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
              <FiMoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading && messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#79B833]"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FiUser className="w-12 h-12 text-gray-300 mb-3" />
                <p className="font-medium text-gray-500">No messages yet</p>
                <p className="text-sm">Send the first message!</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isOwnMessage(msg, user?.id)
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] ${
                        isOwnMessage(msg, user?.id) ? "order-2" : "order-1"
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-3 ${
                          isOwnMessage(msg, user?.id)
                            ? "bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                      </div>
                      <div
                        className={`flex items-center mt-1 space-x-1.5 ${
                          isOwnMessage(msg, user?.id)
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-xs text-gray-400">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {isOwnMessage(msg, user?.id) && (
                          <FiCheck className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Input Area */}
          {!isLoading && <ChatInput messages={messages} />}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <FiUser className="w-12 h-12 text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">Select a conversation</p>
          <p className="text-sm">Choose a thread to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
