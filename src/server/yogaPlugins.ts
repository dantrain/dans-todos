import { authZEnvelopPlugin } from "@graphql-authz/envelop-plugin";
import { useLogger } from "graphql-yoga";
import logger from "./logger.js";
import * as rules from "./rules.js";

const plugins = [
  useLogger({
    logFn: (eventName, args) => {
      if (eventName === "execute-start") {
        const params = args.args.contextValue.params;

        logger.info(
          `GraphQL ${
            params.query?.match(/^[a-z]+\s[^\s({\\]+/)?.[0]
          } ${JSON.stringify(params.variables)}`
        );
      }
    },
  }),
  authZEnvelopPlugin({ rules }),
];

export default plugins;
