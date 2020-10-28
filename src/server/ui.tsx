import express from "express";
import { ServerStyleSheets } from "@material-ui/core";
import useragent from "useragent";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { AppContext } from "../client/app/App";
import Index from "./Index/Index";

const uiRouter = express.Router();

uiRouter.get("/*", (req, res) => {
  const context: AppContext = {};

  if (!req.session?.userid && req.url !== "/signin") {
    return res.redirect("/signin");
  } else {
    context.name = req.session?.name;
    context.avatar = req.session?.avatar;
    context.supportsGoogleOneTap = req.session?.supportsGoogleOneTap;
  }

  if (req.url === "/signin") {
    const agent = useragent.parse(req.headers["user-agent"]);

    context.signIn = true;
    context.supportsGoogleOneTap =
      agent.family === "Chrome" && +agent.major >= 85;
  }

  const sheets = new ServerStyleSheets();

  const content = renderToString(
    sheets.collect(
      <StaticRouter location={req.url}>
        <App context={context} />
      </StaticRouter>
    )
  );

  const css = sheets.toString();

  const html = renderToStaticMarkup(
    <Index css={css} content={content} context={context} />
  );

  res.status(context.statusCode || 200).send(`<!DOCTYPE html>\n${html}`);
});

export default uiRouter;
