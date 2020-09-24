import {
  AppBar,
  Box,
  Container,
  Grow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { FC } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Switch } from "react-router-dom";
import Progress from "../components/Progress/Progress";
import RemoveServerCss from "../components/RemoveServerCss/RemoveServerCss";
import Home from "../pages/Home/Home";
import relayEnvironment from "../relayEnvironment";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import { TransitionProps } from "@material-ui/core/transitions";

const App = () => (
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
            <Typography variant="h5" component="h1">
              Todos
            </Typography>
          </Toolbar>
        </Container>
        <Progress />
      </AppBar>
      <Container maxWidth="sm">
        <Box my={5}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
          </Switch>
        </Box>
      </Container>
    </SnackbarProvider>
  </RelayEnvironmentProvider>
);

export default App;
