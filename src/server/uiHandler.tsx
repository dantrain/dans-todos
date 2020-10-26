import { ServerStyleSheets } from "@material-ui/core";
import { RequestHandler } from "express";
import useragent from "useragent";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { AppContext } from "../client/app/App";
import serialize from "serialize-javascript";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

let assets: any = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const uiHandler: RequestHandler = (req, res) => {
  const context: AppContext = {};

  if (!req.session?.userid && req.url !== "/signin") {
    return res.redirect("/signin");
  } else {
    context.name = req.session?.name;
    context.avatar = req.session?.avatar;
  }

  if (req.url === "/signin") {
    const agent = useragent.parse(req.headers["user-agent"]);

    context.supportsGoogleOneTap =
      agent.family === "Chrome" && +agent.major >= 85;
  }

  const sheets = new ServerStyleSheets();

  const markup = renderToString(
    sheets.collect(
      <StaticRouter location={req.url}>
        <App context={context} />
      </StaticRouter>
    )
  );

  const css = sheets.toString();

  res.status(context.statusCode || 200).send(
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
        req.url === "/signin"
          ? context.supportsGoogleOneTap
            ? `<script src="https://accounts.google.com/gsi/client" async defer></script>`
            : `<script>function googleLoaded() { window.GOOGLE_LOADED = true; }</script>
            <script src="https://apis.google.com/js/platform.js?onload=googleLoaded" async defer></script>`
          : ""
      }
  </head>
  <body>
      <div id="root">${markup}</div>
      <script>window.CONTEXT = ${serialize(context)}</script>
  </body>
</html>`
  );
};

export default uiHandler;
