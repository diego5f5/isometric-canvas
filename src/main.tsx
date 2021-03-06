import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CanvasContextProvider } from "./context/CanvasContext";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CanvasContextProvider>
      <App />
    </CanvasContextProvider>
  </React.StrictMode>
);
