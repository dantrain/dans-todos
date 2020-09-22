export default (filterString: string) => {
  if (process.env.NODE_ENV !== "production") {
    const orgError = console.error;

    console.error = (...args: any[]) => {
      if (
        !(
          args &&
          typeof args[0] === "string" &&
          args[0].indexOf(filterString) > -1
        )
      ) {
        orgError(...args);
      }
    };
  }
};
