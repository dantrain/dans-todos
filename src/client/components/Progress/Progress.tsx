import { ClassNames } from '@emotion/react';
import { LinearProgress } from '@mui/material';
import PubSub from 'pubsub-js';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import tw from 'twin.macro';

const Progress = () => {
  const [noInFlight, setNoInFlight] = useState(0);
  const someInFlight = noInFlight > 0;

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
    <ClassNames>
      {({ css }) => (
        <CSSTransition
          in={loading}
          timeout={{ enter: 200, exit: 250 }}
          classNames={{
            enter: css`
              ${tw`opacity-0 scale-y-0`}
            `,
            enterActive: css`
              ${tw`opacity-100 scale-y-100`}
              transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
            `,
            exit: css`
              ${tw`opacity-100 scale-y-100`}
            `,
            exitActive: css`
              ${tw`opacity-0 scale-y-0`}
              transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
            `,
          }}
          unmountOnExit
        >
          <LinearProgress tw="-mt-1 origin-bottom" />
        </CSSTransition>
      )}
    </ClassNames>
  );
};

export default Progress;
