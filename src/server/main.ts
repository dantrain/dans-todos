import express from "express";
import { ApolloServer } from "apollo-server-express";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import helmet from "helmet";
import "express-async-errors";
import uiHandler from "./uiHandler";
import schema from "./schema";
import context from "./context";
import authRouter from "./auth";

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

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "todo.sid",
    secret: "ultra secret secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
);

app.use(authRouter);

const apolloServer = new ApolloServer({ schema, context });

apolloServer.applyMiddleware({ app });

app.get("/*", uiHandler);

export default app;
