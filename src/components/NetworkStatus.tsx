// components/NetworkStatusBar.tsx
import { useEffect, useState } from "react";
import { FiWifi, FiWifiOff } from "react-icons/fi";
import useNetworkStatus from "../hooks/useNetworkStatus";

const NetworkStatusBar = () => {
  const isOnline = useNetworkStatus();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Only show status when connection changes
    if (!isOnline) {
      setShowStatus(true);
    } else {
      const timer = setTimeout(() => setShowStatus(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showStatus) return null;

  return (
    <div
      className={`
      fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-auto text-sm
      px-4 py-3 rounded-md shadow-lg z-50 flex items-center
      ${isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"}
      animate-fade-in-up
    `}
    >
      {isOnline ? (
        <>
          <FiWifi className="mr-2" />
          <span>Connection restored</span>
        </>
      ) : (
        <>
          <FiWifiOff className="mr-2" />
          <span>You are offline. Some features may not work.</span>
        </>
      )}
    </div>
  );
};

export default NetworkStatusBar;
