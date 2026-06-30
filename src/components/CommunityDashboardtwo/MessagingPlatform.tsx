// // components/MessagingPlatform.tsx
// import React, { useState, useEffect } from "react";
// import {
//   FiSearch,
//   FiSend,
//   FiPaperclip,
//   FiSmile,
//   FiMoreVertical,
//   FiCheck,
//   FiUser,
//   FiImage,
//   FiArrowLeft,
// } from "react-icons/fi";

// interface MessageThread {
//   id: string;
//   name: string;
//   property: string;
//   lastMessage: string;
//   time: string;
//   unread: number;
//   avatar: string;
//   online: boolean;
// }

// interface Message {
//   id: string;
//   sender: string;
//   text: string;
//   time: string;
//   isOwn: boolean;
//   read: boolean;
//   type?: "text" | "image";
// }

// const MessagingPlatform: React.FC = () => {
//   const [threads] = useState<MessageThread[]>([
//     {
//       id: "1",
//       name: "John Doe",
//       property: "Lekki Phase 1 - Villa 3",
//       lastMessage: "When is the next meeting?",
//       time: "2h ago",
//       unread: 2,
//       avatar: "JD",
//       online: true,
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       property: "Banana Island - Apartment 5B",
//       lastMessage: "I got the payment confirmation",
//       time: "5h ago",
//       unread: 0,
//       avatar: "JS",
//       online: false,
//     },
//     {
//       id: "3",
//       name: "Mike Johnson",
//       property: "Victoria Island - Land Plot 12",
//       lastMessage: "The surveyor is coming tomorrow",
//       time: "1d ago",
//       unread: 1,
//       avatar: "MJ",
//       online: true,
//     },
//     {
//       id: "4",
//       name: "Sarah Williams",
//       property: "Lekki Phase 2 - Apartment 7A",
//       lastMessage: "Thanks for the update!",
//       time: "2d ago",
//       unread: 0,
//       avatar: "SW",
//       online: false,
//     },
//   ]);

//   const [selectedThread, setSelectedThread] = useState<string | null>("1");
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       sender: "John Doe",
//       text: "Hello, I have a question about the property.",
//       time: "10:30 AM",
//       isOwn: false,
//       read: true,
//     },
//     {
//       id: "2",
//       sender: "You",
//       text: "Sure, what would you like to know?",
//       time: "10:32 AM",
//       isOwn: true,
//       read: true,
//     },
//     {
//       id: "3",
//       sender: "John Doe",
//       text: "When is the next community meeting?",
//       time: "10:35 AM",
//       isOwn: false,
//       read: false,
//     },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [showThreads, setShowThreads] = useState(true);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim() && selectedThread) {
//       setMessages([
//         ...messages,
//         {
//           id: Date.now().toString(),
//           sender: "You",
//           text: newMessage,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           isOwn: true,
//           read: true,
//         },
//       ]);
//       setNewMessage("");
//     }
//   };

//   const filteredThreads = threads.filter(
//     (thread) =>
//       thread.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       thread.property.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const selectedThreadData = threads.find((t) => t.id === selectedThread);

//   const handleThreadSelect = (threadId: string) => {
//     setSelectedThread(threadId);
//     if (isMobile) {
//       setShowThreads(false);
//     }
//   };

//   const handleBackToThreads = () => {
//     setShowThreads(true);
//   };

