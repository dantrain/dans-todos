import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

const authClient = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

const verifyUser: RequestHandler = async (req, res, next) => {
  // Verify the ID token
  if (!req.body.credential) {
    return res.status(400).send("No ID token in post body");
  }

  const ticket = await authClient.verifyIdToken({
    idToken: req.body.credential,
    audience: CLIENT_ID,
  });

  console.log("ID token verified!");

  // Get the User ID
  const payload = ticket.getPayload();
  const userid = payload?.sub;

  if (!userid) {
    return res.status(500).send("No User ID in token payload");
  }

  console.log("User ID", userid);

  const user = await prisma.user.findOne({ where: { id: userid } });

  if (!user) {
    console.log("Creating new user", userid);
    await prisma.user.create({ data: { id: userid } });
  }

  if (req.session && payload) {
    req.session.userid = userid;
    req.session.name = payload.given_name;
    req.session.avatar = payload.picture;
  }

  next();
};

const authRouter = express.Router();

authRouter.post("/tokensignin", bodyParser.json(), verifyUser, (req, res) => {
  res.status(204).send();
});

authRouter.post(
  "/onetaptokensignin",
  cookieParser(),
  bodyParser.urlencoded({ extended: false }),
  (req, res, next) => {
    // Verify the CSRF token
    if (!req.cookies.g_csrf_token) {
      return res.status(400).send("No CSRF token in cookie");
    }

    if (!req.body.g_csrf_token) {
      return res.status(400).send("No CSRF token in post body");
    }

    if (req.cookies.g_csrf_token !== req.body.g_csrf_token) {
      return res.status(400).send("Failed to verify double submit cookie");
    }

    console.log("CSRF token verified!");

    if (req.session) {
      req.session.supportsGoogleOneTap = true;
    }

    next();
  },
  verifyUser,
  (req, res) => {
    res.redirect("/");
  }
);

authRouter.post("/signout", (req, res) => {
  req.session?.destroy((err) => {
    if (!err) {
      console.log("Signed out!");
      return res.sendStatus(200);
    }

    res.sendStatus(500);
  });
});

export default authRouter;
