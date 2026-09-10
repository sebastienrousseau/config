// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

export interface MasterConfigSuite {
  browserslist: unknown;
  c8: unknown;
  commitlint: unknown;
  eslint: unknown;
  jsdoc: unknown;
  knip: unknown;
  markdownlint: unknown;
  mocha: unknown;
  prettier: unknown;
  remark: unknown;
  semanticRelease: unknown;
  stylelint: unknown;
  tsconfig: unknown;
  vitest: unknown;
  biome: unknown;
  tailwindcss: unknown;
  playwright: unknown;
  oxlint: unknown;
  lefthook: unknown;
  sizeLimit: unknown;
  docker: unknown;
}

declare const configs: MasterConfigSuite;
export default configs;
