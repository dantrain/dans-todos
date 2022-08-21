import { ErrorRequestHandler } from "express";
import logger from "./logger.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
};

export default errorHandler;
