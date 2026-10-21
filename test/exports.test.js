// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

"use strict";

/**
 * Every subpath the README documents (`@sebastienrousseau/config/eslint`)
 * must resolve through `exports` and return the same object as the matching
 * key of the aggregate suite.
 *
 * Until 0.0.7 the subpaths mapped to bare package names, which Node rejects
 * with ERR_INVALID_PACKAGE_TARGET, so none of them could be imported.
 */

const assert = require("assert");
const manifest = require("../package.json");

const camel = (subpath) => subpath.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const subpaths = Object.keys(manifest.exports)
  .filter((key) => key !== ".")
  .map((key) => key.slice(2));

const suite = require("@sebastienrousseau/config");

assert.deepStrictEqual(
  subpaths.map(camel).sort(),
  Object.keys(suite).sort(),
  "every suite key needs exactly one subpath export",
);

for (const subpath of subpaths) {
  const viaSubpath = require(`@sebastienrousseau/config/${subpath}`);
  assert.strictEqual(
    viaSubpath,
    suite[camel(subpath)],
    `@sebastienrousseau/config/${subpath} must equal suite.${camel(subpath)}`,
  );
}

console.log(`✅ ${subpaths.length} subpath exports resolve and match the suite`);
