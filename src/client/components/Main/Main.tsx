import { Container, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../Error/Error";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: `${theme.spacing(5)}px 0`,
    [theme.breakpoints.down("xs")]: {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
}));

const Main: FC = ({ children }) => {
  const s = useStyles();
  return (
    <Container maxWidth="sm">
      <main className={s.main}>
        <ErrorBoundary FallbackComponent={Error}>{children}</ErrorBoundary>
      </main>
    </Container>
  );
};

export default Main;
