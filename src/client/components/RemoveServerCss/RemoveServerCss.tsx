import React, { useEffect } from "react";

const RemoveServerCss: React.FC = ({ children }) => {
  useEffect(() => {
    const jssStyles = document.getElementById("jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return <>{children}</>;
};

export default RemoveServerCss;
