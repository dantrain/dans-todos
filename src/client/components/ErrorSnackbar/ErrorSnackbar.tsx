import React, { FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import PubSub from 'pubsub-js';

const ErrorSnackbar: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = PubSub.subscribe('FETCH_FAIL', (_msg: string, err: Error) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return <>{children}</>;
};

export default ErrorSnackbar;
