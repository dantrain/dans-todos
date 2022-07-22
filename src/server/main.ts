import express from "express";
import uiRouter from "./ui.js";

const getApp = async () => {
  const app = express();

  app.use(uiRouter);

  return app;
};

export default getApp;
