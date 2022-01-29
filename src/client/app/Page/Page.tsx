import { css, Global } from '@emotion/react';
import { Container } from '@mui/material';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import Error from '../../components/Error/Error';
import AppBar from './AppBar/AppBar';

const Page: FC = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            min-height: 100vh;
          }

          #root {
            min-height: 100vh;
            padding: 0.02px 0;
          }
        `}
      />
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
