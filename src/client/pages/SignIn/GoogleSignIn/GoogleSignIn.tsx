import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { Context } from '../../../app/App';

declare global {
  interface Window {
    __GOOGLE_LOADED__: boolean;
    gapi: typeof gapi;
    google: any;
  }
}

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

const useLayoutEffectClient =
  typeof window !== 'undefined' ? useLayoutEffect : () => {};

const GoogleSignIn = () => {
  const [status, setStatus] = useState('check');
  const { supportsGoogleOneTap } = useContext(Context);

  const signIn = useCallback(
    async (credential: string) => {
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

      if (response.status === 204) {
        window.location.href = '/';
      } else {
        throw new Error('Sign-in failed');
      }
    },
    [supportsGoogleOneTap]
  );

  useLayoutEffectClient(() => {
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
  }, [signIn, status, supportsGoogleOneTap]);

  return (
    <div style={{ height: 300 }}>
      <div id="google-sign-in" />
    </div>
  );
};

export default GoogleSignIn;
