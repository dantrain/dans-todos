import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import Error from '../../components/Error/Error';
import GoogleSignIn from './GoogleSignIn/GoogleSignIn';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    maxHeight: '800px',
  },
}));

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M11.76,13.28L9.69,11.2 c-0.38-0.39-0.38-1.01,0-1.4l0,0c0.39-0.39,1.02-0.39,1.41,0l1.36,1.37l4.42-4.46c0.39-0.39,1.02-0.39,1.41,0l0,0 c0.38,0.39,0.38,1.01,0,1.4l-5.13,5.17C12.79,13.68,12.15,13.68,11.76,13.28z M3,6L3,6C2.45,6,2,6.45,2,7v13c0,1.1,0.9,2,2,2h13 c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5c-0.55,0-1-0.45-1-1V7C4,6.45,3.55,6,3,6z"
      fill="currentColor"
    />
  </svg>
);

const SignIn = () => {
  const s = useStyles();

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <main className={s.main}>
        <Box
          mb={3}
          style={{ height: 100, width: 100 }}
          color="primary.contrastText"
        >
          <Logo />
        </Box>
        <Box mb={8} color="primary.contrastText">
          <Typography variant="h4" component="h1">
            Dan's Todos
          </Typography>
        </Box>
        <ErrorBoundary FallbackComponent={Error}>
          <GoogleSignIn />
        </ErrorBoundary>
      </main>
    </>
  );
};

export default SignIn;
