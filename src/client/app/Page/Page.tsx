import { Container, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import Error from '../../components/Error/Error';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      minHeight: '100vh',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '@global #root': {
    minHeight: '100vh',
    padding: '0.02px 0',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    minWidth: '300px',
    margin: `${theme.spacing(5)}px 0`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
}));

const Page: FC = () => {
  const s = useStyles();

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={s.main}>
          <ErrorBoundary FallbackComponent={Error}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </Container>
    </>
  );
};

export default Page;
