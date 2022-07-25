import { createServer } from "@graphql-yoga/node";
import express from "express";
import path from "path";
import apiRouter from "./api.js";
import schema from "./schema.js";
import uiRouter from "./ui.js";

const isProd = process.env.NODE_ENV === "production";

const getApp = async () => {
  const app = express();

  if (isProd) {
    app.use(express.static(path.resolve("dist/client/")));
  }

  const graphQLServer = createServer({ schema });

  app.use("/graphql", graphQLServer);

  app.use(apiRouter);

  app.use(uiRouter);

  return app;
};

export default getApp;
