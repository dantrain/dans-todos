const signOut = async ({
  destroySession = false,
  disableAuto = false,
} = {}) => {
  if (disableAuto) {
    window.google.accounts.id.disableAutoSelect();
  }

  if (destroySession) {
    await fetch('/signout', { method: 'POST' });
  }

  window.location.href = '/signin';
};

export default signOut;
