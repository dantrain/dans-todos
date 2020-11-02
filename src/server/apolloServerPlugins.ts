import { ApolloServerPlugin } from "apollo-server-plugin-base";

const logPlugin: ApolloServerPlugin = {
  requestDidStart: (requestContext) => {
    console.log(
      "Request started!",
      requestContext.request.query?.match(/^[a-z]+\s[^\s\({\\]+/)?.[0],
      requestContext.request.variables
    );
  },
};

export default [logPlugin];
