import React, { useEffect, useState } from "react";
import { useNProgress } from "@tanem/react-nprogress";
import PubSub from "pubsub-js";
import { makeStyles, Theme } from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";

const color = pink[500];

const useStyles = makeStyles<Theme, ReturnType<typeof useNProgress>>({
  container: {
    opacity: ({ isFinished }) => (isFinished ? 0 : 1),
    pointerEvents: "none",
    transition: ({ animationDuration }) =>
      `opacity ${animationDuration}ms linear`,
  },
  bar: {
    background: color,
    height: 3,
    left: 0,
    position: "fixed",
    top: 0,
    transition: ({ animationDuration }) =>
      `margin-left ${animationDuration}ms linear`,
    width: "100%",
    zIndex: 1031,
  },
  barEnd: {
    boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
    display: "block",
    height: "100%",
    opacity: 1,
    position: "absolute",
    right: 0,
    transform: "rotate(3deg) translate(0px, -4px)",
    width: 100,
  },
});

const Progress = () => {
  const [noInFlight, setNoInFlight] = useState(0);
  const progressProps = useNProgress({ isAnimating: noInFlight > 0 });
  const s = useStyles(progressProps);

  useEffect(() => {
    const token = PubSub.subscribe("FETCH", (msg: string, data: string) => {
      if (data === "START") setNoInFlight((state) => state + 1);
      if (data === "END") setNoInFlight((state) => Math.max(0, state - 1));
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <div className={s.container}>
      <div
        className={s.bar}
        style={{ marginLeft: `${(-1 + progressProps.progress) * 100}%` }}
      >
        <div className={s.barEnd}></div>
      </div>
    </div>
  );
};

export default Progress;
