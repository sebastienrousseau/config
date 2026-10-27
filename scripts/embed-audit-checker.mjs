// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * Embed scripts/check-audit-exceptions.mjs in reusable-security.yml.
 *
 * Consumers call the reusable workflow by a pinned SHA and check out only
 * their own repository, so the checker travels inside the workflow file: the
 * one pinned ref then covers both. This script is the only writer of that
 * copy; `--check` fails when the embedded copy and the source differ, and the
 * test suite runs it.
 *
 * Usage: node scripts/embed-audit-checker.mjs [--check]
 */

import { readFileSync, writeFileSync } from "node:fs";

const source = new URL("./check-audit-exceptions.mjs", import.meta.url);
const workflow = new URL(
  "../.github/workflows/reusable-security.yml",
  import.meta.url,
);
const START = `cat > "\${checker}" <<'CHECKER'`;
const INDENT = " ".repeat(10);
const END = `${INDENT}CHECKER`;

const lines = readFileSync(workflow, "utf8").split("\n");
const start = lines.findIndex((line) => line.trim() === START);
const end = lines.findIndex((line, i) => i > start && line === END);
if (start < 0 || end < 0) {
  console.error("reusable-security.yml has no CHECKER heredoc to fill");
  process.exit(1);
}
const body = readFileSync(source, "utf8")
  .replace(/\n$/, "")
  .split("\n")
  .map((line) => (line ? INDENT + line : ""));
const updated = [
  ...lines.slice(0, start + 1),
  ...body,
  ...lines.slice(end),
].join("\n");

if (process.argv.includes("--check")) {
  if (updated !== lines.join("\n")) {
    console.error(
      "reusable-security.yml embeds a stale audit checker; run node scripts/embed-audit-checker.mjs",
    );
    process.exit(1);
  }
  console.log(
    "embedded audit checker matches scripts/check-audit-exceptions.mjs",
  );
} else {
  writeFileSync(workflow, updated);
  console.log(
    "embedded scripts/check-audit-exceptions.mjs in reusable-security.yml",
  );
}
