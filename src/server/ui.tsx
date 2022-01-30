import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import express from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom/server';
import useragent from 'useragent';
import App, { AppContext } from '../client/app/App';
import Index from './Index/Index';

const key = process.env.RAZZLE_EMOTION_CACHE_KEY!;
const uiRouter = express.Router();

uiRouter.get('/*', (req, res) => {
  const context: AppContext = {};

  if (!req.session?.userid && req.path !== '/signin') {
    return res.redirect('/signin');
  }

  if (req.path === '/signin') {
    const agent = useragent.parse(req.headers['user-agent']);

    context.supportsGoogleOneTap =
      !req.query.noonetap &&
      ((agent.family.includes('Chrome') && +agent.major >= 85) ||
        (agent.family.includes('Firefox') && +agent.major >= 80));
  } else if (req.session?.userid) {
    context.signedIn = true;
    context.name = req.session.name;
    context.avatar = req.session.avatar;
    context.supportsGoogleOneTap = req.session.supportsGoogleOneTap;
  }

  const emotionCache = createCache({ key });
  const { extractCritical } = createEmotionServer(emotionCache);

  const { html, css, ids } = extractCritical(
    renderToString(
      <CacheProvider value={emotionCache}>
        <StaticRouter location={req.url}>
          <App context={context} />
        </StaticRouter>
      </CacheProvider>
    )
  );

  const helmet = Helmet.renderStatic();

  const markup = renderToStaticMarkup(
    <Index
      helmet={helmet}
      content={html}
      emotion={{ key, css, ids }}
      context={context}
    />
  );

  res.status(context.statusCode || 200).send(`<!DOCTYPE html>\n${markup}`);
});

export default uiRouter;
