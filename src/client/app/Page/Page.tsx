import { Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import Error from '../../components/Error/Error';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      minHeight: '100vh',
    },
  },
  '@global #root': {
    minHeight: '100vh',
    padding: '0.02px 0',
  },
  main: {
    minWidth: '300px',
    margin: `${theme.spacing(5)} 0`,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing(2)} 0`,
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
