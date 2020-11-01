import { RequestHandler } from "express";

const redirectToHttps: RequestHandler = (req, res, next) => {
  if (req.headers["x-forwarded-proto"] === "https") {
    return next();
  }

  res.redirect(`https://${req.hostname}${req.url}`);
};

export default redirectToHttps;
