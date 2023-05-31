import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todos, users } from "../src/server/dbSchema.js";

const DATABASE_URL = process.env.DATABASE_URL;
const DEV_USER_ID = process.env.DEV_USER_ID || "parklife";

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable");
  process.exit(1);
}

console.log("Seeding database...");

const client = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(client);

await db.transaction(async (tx) => {
  await tx.insert(users).values({
    id: DEV_USER_ID,
  });

  await tx.insert(todos).values(
    [
      {
        text: "Put trousers on",
        completed: true,
      },
      {
        text: "Have a cup of tea",
        completed: false,
      },
      {
        text: "Think about leaving the house",
        completed: false,
      },
    ].map((_) => ({ ..._, userId: DEV_USER_ID }))
  );
});

console.log("Done!");
process.exit(0);
