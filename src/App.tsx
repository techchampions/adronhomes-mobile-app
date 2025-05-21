import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./routes/allRoutes";
import { Providers } from "./data/Provider";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Providers>
      <AllRoutes />
    </Providers>
  );
}

export default App;
