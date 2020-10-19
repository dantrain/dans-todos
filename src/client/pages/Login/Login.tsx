import React, { createContext, useContext } from "react";
import LoginButton from "./LoginButton";
import LoginOneTap from "./LoginOneTap";

export const LoginContext = createContext<{
  supportsGoogleOneTap: boolean;
}>({ supportsGoogleOneTap: false });

const Login = () => {
  const { supportsGoogleOneTap } = useContext(LoginContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {supportsGoogleOneTap ? <LoginOneTap /> : <LoginButton />}
    </div>
  );
};

export default Login;
