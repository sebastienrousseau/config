// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

// ESM typings, mirroring index.mjs: the suite as the default export plus a
// named export per required preset. The optional peers (remark,
// semanticRelease) are only on the default export.

import type { MasterConfigSuite } from "./index.js";

export type { MasterConfigSuite };

declare const configs: MasterConfigSuite;
export default configs;

export declare const biome: MasterConfigSuite["biome"];
export declare const browserslist: MasterConfigSuite["browserslist"];
export declare const c8: MasterConfigSuite["c8"];
export declare const commitlint: MasterConfigSuite["commitlint"];
export declare const docker: MasterConfigSuite["docker"];
export declare const eslint: MasterConfigSuite["eslint"];
export declare const jsdoc: MasterConfigSuite["jsdoc"];
export declare const knip: MasterConfigSuite["knip"];
export declare const lefthook: MasterConfigSuite["lefthook"];
export declare const markdownlint: MasterConfigSuite["markdownlint"];
export declare const mocha: MasterConfigSuite["mocha"];
export declare const oxlint: MasterConfigSuite["oxlint"];
export declare const playwright: MasterConfigSuite["playwright"];
export declare const prettier: MasterConfigSuite["prettier"];
export declare const sizeLimit: MasterConfigSuite["sizeLimit"];
export declare const stylelint: MasterConfigSuite["stylelint"];
export declare const tailwindcss: MasterConfigSuite["tailwindcss"];
export declare const tsconfig: MasterConfigSuite["tsconfig"];
export declare const vitest: MasterConfigSuite["vitest"];
