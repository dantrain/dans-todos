import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/Home";
import relayEnvironment from "../relayEnvironment";

const App = () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  </RelayEnvironmentProvider>
);

export default App;
