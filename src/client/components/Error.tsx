import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { AuthenticationError, NetworkError } from "../utils/errors";
import signOut from "../utils/signOut";

const Error = ({ error }: FallbackProps) => {
  useEffect(() => {
    if (error instanceof AuthenticationError) {
      signOut();
    }
  }, [error]);

  if (error instanceof AuthenticationError) {
    return null;
  }

  if (error instanceof NetworkError) {
    return (
      <Alert severity="warning">
        <AlertTitle>Can&apos;t connect</AlertTitle>
        Maybe check your internets?
      </Alert>
    );
  }

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error?.message}
    </Alert>
  );
};

export default Error;
