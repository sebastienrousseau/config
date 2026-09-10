// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

"use strict";

/**
 * The aggregate configuration suite.
 *
 * Each entry is the corresponding package's default export, required by name.
 *
 * Earlier releases wrapped every require in a `tryRequire` that fell back to a
 * sibling directory (`../eslint-config`). That fallback only ever worked in one
 * particular checkout layout, and it turned a missing dependency into a
 * confusing path error somewhere else. A dependency that is not installed
 * should fail here, immediately, naming itself.
 *
 * @type {import('./index.d.ts').MasterConfigSuite}
 */
module.exports = {
  biome: require("@sebastienrousseau/biome-config"),
  browserslist: require("@sebastienrousseau/browserslist-config"),
  c8: require("@sebastienrousseau/c8-config"),
  commitlint: require("@sebastienrousseau/commitlint-config"),
  docker: require("@sebastienrousseau/docker-config"),
  eslint: require("@sebastienrousseau/eslint-config"),
  jsdoc: require("@sebastienrousseau/jsdoc-config"),
  knip: require("@sebastienrousseau/knip-config"),
  lefthook: require("@sebastienrousseau/lefthook-config"),
  markdownlint: require("@sebastienrousseau/markdownlint-config"),
  mocha: require("@sebastienrousseau/mocha-config"),
  oxlint: require("@sebastienrousseau/oxlint-config"),
  playwright: require("@sebastienrousseau/playwright-config"),
  prettier: require("@sebastienrousseau/prettier-config"),
  remark: require("@sebastienrousseau/remark-config"),
  semanticRelease: require("@sebastienrousseau/semantic-release-config"),
  sizeLimit: require("@sebastienrousseau/size-limit-config"),
  stylelint: require("@sebastienrousseau/stylelint-config"),
  tailwindcss: require("@sebastienrousseau/tailwindcss-config"),
  tsconfig: require("@sebastienrousseau/tsconfig-config"),
  vitest: require("@sebastienrousseau/vitest-config"),
};
