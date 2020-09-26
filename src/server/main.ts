import express from "express";
import { ApolloServer } from "apollo-server-express";
import helmet from "helmet";
import "express-async-errors";
import uiHandler from "./uiHandler";
import schema from "./schema";
import context from "./context";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      // TODO: Add this back, see https://material-ui.com/styles/advanced/#content-security-policy-csp
      contentSecurityPolicy: false,
    })
  );
}

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));

const apolloServer = new ApolloServer({ schema, context });

apolloServer.applyMiddleware({ app });

app.get("/*", uiHandler);

export default app;
