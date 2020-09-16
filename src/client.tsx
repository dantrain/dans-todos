import React from "react";
import { unstable_createRoot as createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./client/app/App";

import "./client/base.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement, { hydrate: true }).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

if (module.hot) {
  module.hot.accept();
}
