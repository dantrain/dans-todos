import React from "react";
import reactRoot from "./client/reactRoot";
import { BrowserRouter } from "react-router-dom";
import App from "./client/app/App";

reactRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}
