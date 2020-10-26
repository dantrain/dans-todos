import {
  AppBar,
  Avatar,
  Container,
  Grow,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TransitionProps } from "@material-ui/core/transitions";
import { SnackbarProvider } from "notistack";
import React, { createContext, FC } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Routes } from "react-router-dom";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import Main from "../components/Main/Main";
import NotFound from "../components/NotFound/NotFound";
import Progress from "../components/Progress/Progress";
import RemoveServerCss from "../components/RemoveServerCss/RemoveServerCss";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import relayEnvironment from "../relayEnvironment";

export type AppContext = {
  statusCode?: number;
  supportsGoogleOneTap?: boolean;
  name?: string;
  avatar?: string;
};

declare global {
  interface Window {
    CONTEXT: AppContext;
  }
}

let defaultContext: AppContext =
  typeof window !== "undefined" && window.CONTEXT ? window.CONTEXT : {};

export const AppContext = createContext<AppContext>(defaultContext);

const useStyles = makeStyles({ title: { flexGrow: 1 } });

const App = ({ context = defaultContext }: { context?: AppContext }) => {
  const s = useStyles();

  return (
    <AppContext.Provider value={context}>
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
          <AppBar position="sticky">
            <Container maxWidth="sm">
              <Toolbar>
                <Typography className={s.title} variant="h5" component="h1">
                  {context.name ? `${context.name}'s Todos` : "Todos"}
                </Typography>
                {context.avatar && context.name ? (
                  <Avatar alt={context.name} src={context.avatar} />
                ) : null}
              </Toolbar>
            </Container>
            <Progress />
          </AppBar>
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
    </AppContext.Provider>
  );
};

export default App;
