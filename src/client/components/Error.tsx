import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { AuthenticationError, NetworkError } from "../utils/errors.js";
import signOut from "../utils/signOut.js";

const Error = ({ error }: { error: any }) => {
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
      <Alert severity="warning" style={{ maxWidth: 550, margin: "0 auto" }}>
        <AlertTitle>Can&apos;t connect</AlertTitle>
        Maybe check your internets?
      </Alert>
    );
  }

  return (
    <Alert severity="error" style={{ maxWidth: 550, margin: "0 auto" }}>
      <AlertTitle>Error</AlertTitle>
      {error?.message}
    </Alert>
  );
};

export default Error;
