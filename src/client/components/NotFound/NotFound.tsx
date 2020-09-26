import { Alert, AlertTitle } from "@material-ui/lab";
import React, { createContext, useContext } from "react";

export const NotFoundContext = createContext<{ statusCode?: number }>({});

const NotFound = () => {
  const context = useContext(NotFoundContext);
  context.statusCode = 404;

  return (
    <Alert severity="error">
      <AlertTitle>404'd!!</AlertTitle>
      Were you just making up names of files or what? I mean, I've seen some
      pretend file names in my day, but come on! It's like you're not even
      trying.
    </Alert>
  );
};

export default NotFound;
