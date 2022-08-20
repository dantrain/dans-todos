import { authZEnvelopPlugin } from "@graphql-authz/envelop-plugin";
import { useLogger } from "@graphql-yoga/node";
import logger from "./logger.js";
import * as rules from "./rules.js";

const plugins = [
  useLogger({
    logFn: (eventName, args) => {
      if (eventName === "execute-start") {
        const contextValue = args.args.contextValue;

        logger.info(
          `GraphQL ${
            contextValue.query?.match(/^[a-z]+\s[^\s({\\]+/)?.[0]
          } ${JSON.stringify(contextValue.variables)}`
        );
      }
    },
  }),
  authZEnvelopPlugin({ rules }),
];

export default plugins;
