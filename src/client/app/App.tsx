import {
  createTheme,
  Grow,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { TransitionProps } from '@mui/material/transitions';
import { SnackbarProvider } from 'notistack';
import React, { createContext, FC } from 'react';
import { Helmet } from 'react-helmet';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import relayEnvironment from '../relayEnvironment';
import ErrorSnackbar from './ErrorSnackbar/ErrorSnackbar';
import Page from './Page/Page';
import RemoveServerCss from './RemoveServerCss/RemoveServerCss';
import { blue, grey, pink } from '@mui/material/colors';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export type AppContext = {
  statusCode?: number;
  signedIn?: boolean;
  supportsGoogleOneTap?: boolean;
  name?: string;
  avatar?: string;
};

declare global {
  interface Window {
    __CONTEXT__: AppContext;
  }
}

let defaultContext: AppContext =
  typeof window !== 'undefined' && window.__CONTEXT__ ? window.__CONTEXT__ : {};

export const Context = createContext<AppContext>(defaultContext);

const theme = createTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: pink[500] },
    background: { default: grey[50] },
  },
});

const App = ({ context = defaultContext }: { context?: AppContext }) => (
  <Context.Provider value={context}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <Helmet
            titleTemplate={`${context.name || 'Dan'}'s Todos · %s`}
            defaultTitle={`${context.name || 'Dan'}'s Todos`}
          />
          <CssBaseline />
          <RemoveServerCss />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={3000}
            TransitionComponent={Grow as FC<TransitionProps>}
          >
            <ErrorSnackbar />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Page />}>
                <Route path="/" element={<Home />} />
                <Route path="/active" element={<Home />} />
                <Route path="/completed" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Context.Provider>
);

export default App;
