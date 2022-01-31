import express from 'express';
import logger from './server/logger';
import getApp from './server/main';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
  let app = await getApp();

  if (module.hot) {
    module.hot.accept('./server/main', async () => {
      console.log('🔁  HMR Reloading `./server/main`...');
      try {
        app = await require('./server/main').default();
      } catch (error) {
        console.error(error);
      }
    });
    console.info('✅  Server-side HMR Enabled!');
  }

  await new Promise<void>((resolve) => {
    express()
      .use((req, res) => app.handle(req, res))
      .on('error', (error) => {
        logger.error(error);
      })
      .listen(port, resolve);
  });

  logger.info(`App started on http://localhost:${port}`);
};

startServer();
