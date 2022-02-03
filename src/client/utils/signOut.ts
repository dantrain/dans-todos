const signOut = async ({
  destroySession = false,
  disableAuto = false,
} = {}) => {
  const promises = [];

  if (destroySession) {
    promises.push(fetch('/signout', { method: 'POST' }));
  }

  if (disableAuto) {
    window.google.accounts.id.disableAutoSelect();
  }

  await Promise.all(promises);

  window.location.href = '/signin';
};

export default signOut;
