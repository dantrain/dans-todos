import { RequestHandler } from "express";

const redirectToHttps: RequestHandler = (req, res, next) => {
  // if (req.protocol === "http") {
  //   return res.redirect(`https://${req.hostname}${req.url}`);
  // }

  console.log(
    req.protocol,
    req.headers["x-forwarded-for"],
    req.headers["x-forwarded-host"],
    req.headers["x-forwarded-proto"]
  );

  next();
};

export default redirectToHttps;
