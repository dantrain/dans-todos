import { RequestHandler } from "express";

const redirectToHttps: RequestHandler = (req, res, next) => {
  if (req.protocol === "http") {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }

  next();
};

export default redirectToHttps;
