declare module "@tawk.to/tawk-messenger-react" {
  import { FC } from "react";

  interface TawkToProps {
    propertyId: string;
    widgetId?: string;
    onLoad?: () => void;
  }

  const TawkTo: FC<TawkToProps>;
  export default TawkTo;
}
