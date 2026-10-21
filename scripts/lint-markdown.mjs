// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * Lint every tracked Markdown file with the family markdownlint preset.
 * `--fix` applies the fixes markdownlint knows how to make, then re-lints.
 *
 * The suite ships @sebastienrousseau/markdownlint-config, so its own
 * documentation is held to it.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { applyFixes } from "markdownlint";
import { lint } from "markdownlint/sync";

const require = createRequire(import.meta.url);

// Two rules are relaxed where a mandated format collides with the preset:
// - MD024: a changelog repeats "### Changed" / "### Fixed" under every
//   version, so duplicates are allowed between, not within, sections.
// - MD036: the README template's Contents groups links under bold labels
//   ("**Getting started**"), which this rule reads as fake headings.
const config = {
  ...require("@sebastienrousseau/markdownlint-config"),
  // eslint-disable-next-line camelcase -- markdownlint's own option name
  MD024: { siblings_only: true },
  MD036: false,
};

const files = execFileSync("git", ["ls-files", "*.md"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

if (process.argv.includes("--fix")) {
  for (const [file, errors] of Object.entries(lint({ files, config }))) {
    if (errors.length > 0) {
      writeFileSync(file, applyFixes(readFileSync(file, "utf8"), errors));
    }
  }
}

const results = lint({ files, config });
let count = 0;
for (const [file, errors] of Object.entries(results)) {
  for (const error of errors) {
    count += 1;
    const detail = error.errorDetail ? ` (${error.errorDetail})` : "";
    console.error(
      `${file}:${error.lineNumber} ${error.ruleNames.join("/")} ${error.ruleDescription}${detail}`,
    );
  }
}

if (count > 0) {
  console.error(`\n${count} markdownlint finding(s) in ${files.length} files`);
  process.exit(1);
}
console.log(`markdownlint: ${files.length} files clean`);
