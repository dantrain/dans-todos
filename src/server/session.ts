import RedisStore from "connect-redis";
import expressSession from "express-session";
import { createClient } from "redis";
import logger from "./logger.js";

declare module "express-session" {
  interface Session {
    userid?: string;
    name?: string;
    avatar?: string;
  }
}

const client = createClient({
  url: process.env.REDIS_URL,
  socket: { family: 6 },
});

client
  .on("error", (err) => logger.error("Redis error:", err))
  .connect()
  .catch((err) => logger.error("Redis connection error:", err));

setInterval(() => {
  client.ping();
}, 60_000);

const store = new RedisStore({ client });

const session = expressSession({
  store,
  name: "danstodos.sid",
  secret: process.env.SESSION_SECRETS!.split(" "),
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    maxAge: +process.env.VITE_SESSION_MAX_AGE!,
  },
});

export default session;
