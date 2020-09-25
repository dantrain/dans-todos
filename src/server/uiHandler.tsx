import { ServerStyleSheets } from "@material-ui/core";
import { RequestHandler } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../client/app/App";

let assets: any = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const uiHandler: RequestHandler = (req, res) => {
  const context: { statusCode?: number } = {};
  const sheets = new ServerStyleSheets();

  const markup = renderToString(
    sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <App />
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
  </head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>`
  );
};

export default uiHandler;
