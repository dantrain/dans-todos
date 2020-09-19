import React, { Suspense as ReactSuspense, SuspenseProps } from "react";

const Suspense = (props: SuspenseProps) => {
  if (typeof window === "undefined" && props.fallback) {
    return props.fallback;
  }

  return <ReactSuspense {...props} />;
};

export default Suspense;
