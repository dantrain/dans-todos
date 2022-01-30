import express from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom/server';
import useragent from 'useragent';
import App, { AppContext } from '../client/app/App';
import Index from './Index/Index';

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

  const content = renderToString(
    <StaticRouter location={req.url}>
      <App context={context} />
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  const html = renderToStaticMarkup(
    <Index helmet={helmet} content={content} context={context} />
  );

  res.status(context.statusCode || 200).send(`<!DOCTYPE html>\n${html}`);
});

export default uiRouter;
