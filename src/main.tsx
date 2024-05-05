import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </BrowserRouter>
);