//   return (
//     <div className="h-[600px] flex bg-white rounded-2xl border border-gray-100 overflow-hidden relative">
//       {/* Thread List */}
//       <div
//         className={`
//           flex flex-col border-r border-gray-100 bg-white
//           ${
//             isMobile
//               ? `absolute inset-0 z-20 transition-transform duration-300 ease-in-out ${showThreads ? "translate-x-0" : "-translate-x-full"}`
//               : "relative w-80 flex-shrink-0"
//           }
//         `}
//       >
//         <div className="p-4 border-b border-gray-100">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search conversations..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#79B833] text-sm"
//             />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {filteredThreads.map((thread) => (
//             <button
//               key={thread.id}
//               onClick={() => handleThreadSelect(thread.id)}
//               className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
//                 selectedThread === thread.id ? "bg-gray-50" : ""
//               }`}
//             >
//               <div className="flex items-start space-x-3">
//                 <div className="relative flex-shrink-0">
//                   <div className="w-10 h-10 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                     {thread.avatar}
//                   </div>
//                   {thread.online && (
//                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start">
//                     <p className="font-semibold text-gray-800 text-sm truncate">
//                       {thread.name}
//                     </p>
//                     <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
//                       {thread.time}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-0.5 truncate">
//                     {thread.property}
//                   </p>
//                   <p className="text-sm text-gray-600 truncate mt-1">
//                     {thread.lastMessage}
//                   </p>
//                 </div>
//                 {thread.unread > 0 && (
//                   <span className="flex-shrink-0 w-5 h-5 bg-[#79B833] rounded-full flex items-center justify-center text-white text-xs font-medium">
//                     {thread.unread}
//                   </span>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Message Area */}
//       <div className="flex-1 flex flex-col min-w-0 bg-white">
//         {selectedThread ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
//               <div className="flex items-center space-x-3 min-w-0">
//                 {isMobile && (
//                   <button
//                     onClick={handleBackToThreads}
//                     className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
//                   >
//                     <FiArrowLeft className="w-5 h-5 text-gray-600" />
//                   </button>
//                 )}
//                 <div className="relative flex-shrink-0">
//                   <div className="w-8 h-8 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-xs">
//                     {selectedThreadData?.avatar}
//                   </div>
//                   {selectedThreadData?.online && (
//                     <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="font-semibold text-gray-800 text-sm truncate">
//                     {selectedThreadData?.name}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate hidden sm:block">
//                     {selectedThreadData?.property}
//                   </p>
//                 </div>
//               </div>
//               <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
//                 <FiMoreVertical className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[85%] sm:max-w-[70%] ${msg.isOwn ? "order-2" : "order-1"}`}
//                   >
//                     <div
//                       className={`rounded-2xl p-3 ${
//                         msg.isOwn
//                           ? "bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       <p className="text-sm break-words">{msg.text}</p>
//                     </div>
//                     <div
//                       className={`flex items-center mt-1 space-x-1.5 ${msg.isOwn ? "justify-end" : "justify-start"}`}
//                     >
//                       <span className="text-xs text-gray-400">{msg.time}</span>
//                       {msg.isOwn &&
//                         (msg.read ? (
//                           <FiCheck className="w-3 h-3 text-blue-500" />
//                         ) : (
//                           <FiCheck className="w-3 h-3 text-gray-400" />
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Input Area */}
//             <form
//               onSubmit={handleSendMessage}
//               className="p-4 border-t border-gray-100 bg-white"
//             >
//               <div className="flex items-center space-x-2">
//                 <div className="flex items-center space-x-1 flex-shrink-0">
//                   <button
//                     type="button"
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                   >
//                     <FiPaperclip className="w-5 h-5 text-gray-400" />
//                   </button>
//                   <button
//                     type="button"
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
//                   >
//                     <FiImage className="w-5 h-5 text-gray-400" />
//                   </button>
//                   <button
//                     type="button"
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
//                   >
//                     <FiSmile className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </div>
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#79B833] transition-all text-sm min-w-0"
//                 />
//                 <button
//                   type="submit"
//                   className="p-2.5 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-full hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!newMessage.trim()}
//                 >
//                   <FiSend className="w-5 h-5" />
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
//             <FiUser className="w-12 h-12 text-gray-300 mb-3" />
//             <p className="font-medium text-gray-500">Select a conversation</p>
//             <p className="text-sm">Choose a thread to start messaging</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessagingPlatform;

// components/MessagingPlatform.tsx
import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiImage,
  FiMoreVertical,
  FiPaperclip,
  FiSearch,
  FiSend,
  FiSmile,
  FiUser,
} from "react-icons/fi";

// Types based on the API response
interface Thread {
  id: number;
  type: string;
  estate_id: number;
  last_message: string;
  channel: string;
  created_at: string;
  updated_at: string;
  sender: number;
  receiver: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}

