import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

const authClient = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

const authRouter = express.Router();

authRouter.post("/tokensignin", bodyParser.json(), async (req, res) => {
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
    req.session.supportsGoogleOneTap = !!req.query.onetap;
  }

  res.status(204).send();
});

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
