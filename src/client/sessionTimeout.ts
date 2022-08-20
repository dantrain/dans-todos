import PubSub from "pubsub-js";
import signOut from "./utils/signOut.js";

if (window.__CONTEXT__.signedIn) {
  const MAX_AGE = +import.meta.env.VITE_SESSION_MAX_AGE!;
  const MAX_WAIT = Math.min(MAX_AGE + 1000, 43200000);
  const supportsRequestIdleCallback = "requestIdleCallback" in window;

  let sessionTimeoutCheck: NodeJS.Timeout;
  let sessionTimeoutDateLocal: number;

  const checkAndRedirect = () => {
    const delta =
      +(localStorage.getItem("sessionTimeoutDate") || sessionTimeoutDateLocal) -
      new Date().getTime();

    if (delta < 0) {
      signOut({ disableAuto: true });
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
