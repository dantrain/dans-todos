import { Alert, AlertTitle } from '@material-ui/lab';
import React, { FC, useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AuthenticationError, NetworkError } from '../../../utils/errors';
import signOut from '../../../utils/signOut';

const Error: FC<FallbackProps> = ({ error }) => {
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
        <AlertTitle>Can't connect</AlertTitle>
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
