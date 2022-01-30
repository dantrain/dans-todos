import { createTheme, Grow, ThemeProvider } from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { TransitionProps } from '@mui/material/transitions';
import { SnackbarProvider } from 'notistack';
import React, { createContext, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Environment, RelayEnvironmentProvider } from 'react-relay/hooks';
import { Route, Routes } from 'react-router-dom';
import 'twin.macro';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import relayEnvironment from '../relayEnvironment';
import ErrorSnackbar from './ErrorSnackbar/ErrorSnackbar';
import Page from './Page/Page';

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
    <ThemeProvider theme={theme}>
      <RelayEnvironmentProvider
        environment={(relayEnvironment as unknown) as Environment}
      >
        <Helmet
          titleTemplate={`${context.name || 'Dan'}'s Todos · %s`}
          defaultTitle={`${context.name || 'Dan'}'s Todos`}
        />
        <CssBaseline />
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
  </Context.Provider>
);

export default App;
