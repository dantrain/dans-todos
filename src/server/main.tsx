import express from "express";
import helmet from "helmet";
import uiRouter from "./routers/ui";

const server = express();

if (process.env.NODE_ENV === "production") {
  server.use(helmet());
}

server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));

server.use(uiRouter);

export default server;
