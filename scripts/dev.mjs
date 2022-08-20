#!/usr/bin/env zx

$`yarn start:db`;
$`yarn start:redis`;

await $`wait-on tcp:5432`;

await sleep(500);

await $`yarn prisma migrate reset --force`;

$`yarn start:dev-server`;

$`relay-compiler --watch`;
