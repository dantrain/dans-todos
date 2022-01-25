import React, { useEffect, useRef, useState } from 'react';
import PubSub from 'pubsub-js';
import { CSSTransition } from 'react-transition-group';
import { LinearProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    marginTop: '-4px',
    transformOrigin: 'bottom',
  },
  enter: {
    opacity: 0,
    transform: 'scaleY(0)',
  },
  enterActive: {
    opacity: 1,
    transform: 'scaleY(1)',
    transition: 'all 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
  exit: {
    opacity: 1,
    transform: 'scaleY(1)',
  },
  exitActive: {
    opacity: 0,
    transform: 'scaleY(0)',
    transition: 'all 250ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
});

const Progress = () => {
  const [noInFlight, setNoInFlight] = useState(0);
  const someInFlight = noInFlight > 0;

  const s = useStyles();

  useEffect(() => {
    const startToken = PubSub.subscribe('FETCH_START', () => {
      setNoInFlight((state) => state + 1);
    });

    const endToken = PubSub.subscribe('FETCH_END', () => {
      setNoInFlight((state) => Math.max(0, state - 1));
    });

    return () => {
      PubSub.unsubscribe(startToken);
      PubSub.unsubscribe(endToken);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (someInFlight) {
      delayTimeoutRef.current = setTimeout(() => setLoading(true), 200);
    } else {
      setLoading(false);
    }

    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [someInFlight]);

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
