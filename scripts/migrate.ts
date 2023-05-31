import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable");
  process.exit(1);
}

console.log("Running migrations...");

const client = postgres(DATABASE_URL, { max: 1 });
await migrate(drizzle(client), { migrationsFolder: "drizzle" });

console.log("Done!");
process.exit(0);
