import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import logger from './logger';

const logPlugin: ApolloServerPlugin = {
  requestDidStart: (requestContext) => {
    logger.info(
      `GraphQL ${
        requestContext.request.query?.match(/^[a-z]+\s[^\s\({\\]+/)?.[0]
      } ${JSON.stringify(requestContext.request.variables)}`
    );
  },
};

export default [logPlugin];
