import React, { createContext, useContext } from "react";
import SignInButton from "./SignInButton";
import OneTapSignIn from "./OneTapSignIn";

export const SignInContext = createContext<{
  supportsGoogleOneTap: boolean;
}>({ supportsGoogleOneTap: false });

const SignIn = () => {
  const { supportsGoogleOneTap } = useContext(SignInContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {supportsGoogleOneTap ? <OneTapSignIn /> : <SignInButton />}
    </div>
  );
};

export default SignIn;
