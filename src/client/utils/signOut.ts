const signOut = async ({
  destroySession = false,
  disableAuto = false,
} = {}) => {
  const promises = [];

  if (destroySession) {
    promises.push(fetch('/signout', { method: 'POST' }));
  }

  if (disableAuto) {
    if (window.__CONTEXT__.supportsGoogleOneTap) {
      window.google.accounts.id.disableAutoSelect();
    } else {
      promises.push(window.gapi.auth2.getAuthInstance().signOut());
    }
  }

  await Promise.all(promises);

  window.location.href = '/signin';
};

export default signOut;
