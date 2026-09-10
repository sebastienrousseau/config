// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * Verify docs/FAMILY.md against reality.
 *
 * A hand-maintained table of who-has-what is exactly the kind of documentation
 * that rots quietly, so it is checked rather than trusted: every package the
 * table names must exist on the registry, and every dependency this package
 * declares must appear in the table.
 */

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const table = readFileSync(new URL("../docs/FAMILY.md", import.meta.url), "utf8");
const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

const listed = new Set(
  [...table.matchAll(/\[`([a-z0-9-]+-config)`\]/g)].map((m) => m[1]),
);

if (listed.size === 0) {
  console.error("docs/FAMILY.md lists no packages; the table is broken");
  process.exit(1);
}

let failures = 0;

// Every dependency of the aggregate must be documented in the table.
for (const name of Object.keys(manifest.dependencies ?? {})) {
  const short = name.replace("@sebastienrousseau/", "");
  if (!listed.has(short)) {
    console.error(`missing from docs/FAMILY.md: ${name}`);
    failures += 1;
  }
}

// Every package the table names must actually be published.
for (const short of [...listed].sort()) {
  const name = `@sebastienrousseau/${short}`;
  try {
    execFileSync("npm", ["view", name, "version"], { stdio: ["ignore", "pipe", "pipe"] });
  } catch {
    console.error(`listed in docs/FAMILY.md but not on the registry: ${name}`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\n${failures} problem(s) in docs/FAMILY.md`);
  process.exit(1);
}

console.log(`docs/FAMILY.md matches the registry: ${listed.size} packages`);
