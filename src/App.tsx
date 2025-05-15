import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/allRoutes";
import { Providers } from "./data/Provider";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <Providers>
      <AllRoutes />
    </Providers>
  );
}

export default App;
