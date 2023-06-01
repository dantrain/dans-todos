#!/usr/bin/env zx
import opn from "better-opn";
import "dotenv/config";

const PORT = process.env.PORT;

$`yarn start:db`;
$`yarn start:redis`;

await $`wait-on tcp:5432`;
await sleep(500);

await $`ts-node --esm ./scripts/migrate.ts`;
await $`ts-node --esm ./scripts/seed.ts`;

$`yarn start:dev-server`;

await $`wait-on ./src/server/__generated__/schema.graphql`;

$`relay-compiler --watch`;

await $`wait-on http://localhost:${PORT}`;

opn(`http://localhost:${PORT}`);
