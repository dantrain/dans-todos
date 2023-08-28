import google from "google-one-tap";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __GOOGLE_LOADED__: boolean;
    google: typeof google;
  }
}

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const useLayoutEffectClient =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

const GoogleSignIn = () => {
  const [status, setStatus] = useState("check");
  const ref = useRef<HTMLDivElement>(null);

  const signIn = useCallback(async (credential: string) => {
    const response = await fetch(`/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        SameSite: "Strict",
      },
      credentials: "same-origin",
      body: `credential=${credential}&fetch=true`,
    });

    if (response.status === 204) {
      window.location.href = "/";
    } else {
      throw new Error("Sign-in failed");
    }
  }, []);

  useLayoutEffectClient(() => {
    let timeout: NodeJS.Timeout;

    if (status === "loaded") {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        auto_select: true,
        cancel_on_tap_outside: false,
        prompt_parent_id: "google-sign-in",
        ux_mode: "redirect",
        callback: ({ credential }: { credential: string }) => {
          signIn(credential);
        },
        // Opt out of one tap on ITP browsers
        // see https://developers.google.com/identity/gsi/web/guides/itp
        // itp_support: false,

        // Enable FedCM
        // see https://developers.google.com/identity/gsi/web/guides/fedcm-migration#migrate_your_web_app
        // @ts-ignore
        use_fedcm_for_prompt: true,
      });

      window.google.accounts.id.prompt((notification) => {
        if (
          (notification.isNotDisplayed() || notification.isSkippedMoment()) &&
          ref.current
        ) {
          window.google.accounts.id.renderButton(ref.current, {
            theme: "outline",
            size: "large",
          });
        }
      });
    } else {
      if (window.__GOOGLE_LOADED__) {
        setStatus("loaded");
      } else {
        setStatus("wait");
        timeout = setTimeout(() => setStatus("check"), 50);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [signIn, status]);

  return (
    <div style={{ height: 300 }}>
      <div id="google-sign-in" />
      <div ref={ref} style={{ maxHeight: 41, overflow: "hidden" }} />
    </div>
  );
};

export default GoogleSignIn;
