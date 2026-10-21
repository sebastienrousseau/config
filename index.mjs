// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * ESM entrypoint.
 *
 * The suite is assembled once, in `index.cjs`, and re-exported here so the two
 * module systems cannot drift apart. Until 0.0.7 this file listed its imports
 * by hand and had fallen seven packages behind `index.cjs`, so `import` and
 * `require` returned different objects.
 */

import suite from "./index.cjs";

// Named exports for `import { eslint } from "@sebastienrousseau/config"`.
// The optional peers (remark, semanticRelease) are left out: a named export
// is read on import, so listing them here would make the whole suite fail
// when they are not installed. Use `suite.remark` or the subpath instead.
// test/esm.test.mjs fails if this list drifts from index.cjs.
export const {
  biome,
  browserslist,
  c8,
  commitlint,
  docker,
  eslint,
  jsdoc,
  knip,
  lefthook,
  markdownlint,
  mocha,
  oxlint,
  playwright,
  prettier,
  sizeLimit,
  stylelint,
  tailwindcss,
  tsconfig,
  vitest,
} = suite;

export default suite;
