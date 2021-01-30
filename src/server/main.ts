import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware } from 'graphql-middleware';
import helmet from 'helmet';
import plugins from './apolloServerPlugins';
import authRouter from './auth';
import context from './context';
import errorHandler from './errorHandler';
import permissions from './permissions';
import schema from './schema';
import session from './session';
import uiRouter from './ui';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(
    helmet({
      referrerPolicy: { policy: 'origin' },
      // TODO: Add this back, see https://material-ui.com/styles/advanced/#content-security-policy-csp
      contentSecurityPolicy: false,
    })
  );
}

app.use(compression());

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));

app.use(session);

app.use(authRouter);

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  plugins,
});

apolloServer.applyMiddleware({ app });

app.use(uiRouter);

app.use(errorHandler);

export default app;
