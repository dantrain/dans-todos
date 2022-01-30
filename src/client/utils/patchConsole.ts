const patchConsole = (regex: RegExp) => {
  if (process.env.NODE_ENV !== 'production') {
    const patch =
      (func: typeof console.log) =>
      (...args: any[]) => {
        if (
          !(args && typeof args[0] === 'string' && args[0].search(regex) > -1)
        ) {
          func(...args);
        }
      };

    console.error = patch(console.error);
    console.warn = patch(console.warn);
  }
};

export default patchConsole;
