import React from "react";
import Suspense from "./Suspense";

let loaded = false;

const Loader = () => {
  if (!loaded) {
    throw new Promise<void>((res) => {
      setTimeout(() => {
        loaded = true;
        res();
      }, 1000);
    });
  }

  return <p>Loaded!</p>;
};

const SuspenseTest = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Loader />
  </Suspense>
);

export default SuspenseTest;
