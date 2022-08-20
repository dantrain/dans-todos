import logger from "./server/logger.js";
import getApp from "./server/main.js";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
  let app = await getApp();

  app.on("error", (error) => {
    logger.error(error);
  });

  app.listen(port);

  logger.info(`App started on http://localhost:${port}`);
};

startServer();
