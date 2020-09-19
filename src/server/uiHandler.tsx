import { RequestHandler } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../client/app/App";

let assets: any = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const uiHandler: RequestHandler = (req, res) => {
  const context = {};

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  res.send(
    `<!doctype html>
<html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Razzle TypeScript</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
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
