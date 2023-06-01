import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dbSchema from "./dbSchema.js";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema: dbSchema });

export default db;
