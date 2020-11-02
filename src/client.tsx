import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { register } from 'razzle-plugin-workbox/service-worker';
import App from './client/app/App';
import reactRoot from './client/reactRoot';
import './client/sessionTimeout';
import patchConsole from './client/utils/patchConsole';

reactRoot.render(
  <BrowserRouter timeoutMs={1000}>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  patchConsole(
    /Did not expect server HTML|did not match\. Server|is deprecated in StrictMode/
  );
  module.hot.accept();
}

register();
