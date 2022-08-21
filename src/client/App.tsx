import {
  colors,
  createTheme,
  CssBaseline,
  Grow,
  ThemeProvider,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import ErrorSnackbar from "./components/ErrorSnackbar";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import relayEnvironment from "./relayEnvironment";

export type AppContext = {
  statusCode?: number;
  signedIn?: boolean;
  title?: string;
  name?: string;
  avatar?: string;
};

declare global {
  interface Window {
    __CONTEXT__: AppContext;
  }
}

const defaultContext: AppContext =
  typeof window !== "undefined" && window.__CONTEXT__ ? window.__CONTEXT__ : {};

export const Context = createContext<AppContext>(defaultContext);

const theme = createTheme({
  palette: {
    primary: { main: colors.blue[700] },
    secondary: { main: colors.pink[500] },
    background: { default: colors.grey[50] },
  },
});

function App({ context = defaultContext }: { context?: AppContext }) {
  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={Error}>
          <RelayEnvironmentProvider environment={relayEnvironment}>
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={3000}
              TransitionComponent={Grow}
            >
              <ErrorSnackbar />
              <Routes>
                <Route path="/signin" element={<SignIn />} />

                <Route path="/" element={<Home />} />
                <Route path="/active" element={<Home />} />
                <Route path="/completed" element={<Home />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </SnackbarProvider>
          </RelayEnvironmentProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
