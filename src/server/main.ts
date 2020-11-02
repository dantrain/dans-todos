import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import authRouter from "./auth";
import context from "./context";
import schema from "./schema";
import session from "./session";
import uiRouter from "./ui";
import plugins from "./apolloServerPlugins";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      referrerPolicy: { policy: "origin" },
      // TODO: Add this back, see https://material-ui.com/styles/advanced/#content-security-policy-csp
      contentSecurityPolicy: false,
    })
  );
}

app.use(compression());

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));

app.use(session);

app.use(authRouter);

const apolloServer = new ApolloServer({ schema, context, plugins });

apolloServer.applyMiddleware({ app });

app.use(uiRouter);

export default app;
