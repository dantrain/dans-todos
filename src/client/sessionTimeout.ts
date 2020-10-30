import PubSub from "pubsub-js";

declare global {
  interface Window {
    requestIdleCallback: any;
  }
}

if (!window.__CONTEXT__.signIn) {
  const MAX_AGE = +process.env.RAZZLE_SESSION_MAX_AGE!;
  const MAX_WAIT = Math.min(MAX_AGE + 1000, 43200000);
  const supportsRequestIdleCallback = "requestIdleCallback" in window;

  let sessionTimeoutCheck: NodeJS.Timeout;
  let sessionTimeoutDateLocal: number;

  const checkAndRedirect = () => {
    const delta =
      +(localStorage.getItem("sessionTimeoutDate") || sessionTimeoutDateLocal) -
      new Date().getTime();

    if (delta < 0) {
      window.google?.accounts?.id?.disableAutoSelect();
      window.location.href = "/signin";
    } else {
      sessionTimeoutCheck = setTimeout(
        checkAndRedirect,
        Math.min(delta + 1000, MAX_WAIT)
      );
    }
  };

  const scheduleCheck = () => {
    clearTimeout(sessionTimeoutCheck);
    const sessionTimeoutDate = new Date().getTime() + MAX_AGE;
    sessionTimeoutDateLocal = sessionTimeoutDate;
    localStorage.setItem("sessionTimeoutDate", `${sessionTimeoutDate}`);
    sessionTimeoutCheck = setTimeout(checkAndRedirect, MAX_WAIT);
  };

  PubSub.subscribe("FETCH_SUCCESS", () => {
    if (supportsRequestIdleCallback) {
      window.requestIdleCallback(scheduleCheck, { timeout: 500 });
    } else {
      setTimeout(scheduleCheck, 50);
    }
  });

  scheduleCheck();
}
