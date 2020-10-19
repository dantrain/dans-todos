import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const el = <div id="google-sign-in" />;

  if (typeof window === "undefined") {
    return el;
  }

  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (loaded) {
      window.gapi.signin2.render("google-sign-in", {
        width: 250,
        height: 50,
        longtitle: true,
        onSuccess: async (user) => {
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

          if (response.status === 200) {
            navigate("/");
          } else {
            throw new Error("Sign-in failed");
          }
        },
      });
    } else {
      if (window.GOOGLE_LOADED) {
        setLoaded(true);
      } else {
        window.googleLoaded = () => {
          setLoaded(true);
        };
      }
    }

    return () => {
      window.googleLoaded = () => {};
    };
  }, [loaded]);

  return el;
};

export default LoginButton;
