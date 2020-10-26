import React, { createContext, useContext } from "react";
import SignInButton from "./SignInButton";
import OneTapSignIn from "./OneTapSignIn";
import { AppContext } from "../../app/App";

const SignIn = () => {
  const { supportsGoogleOneTap } = useContext(AppContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {supportsGoogleOneTap ? <OneTapSignIn /> : <SignInButton />}
    </div>
  );
};

export default SignIn;
