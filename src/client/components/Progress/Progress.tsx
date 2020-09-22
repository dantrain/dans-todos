import React, { useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { CSSTransition } from "react-transition-group";
import { LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: "-4px",
    transformOrigin: "bottom",
  },
  enter: {
    opacity: 0,
    transform: "scaleY(0)",
  },
  enterActive: {
    opacity: 1,
    transform: "scaleY(1)",
    transition: "all 200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
  exit: {
    opacity: 1,
    transform: "scaleY(1)",
  },
  exitActive: {
    opacity: 0,
    transform: "scaleY(0)",
    transition: "all 250ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
});

const Progress = () => {
  const [noInFlight, setNoInFlight] = useState(0);

  const s = useStyles();

  useEffect(() => {
    const token = PubSub.subscribe("FETCH", (_msg: string, data: string) => {
      if (data === "START") setNoInFlight((state) => state + 1);
      if (data === "END") setNoInFlight((state) => Math.max(0, state - 1));
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (noInFlight > 0) {
      delayTimeoutRef.current = setTimeout(() => setLoading(true), 150);
    } else {
      setLoading(false);
    }

    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [noInFlight > 0]);

  return (
    <CSSTransition
      in={loading}
      timeout={{ enter: 200, exit: 250 }}
      classNames={{
        enter: s.enter,
        enterActive: s.enterActive,
        exit: s.exit,
        exitActive: s.exitActive,
      }}
      unmountOnExit
    >
      <LinearProgress className={s.root} />
    </CSSTransition>
  );
};

export default Progress;
