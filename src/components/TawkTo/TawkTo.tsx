// src/components/TawkTo.tsx
import { useEffect } from "react";

interface TawkToProps {
  propertyId: string;
  widgetName: string;
}

const TawkTo = ({ propertyId, widgetName }: TawkToProps) => {
  useEffect(() => {
    // Prevent loading if already loaded
    if (window.Tawk_API?.hideWidget) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetName}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      const tawkEl = document.getElementById("tawk-script");
      if (tawkEl) {
        document.body.removeChild(tawkEl);
      }
    };
  }, [propertyId, widgetName]);

  return null;
};

export default TawkTo;
