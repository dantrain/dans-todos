import React from "react";
import ReactDOM from "react-dom/client";
import "vite/modulepreload-polyfill";
import App from "./client/App";
import "./client/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
