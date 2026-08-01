function tryRequire(pkg, rel) {
  try {
    return require(pkg);
  } catch {
    return require(rel);
  }
}

module.exports = {
  browserslist: tryRequire("@sebastienrousseau/browserslist-config", "../browserslist-config"),
  c8: tryRequire("@sebastienrousseau/c8-config", "../c8-config"),
  commitlint: tryRequire("@sebastienrousseau/commitlint-config", "../commitlint-config"),
  eslint: tryRequire("@sebastienrousseau/eslint-config", "../eslint-config"),
  jsdoc: tryRequire("@sebastienrousseau/jsdoc-config", "../jsdoc-config"),
  knip: tryRequire("@sebastienrousseau/knip-config", "../knip-config"),
  markdownlint: tryRequire("@sebastienrousseau/markdownlint-config", "../markdownlint-config"),
  mocha: tryRequire("@sebastienrousseau/mocha-config", "../mocha-config"),
  prettier: tryRequire("@sebastienrousseau/prettier-config", "../prettier-config"),
  remark: tryRequire("@sebastienrousseau/remark-config", "../remark-config"),
  semanticRelease: tryRequire("@sebastienrousseau/semantic-release-config", "../semantic-release-config"),
  stylelint: tryRequire("@sebastienrousseau/stylelint-config", "../stylelint-config"),
  tsconfig: tryRequire("@sebastienrousseau/tsconfig-config", "../tsconfig-config"),
  vitest: tryRequire("@sebastienrousseau/vitest-config", "../vitest-config")
};
