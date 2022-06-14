import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CanvasContextProvider } from "./context/CanvasContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CanvasContextProvider>
      <App />
    </CanvasContextProvider>
  </React.StrictMode>
);
