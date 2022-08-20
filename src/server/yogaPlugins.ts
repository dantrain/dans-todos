import { useLogger } from "@graphql-yoga/node";
import logger from "./logger.js";

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
];

export default plugins;
