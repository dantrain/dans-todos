import { ServerStyleSheets } from "@material-ui/core";
import { RequestHandler } from "express";
import useragent from "useragent";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../client/app/App";
import { NotFoundContext } from "../client/components/NotFound/NotFound";
import { SignInContext } from "../client/pages/SignIn/SignIn";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

let assets: any = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const uiHandler: RequestHandler = (req, res) => {
  if (!req.session?.userid && req.url !== "/signin") {
    return res.redirect("/signin");
  }

  const agent = useragent.parse(req.headers["user-agent"]);
  const supportsGoogleOneTap = agent.family === "Chrome" && +agent.major >= 85;

  const notFoundContext: { statusCode?: number } = {};
  const sheets = new ServerStyleSheets();

  const markup = renderToString(
    sheets.collect(
      <StaticRouter location={req.url}>
        <NotFoundContext.Provider value={notFoundContext}>
          <SignInContext.Provider value={{ supportsGoogleOneTap }}>
            <App />
          </SignInContext.Provider>
        </NotFoundContext.Provider>
      </StaticRouter>
    )
  );

  const css = sheets.toString();

  res.status(notFoundContext.statusCode || 200).send(
    `<!doctype html>
<html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <meta name="google-signin-client_id" content="${CLIENT_ID}" />
      <title>Todo Next</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=block">
      <style id="jss-server-side">${css}</style>
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ""
      }
      ${
        process.env.NODE_ENV === "production"
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
      ${
        supportsGoogleOneTap
          ? `<script src="https://accounts.google.com/gsi/client" async defer></script>`
          : `<script>function googleLoaded() { window.GOOGLE_LOADED = true; }</script>
            <script src="https://apis.google.com/js/platform.js?onload=googleLoaded" async defer></script>`
      }
  </head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>`
  );
};

export default uiHandler;
