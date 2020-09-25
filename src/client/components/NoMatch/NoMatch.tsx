import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { Route } from "react-router-dom";

const NoMatch = () => (
  <Route
    path="*"
    render={({ staticContext }) => {
      if (staticContext) staticContext.statusCode = 404;
      return (
        <Alert severity="error">
          <AlertTitle>404'd!!</AlertTitle>
          Were you just making up names of files or what? I mean, I've seen some
          pretend file names in my day, but come on! It's like you're not even
          trying.
        </Alert>
      );
    }}
  />
);

export default NoMatch;
