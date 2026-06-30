import { useEffect, useState } from "react";
import ChannelList from "./ChannelList";
import MessageArea from "./MessageArea";

const ConversationSection = () => {
  const [selectedThread, setSelectedThread] = useState<Conversation>();
  const [isMobile, setIsMobile] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-[600px] flex bg-white rounded-2xl border border-gray-100 overflow-hidden relative">
      <ChannelList
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        show={showChannels}
        setShow={setShowChannels}
        selectedChannel={selectedThread}
        handleChannelSelect={setSelectedThread}
      />
      <MessageArea
        setShowChannel={setShowChannels}
        selectedChannel={selectedThread}
        isMobile={isMobile}
      />
    </div>
  );
};

export default ConversationSection;
