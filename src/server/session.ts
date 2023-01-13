import connectRedis from "connect-redis";
import expressSession from "express-session";
import redis from "redis";
import logger from "./logger.js";

declare module "express-session" {
  interface Session {
    userid?: string;
    name?: string;
    avatar?: string;
  }
}

const RedisStore = connectRedis(expressSession);

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  family: "IPv6",
});

redisClient.on("error", (err) => logger.error("Redis error:", err));

setInterval(() => {
  redisClient.ping((err) => {
    if (err) logger.error("Redis keepalive error:", err);
  });
}, 60_000);

const session = expressSession({
  store: new RedisStore({ client: redisClient }),
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
