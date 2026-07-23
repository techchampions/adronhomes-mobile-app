// components/CommunityChat.tsx
import { FiMoreVertical } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { formatTime } from "../../data/utils";
import { useGetGroupMessages } from "../../hooks/estateCommunity/useEstateCommunity";
import GroupChatInput from "./GroupChatInput";

const CommunityChat = () => {
  const context: CommunityOutletContext = useOutletContext();
  const you = context.data?.user_info.id;
  const { data, isLoading } = useGetGroupMessages(
    context.data?.group_conversation.channel
  );
  const messages = data?.data.messages.data || [];
  console.log(messages);
  return (
    <div className="h-[600px] flex flex-col bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-bold">
              C
            </div>
            <div>
              <div className="font-bold text-gray-800">
                {context.data?.estate_info.name}
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                {/* <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span> */}
                {context.data?.estate_info.total_members} members
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiMoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {isLoading ? (
        <div className="flex flex-col gap-2 justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#79B833]"></div>
          <div className="text-gray-400 text-sm animate-pulse">
            Loading Messages...
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user_id === you ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] ${
                    msg.user_id === you ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-3 ${
                      msg.user_id === you
                        ? "bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white"
                        : "bg-white border border-gray-100 shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <div
                    className={`flex items-center mt-1 space-x-2 ${
                      msg.user_id === you ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        msg.user_id === you ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {formatTime(msg.created_at)}
                    </span>
                    {msg.user_id !== you && (
                      <div className="flex items-center space-x-1">
                        {/* <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        msg.isOnline ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></span> */}
                        <span className="text-xs text-gray-400">
                          {`${msg.first_name} ${msg.last_name}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Input Area */}
          <GroupChatInput />
        </>
      )}
    </div>
  );
};

export default CommunityChat;
