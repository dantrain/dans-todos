import { createServer } from "@graphql-yoga/node";
import compression from "compression";
import express from "express";
import "express-async-errors";
import path from "path";
import errorHandler from "./errorHandler.js";
import schema from "./schema.js";
import uiRouter from "./ui.js";

const isProd = process.env.NODE_ENV === "production";

const getApp = async () => {
  const app = express();

  app.use(compression());

  if (isProd) {
    app.use(express.static(path.resolve("dist/client/")));
  }

  const graphQLServer = createServer({ schema });

  app.use("/graphql", graphQLServer);

  app.use(uiRouter);

  app.use(errorHandler);

  return app;
};

export default getApp;
