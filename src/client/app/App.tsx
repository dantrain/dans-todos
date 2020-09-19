import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "../pages/Home/Home";
import relayEnvironment from "../relayEnvironment";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import RemoveServerCss from "../components/RemoveServerCss/RemoveServerCss";

const App = () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <CssBaseline />
    <RemoveServerCss />
    <AppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar>
          <Typography variant="h5" component="h1">
            Todos
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    <Container maxWidth="sm">
      <Box my={5}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </Box>
    </Container>
  </RelayEnvironmentProvider>
);

export default App;
