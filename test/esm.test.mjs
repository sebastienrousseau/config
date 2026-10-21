// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * The README imports presets by name (`import { eslint } from
 * "@sebastienrousseau/config"`). Until 0.0.7 the ESM entrypoint only had a
 * default export, so every one of those imports was a SyntaxError.
 *
 * Every required preset is a named export equal to the default export's key.
 * The optional peers (remark, semanticRelease) are not: a named export is
 * evaluated on import, which would make the whole suite fail without them.
 */

import assert from "node:assert";
import { readFileSync } from "node:fs";
import * as esm from "@sebastienrousseau/config";

const OPTIONAL = ["remark", "semanticRelease"];
const suite = esm.default;

const named = Object.keys(esm).filter((key) => key !== "default").sort();
const required = Object.keys(suite)
  .filter((key) => !OPTIONAL.includes(key))
  .sort();

assert.deepStrictEqual(named, required, "every required preset must be a named export");
for (const key of named) {
  assert.strictEqual(esm[key], suite[key], `named export ${key} must equal default.${key}`);
}

const declared = [
  ...readFileSync(new URL("../index.d.mts", import.meta.url), "utf8").matchAll(
    /^export declare const (\w+):/gm,
  ),
].map((match) => match[1]);
assert.deepStrictEqual(declared.sort(), named, "index.d.mts must declare every named export");

console.log(`✅ ${named.length} named ESM exports match the suite and index.d.mts`);
