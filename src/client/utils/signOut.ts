export default async ({ destroySession = false } = {}) => {
  const promises = [];

  if (destroySession) {
    promises.push(fetch("/signout", { method: "POST" }));
  }

  if (window.__CONTEXT__.supportsGoogleOneTap) {
    window.google.accounts.id.disableAutoSelect();
  } else {
    promises.push(window.gapi.auth2.getAuthInstance().signOut());
  }

  await Promise.all(promises);

  window.location.href = "/signin";
};
