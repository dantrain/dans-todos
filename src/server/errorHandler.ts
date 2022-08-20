import { ErrorRequestHandler } from "express";
import logger from "./logger.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
};

export default errorHandler;
