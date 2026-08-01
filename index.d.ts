export interface MasterConfigSuite {
  browserslist: string[];
  c8: Record<string, unknown>;
  commitlint: Record<string, unknown>;
  eslint: Record<string, unknown>[];
  jsdoc: Record<string, unknown>;
  knip: Record<string, unknown>;
  markdownlint: Record<string, unknown>;
  mocha: Record<string, unknown>;
  prettier: Record<string, unknown>;
  remark: Record<string, unknown>;
  semanticRelease: Record<string, unknown>;
  stylelint: Record<string, unknown>;
  tsconfig: Record<string, unknown>;
  vitest: Record<string, unknown>;
}

declare const configs: MasterConfigSuite;
export default configs;
