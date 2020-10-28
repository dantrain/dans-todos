import { createMuiTheme, Grow, ThemeProvider } from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TransitionProps } from "@material-ui/core/transitions";
import { SnackbarProvider } from "notistack";
import React, { createContext, FC } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Routes } from "react-router-dom";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import Main from "../components/Main/Main";
import NotFound from "../components/NotFound/NotFound";
import RemoveServerCss from "../components/RemoveServerCss/RemoveServerCss";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import relayEnvironment from "../relayEnvironment";
import AppBar from "./AppBar/AppBar";

export type AppContext = {
  statusCode?: number;
  signIn?: boolean;
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
  typeof window !== "undefined" && window.__CONTEXT__ ? window.__CONTEXT__ : {};

export const AppContext = createContext<AppContext>(defaultContext);

const theme = createMuiTheme({
  palette: { primary: { main: "#1976d2" }, secondary: pink },
});

const App = ({ context = defaultContext }: { context?: AppContext }) => (
  <AppContext.Provider value={context}>
    <ThemeProvider theme={theme}>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <CssBaseline />
        <RemoveServerCss />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          TransitionComponent={Grow as FC<TransitionProps>}
        >
          <ErrorSnackbar />
          <AppBar />
          <Main>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route path="/active" element={<Home />} />
              <Route path="/completed" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Main>
        </SnackbarProvider>
      </RelayEnvironmentProvider>
    </ThemeProvider>
  </AppContext.Provider>
);

export default App;
