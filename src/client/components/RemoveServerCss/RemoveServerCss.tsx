import React, { FC, useEffect } from "react";

const RemoveServerCss: FC = ({ children }) => {
  useEffect(() => {
    const jssStyles = document.getElementById("jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return <>{children}</>;
};

export default RemoveServerCss;
