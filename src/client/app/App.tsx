import {
  AppBar,
  Box,
  Container,
  Grow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TransitionProps } from "@material-ui/core/transitions";
import { SnackbarProvider } from "notistack";
import React, { FC } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Route, Routes } from "react-router-dom";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import NotFound from "../components/NotFound/NotFound";
import Progress from "../components/Progress/Progress";
import RemoveServerCss from "../components/RemoveServerCss/RemoveServerCss";
import Home from "../pages/Home/Home";
import relayEnvironment from "../relayEnvironment";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/active" element={<Home />} />
            <Route path="/completed" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Container>
    </SnackbarProvider>
  </RelayEnvironmentProvider>
);

export default App;
