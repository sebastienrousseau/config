// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * The audit-exceptions gate fails closed: an advisory passes only while a
 * documented, current exception names it, and an exception that no longer
 * matches anything, or whose review or expiry date has come, fails the build.
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(
  new URL("../scripts/check-audit-exceptions.mjs", import.meta.url),
);
const dir = mkdtempSync(join(tmpdir(), "audit-exceptions-"));
let n = 0;

function file(value) {
  const path = join(dir, `f${n++}.json`);
  writeFileSync(path, JSON.stringify(value));
  return path;
}

/** An `npm audit --json` report holding the given advisories. */
function audit(...advisories) {
  const vulnerabilities = {};
  for (const [pkg, id, severity] of advisories) {
    vulnerabilities[pkg] ??= { name: pkg, severity, via: [] };
    vulnerabilities[pkg].via.push({
      name: pkg,
      title: `${pkg} advisory`,
      url: `https://github.com/advisories/${id}`,
      severity,
    });
  }
  return { auditReportVersion: 2, vulnerabilities };
}

// The registry field names are snake_case, as in pain001's registry.
const REVIEW = "review_due";

const exception = (advisory, pkg, dates = {}) => ({
  advisory,
  package: pkg,
  reason: "bundled inside a tool; no fixed release",
  owner: "sebastienrousseau",
  accepted: "2026-10-27",
  [REVIEW]: "2026-11-26",
  expires: "2026-12-26",
  ...dates,
});

function run({
  exceptions,
  prod = audit(),
  full = audit(),
  today = "2026-10-27",
}) {
  const args = [
    script,
    "--prod",
    file(prod),
    "--full",
    file(full),
    "--today",
    today,
  ];
  if (exceptions !== undefined) {
    args.push("--exceptions", file({ exceptions }));
  }
  const result = spawnSync(process.execPath, args, { encoding: "utf8" });
  return { code: result.status, out: result.stdout + result.stderr };
}

const HIGH = ["undici", "GHSA-xjj6-f33q-929c", "high"];
const LOW = ["undici", "GHSA-r53p-7pc4-xj5r", "low"];
const MOD = ["ip-address", "GHSA-rpw4-54j3-4h4q", "moderate"];

const cases = [
  ["a clean tree passes", { exceptions: [] }, 0],
  [
    "an unexcepted high advisory in the full tree fails",
    { exceptions: [], full: audit(HIGH) },
    1,
  ],
  [
    "a moderate advisory only in the full tree passes",
    { exceptions: [], full: audit(MOD) },
    0,
  ],
  [
    "an unexcepted low advisory in production fails",
    { exceptions: [], prod: audit(LOW), full: audit(LOW) },
    1,
  ],
  [
    "excepted advisories pass in both trees",
    {
      exceptions: [exception(HIGH[1], HIGH[0]), exception(LOW[1], LOW[0])],
      prod: audit(HIGH, LOW),
      full: audit(HIGH, LOW),
    },
    0,
  ],
  [
    "an exception for another package does not cover the advisory",
    { exceptions: [exception(HIGH[1], "brace-expansion")], full: audit(HIGH) },
    1,
  ],
  [
    "an exception matching nothing in the full tree is stale and fails",
    { exceptions: [exception(HIGH[1], HIGH[0])], full: audit() },
    1,
    /stale exception/,
  ],
  [
    "an exception past its review date fails",
    {
      exceptions: [exception(HIGH[1], HIGH[0])],
      full: audit(HIGH),
      today: "2026-11-26",
    },
    1,
    /review overdue/,
  ],
  [
    "an expired exception fails",
    {
      exceptions: [
        exception(HIGH[1], HIGH[0], {
          [REVIEW]: "2026-12-26",
          expires: "2026-12-26",
        }),
      ],
      full: audit(HIGH),
      today: "2026-12-26",
    },
    1,
    /acceptance expired/,
  ],
  [
    "an exception accepted in the future fails",
    {
      exceptions: [exception(HIGH[1], HIGH[0], { accepted: "2026-10-28" })],
      full: audit(HIGH),
    },
    1,
  ],
  [
    "an exception without a reason fails",
    {
      exceptions: [exception(HIGH[1], HIGH[0], { reason: " " })],
      full: audit(HIGH),
    },
    1,
    /missing reason/,
  ],
  [
    "an exception with a malformed advisory id fails",
    { exceptions: [exception("CVE-2026-1", HIGH[0])], full: audit(HIGH) },
    1,
    /not a GHSA identifier/,
  ],
  [
    "a duplicate exception fails",
    {
      exceptions: [exception(HIGH[1], HIGH[0]), exception(HIGH[1], HIGH[0])],
      full: audit(HIGH),
    },
    1,
    /duplicate exception/,
  ],
  [
    "a missing exceptions file is treated as no exceptions",
    { exceptions: undefined, full: audit(HIGH) },
    1,
  ],
];

// The checker must gate however it is invoked: through a symlinked path (as
// /tmp is on macOS) it once matched no "run directly" guard and exited 0.
const linked = join(dir, "linked");
symlinkSync(dirname(script), linked);
const viaLink = spawnSync(
  process.execPath,
  [
    join(linked, "check-audit-exceptions.mjs"),
    "--prod",
    file(audit()),
    "--full",
    file(audit(HIGH)),
  ],
  { encoding: "utf8" },
);
cases.push([
  "the checker gates when run through a symlinked path",
  null,
  1,
  /has no exception/,
  viaLink,
]);
cases.push([
  "an unknown audit level fails",
  null,
  1,
  /unknown audit level/,
  spawnSync(
    process.execPath,
    [
      script,
      "--prod",
      file(audit()),
      "--full",
      file(audit()),
      "--full-level",
      "severe",
    ],
    { encoding: "utf8" },
  ),
]);

let failed = 0;
for (const [name, input, expected, message, spawned] of cases) {
  const { code, out } = spawned
    ? { code: spawned.status, out: spawned.stdout + spawned.stderr }
    : run(input);
  try {
    assert.equal(code, expected, out);
    if (message) {
      assert.match(out, message);
    }
    console.log(`ok - ${name}`);
  } catch (err) {
    failed++;
    console.error(`not ok - ${name}\n${err.message}`);
  }
}
if (failed) {
  console.error(
    `❌ ${failed} of ${cases.length} audit-exceptions cases failed`,
  );
  process.exit(1);
}
console.log(`✅ ${cases.length} audit-exceptions cases passed`);
