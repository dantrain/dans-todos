import { css } from '@emotion/react';
import { Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Error from '../../components/Error/Error';
import AppBar from './AppBar/AppBar';

const useStyles = makeStyles(() => ({
  '@global': {
    body: {
      minHeight: '100vh',
    },
  },
  '@global #root': {
    minHeight: '100vh',
    padding: '0.02px 0',
  },
}));

const Page: FC = () => {
  useStyles();

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main
          tw="my-4 sm:my-10"
          css={css`
            min-width: 300px;
          `}
        >
          <ErrorBoundary FallbackComponent={Error}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </Container>
    </>
  );
};

export default Page;
