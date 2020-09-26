import { Alert, AlertTitle } from "@material-ui/lab";
import { FallbackProps } from "react-error-boundary";
import React, { FC } from "react";

const Error: FC<FallbackProps> = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error?.message}
    </Alert>
  );
};

export default Error;
