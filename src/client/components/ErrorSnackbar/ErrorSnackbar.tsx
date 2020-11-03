import { useSnackbar } from 'notistack';
import PubSub from 'pubsub-js';
import React, { FC, useEffect } from 'react';
import { AuthenticationError, NetworkError } from '../../utils/errors';

const ErrorSnackbar: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = PubSub.subscribe('FETCH_FAIL', (_msg: string, err: Error) => {
      if (err instanceof AuthenticationError) {
        return;
      } else if (err instanceof NetworkError) {
        enqueueSnackbar("Can't connect", {
          variant: 'warning',
        });
      } else {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      }
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return <>{children}</>;
};

export default ErrorSnackbar;
