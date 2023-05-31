import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/dbSchema.ts",
  out: "./drizzle",
} satisfies Config;
