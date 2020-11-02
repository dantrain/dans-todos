import PubSub from 'pubsub-js';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { AppContext } from '../../app/App';

declare global {
  interface Window {
    __GOOGLE_LOADED__: boolean;
    gapi: typeof gapi;
    google: any;
  }
}

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

const SignIn = () => {
  const [status, setStatus] = useState('check');

  const el = (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div id="google-sign-in" />
      </div>
    </>
  );

  if (typeof window === 'undefined') {
    return el;
  }

  const { supportsGoogleOneTap } = useContext(AppContext);

  const signIn = useCallback(
    async (credential: string) => {
      PubSub.publish('FETCH_START');
      const response = await fetch(
        `/tokensignin${supportsGoogleOneTap ? '?onetap=true' : ''}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            SameSite: 'Strict',
          },
          credentials: 'same-origin',
          body: JSON.stringify({ credential }),
        }
      );

      PubSub.publish('FETCH_END');

      if (response.status === 204) {
        window.location.href = '/';
      } else {
        throw new Error('Sign-in failed');
      }
    },
    [supportsGoogleOneTap]
  );

  useLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    if (status === 'loaded') {
      if (supportsGoogleOneTap) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          auto_select: true,
          cancel_on_tap_outside: false,
          prompt_parent_id: 'google-sign-in',
          callback: ({ credential }: { credential: string }) => {
            signIn(credential);
          },
        });

        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            window.location.href = '/signin?noonetap=true';
          }
        });
      } else {
        window.gapi.signin2.render('google-sign-in', {
          width: 250,
          height: 50,
          longtitle: true,
          onsuccess: async (user) => {
            signIn(user.getAuthResponse().id_token);
          },
        });
      }
    } else {
      if (window.__GOOGLE_LOADED__) {
        setStatus('loaded');
      } else {
        setStatus('wait');
        timeout = setTimeout(() => setStatus('check'), 50);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  return el;
};

export default SignIn;
