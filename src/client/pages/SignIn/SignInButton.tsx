import React, { useLayoutEffect, useState } from "react";

declare global {
  interface Window {
    gapi: typeof gapi;
    GOOGLE_LOADED: boolean;
  }
}

const LoginButton = () => {
  const el = <div id="google-sign-in" />;

  if (typeof window === "undefined") {
    return el;
  }

  const [status, setStatus] = useState("check");

  useLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    if (status === "loaded") {
      window.gapi.signin2.render("google-sign-in", {
        width: 250,
        height: 50,
        longtitle: true,
        onsuccess: async (user) => {
          const response = await fetch("/tokensignin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              SameSite: "Strict",
            },
            body: JSON.stringify({
              credential: user.getAuthResponse().id_token,
            }),
          });

          if (response.status === 204) {
            window.location.href = "/";
          } else {
            throw new Error("Sign-in failed");
          }
        },
      });
    } else {
      if (window.GOOGLE_LOADED) {
        setStatus("loaded");
      } else {
        setStatus("wait");
        timeout = setTimeout(() => setStatus("check"), 50);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  return el;
};

export default LoginButton;