interface ThreadsResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Thread[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface Message {
  id: number;
  sender: number;
  channel: string;
  receiver: number;
  message: string;
  type: string;
  created_at: string;
  updated_at: string;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}

interface MessagesResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Message[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

const MessagingPlatform: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showThreads, setShowThreads] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  // API base URL - replace with your actual API base URL
  const API_BASE = "https://adron.microf10.sg-host.com/api";

  // Fetch threads on component mount
  useEffect(() => {
    fetchThreads();
  }, []);

  // Fetch messages when a thread is selected
  useEffect(() => {
    if (selectedThread) {
      fetchMessages(selectedThread.channel, 1);
    }
  }, [selectedThread]);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/user/estates/conversations/1`);
      const data: ThreadsResponse = await response.json();
      if (data.success) {
        setThreads(data.data.data);
        // Auto-select first thread if available and no thread selected
        if (data.data.data.length > 0 && !selectedThread) {
          setSelectedThread(data.data.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (channel: string, page: number = 1) => {
    setLoadingMessages(true);
    try {
      const response = await fetch(
        `${API_BASE}/user/estates/conversations/${channel}/messages?page=${page}`
      );
      const data: MessagesResponse = await response.json();
      if (data.success) {
        if (page === 1) {
          setMessages(data.data.data);
        } else {
          setMessages((prev) => [...prev, ...data.data.data]);
        }
        setHasMoreMessages(data.data.next_page_url !== null);
        setMessagesPage(data.data.current_page);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const loadMoreMessages = () => {
    if (hasMoreMessages && !loadingMessages && selectedThread) {
      fetchMessages(selectedThread.channel, messagesPage + 1);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread || sendingMessage) return;

    setSendingMessage(true);
    const tempMessage: Message = {
      id: Date.now(),
      sender: 148, // Assuming current user ID
      channel: selectedThread.channel,
      receiver: selectedThread.receiver,
      message: newMessage.trim(),
      type: "text",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sender_first_name: "You",
      sender_last_name: "",
      sender_profile_picture: null,
      receiver_first_name: selectedThread.receiver_first_name,
      receiver_last_name: selectedThread.receiver_last_name,
      receiver_profile_picture: selectedThread.receiver_profile_picture,
    };

    // Optimistically add message
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      // Replace with actual send message endpoint
      const response = await fetch(
        `${API_BASE}/user/estates/conversations/${selectedThread.channel}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newMessage.trim(),
            receiver_id: selectedThread.receiver,
            type: "text",
          }),
        }
      );

      if (!response.ok) {
        // If failed, remove the optimistic message
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        throw new Error("Failed to send message");
      }

      // Optionally refresh messages or update with server response
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    } finally {
      setSendingMessage(false);
    }
  };

  // Get the user's full name for display
  const getSenderName = (message: Message) => {
    if (message.sender === 148) return "You"; // Current user ID
    return `${message.sender_first_name} ${message.sender_last_name}`.trim();
  };

  // Check if message is from current user
  const isOwnMessage = (message: Message) => {
    return message.sender === 148; // Current user ID
  };

  // Get thread display name
  const getThreadDisplayName = (thread: Thread) => {
    if (thread.sender === 148) {
      return `${thread.receiver_first_name} ${thread.receiver_last_name}`.trim();
    }
    return `${thread.sender_first_name} ${thread.sender_last_name}`.trim();
  };

  // Get thread avatar initials
  const getThreadInitials = (thread: Thread) => {
    const name = getThreadDisplayName(thread);
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if thread is from current user
  const isThreadFromUser = (thread: Thread) => {
    return thread.sender === 148;
  };

  // Get thread online status (placeholder - could be enhanced with real-time data)
  const getThreadOnlineStatus = (thread: Thread) => {
    // You could implement real-time presence here
    return false;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredThreads = threads.filter(
    (thread) =>
      getThreadDisplayName(thread)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      thread.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleThreadSelect = (thread: Thread) => {
    setSelectedThread(thread);
    if (isMobile) {
      setShowThreads(false);
    }
  };

  const handleBackToThreads = () => {
    setShowThreads(true);
  };

  return (
    <div className="h-[600px] flex bg-white rounded-2xl border border-gray-100 overflow-hidden relative">
      {/* Thread List */}
      <div
        className={`
          flex flex-col border-r border-gray-100 bg-white
          ${
            isMobile
              ? `absolute inset-0 z-20 transition-transform duration-300 ease-in-out ${
                  showThreads ? "translate-x-0" : "-translate-x-full"
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
          ) : filteredThreads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
              <FiUser className="w-8 h-8 mb-2" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => handleThreadSelect(thread)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                  selectedThread?.id === thread.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getThreadInitials(thread)}
                    </div>
                    {getThreadOnlineStatus(thread) && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {getThreadDisplayName(thread)}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {new Date(thread.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {thread.channel}
                    </p>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {thread.last_message}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {selectedThread ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3 min-w-0">
                {isMobile && (
                  <button
                    onClick={handleBackToThreads}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                  >
                    <FiArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#79B833] to-[#8FD14F] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {getThreadInitials(selectedThread)}
                  </div>
                  {getThreadOnlineStatus(selectedThread) && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {getThreadDisplayName(selectedThread)}
                  </p>
                  <p className="text-xs text-gray-500 truncate hidden sm:block">
                    {selectedThread.channel}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                <FiMoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMessages && messages.length === 0 ? (
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
                  {hasMoreMessages && (
                    <div className="text-center">
                      <button
                        onClick={loadMoreMessages}
                        disabled={loadingMessages}
                        className="text-sm text-[#79B833] hover:underline disabled:opacity-50"
                      >
                        {loadingMessages ? "Loading..." : "Load more messages"}
                      </button>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isOwnMessage(msg) ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] ${
                          isOwnMessage(msg) ? "order-2" : "order-1"
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-3 ${
                            isOwnMessage(msg)
                              ? "bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm break-words">{msg.message}</p>
                        </div>
                        <div
                          className={`flex items-center mt-1 space-x-1.5 ${
                            isOwnMessage(msg) ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-xs text-gray-400">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {isOwnMessage(msg) && (
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
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-100 bg-white"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiPaperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
                  >
                    <FiImage className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
                  >
                    <FiSmile className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#79B833] transition-all text-sm min-w-0"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-full hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim() || sendingMessage}
                >
                  {sendingMessage ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiSend className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <FiUser className="w-12 h-12 text-gray-300 mb-3" />
            <p className="font-medium text-gray-500">Select a conversation</p>
            <p className="text-sm">Choose a thread to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPlatform;
