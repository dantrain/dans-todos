import React from "react";
import reactRoot from "./client/reactRoot";
import { BrowserRouter } from "react-router-dom";
import App from "./client/app/App";
import patchConsole from "./client/utils/patchConsole";

reactRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  patchConsole("did not match. Server:");
  module.hot.accept();
}
