import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { register } from 'razzle-plugin-workbox/service-worker';
import App from './client/app/App';
import reactRoot from './client/reactRoot';
import './client/sessionTimeout';
import patchConsole from './client/utils/patchConsole';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const emotionCache = createCache({
  key: process.env.RAZZLE_EMOTION_CACHE_KEY!,
});

reactRoot.render(
  <CacheProvider value={emotionCache}>
    <BrowserRouter timeoutMs={500}>
      <App />
    </BrowserRouter>
  </CacheProvider>
);

if (module.hot) {
  patchConsole(
    /UNSAFE_componentWillMount|Did not expect server HTML|did not match\. Server|is deprecated in StrictMode/
  );
  module.hot.accept();
}

register();
