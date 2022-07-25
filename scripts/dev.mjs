#!/usr/bin/env zx

$`yarn start:db`;

await $`wait-on tcp:5432`;

$`yarn start:dev-server`;
