#!/usr/bin/env zx
import "dotenv/config";

const PROD_DATABASE_PASSWORD = process.env.PROD_DATABASE_PASSWORD;

if (PROD_DATABASE_PASSWORD) {
  $`flyctl proxy 5432 -a dans-todos-db`;

  await $`wait-on tcp:5432`;

  await $`DATABASE_URL=postgresql://postgres:${PROD_DATABASE_PASSWORD}@localhost:5432/postgres ts-node --esm ./scripts/migrate.ts`;

  // Kill process listening on port 5432
  $`lsof -t -i tcp:5432 | xargs kill`;
} else {
  console.log("Set PROD_DATABASE_PASSWORD env var");
}
