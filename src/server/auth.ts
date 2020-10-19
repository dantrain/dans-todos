import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID =
  "368363262826-i6ngmdb856kpnjnj3huu2bpnaoiisf3h.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const authRouter = express.Router();

authRouter.post("/tokensignin", bodyParser.json(), async (req, res) => {
  // Verify the ID token
  if (!req.body.credential) {
    return res.status(400).send("No ID token in post body");
  }

  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: CLIENT_ID,
  });

  console.log("ID token verified!");

  // Get the User ID
  const payload = ticket.getPayload();
  const userId = payload?.sub;

  if (!userId) {
    return res.status(500).send("No User ID in token payload");
  }

  console.log("User ID", userId);

  res.sendStatus(200);
});

authRouter.post(
  "/onetaptokensignin",
  cookieParser(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
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

    // Verify the ID token
    if (!req.body.credential) {
      return res.status(400).send("No ID token in post body");
    }

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: CLIENT_ID,
    });

    console.log("ID token verified!");

    // Get the User ID
    const payload = ticket.getPayload();
    const userId = payload?.sub;

    if (!userId) {
      return res.status(500).send("No User ID in token payload");
    }

    console.log("User ID", userId);

    res.redirect("/");
  }
);

export default authRouter;
