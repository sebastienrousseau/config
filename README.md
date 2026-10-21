<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

<p align="center">
  <img src="./config.svg" alt="@sebastienrousseau/config logo" width="128" />
</p>

<h1 align="center">@sebastienrousseau/config</h1>

<p align="center">
  One install for the @sebastienrousseau lint, format, test, coverage, build, container and release presets, with every preset reachable by name or by subpath.
</p>

<p align="center">
  <a href="https://github.com/sebastienrousseau/config/actions"><img src="https://img.shields.io/github/actions/workflow/status/sebastienrousseau/config/ci.yml?style=for-the-badge&logo=github" alt="Build" height="28" /></a>
  <a href="https://www.npmjs.com/package/@sebastienrousseau/config"><img src="https://img.shields.io/npm/v/@sebastienrousseau%2Fconfig?style=for-the-badge&color=fc8d62&logo=npm" alt="Registry" height="28" /></a>
  <a href="docs/FAMILY.md"><img src="https://img.shields.io/badge/docs-family-blue?style=for-the-badge&labelColor=555555&logo=markdown" alt="Docs" height="28" /></a>
  <a href="https://scorecard.dev/viewer/?uri=github.com/sebastienrousseau/config"><img src="https://img.shields.io/ossf-scorecard/github.com/sebastienrousseau/config?style=for-the-badge&label=OpenSSF%20Scorecard&logo=openssf" alt="OpenSSF Scorecard" height="28" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0%20OR%20MIT-blue.svg?style=for-the-badge" alt="License: Apache-2.0 OR MIT" height="28" /></a>
  <a href="https://github.com/sebastienrousseau/config/blob/main/docs/POLICIES.md"><img src="https://img.shields.io/badge/node-%3E%3D20-93450a.svg?style=for-the-badge&logo=node.js" alt="Node 20 or newer" height="28" /></a>
</p>

<p align="center">
  <img src=".github/demo.gif" alt="Terminal demo: named ESM imports and a subpath import of the presets, the error an uninstalled optional peer raises, and the test suite passing" width="100%" />
</p>

---

## Contents

**Getting started**

- [Install](#install) — npm, pnpm, yarn or bun, plus the two optional peers
- [Requirements](#requirements) — Node 20 or newer
- [Quick Start](#quick-start) — import a preset and use it

**The @sebastienrousseau/config ecosystem**

- [The @sebastienrousseau/config ecosystem](#the-sebastienrousseauconfig-ecosystem) — the 21 presets it aggregates

**Library reference**

- [Capabilities at a glance](#capabilities-at-a-glance) — the current surface by theme
- [Ecosystem comparison](#ecosystem-comparison) — not published
- [Benchmarks](#benchmarks) — not applicable
- [Features](#features) — what the package does
- [Configuration](#configuration) — optional peers and per-tool wiring
- [Examples](#examples) — where the runnable examples live

**Operational**

- [When not to use @sebastienrousseau/config](#when-not-to-use-sebastienrousseauconfig) — limitations
- [Development](#development) — tests, lint, demo, CI
- [Security](#security) — what is checked and how releases are made
- [Documentation](#documentation) — all reference docs
- [Stability guarantees](#stability-guarantees) — versioning and the public surface
- [License](#license)

---

## Install

### As a Node.js library

```bash
npm install --save-dev @sebastienrousseau/config
```

The same package installs with `pnpm add -D`, `yarn add -D` or `bun add -d`.

The remark and semantic-release presets are optional peers. They bring whole
toolchains (remark-cli, semantic-release and the npm CLI it bundles), so the
suite does not install them. Add the ones you use:

```bash
npm install --save-dev @sebastienrousseau/remark-config @sebastienrousseau/semantic-release-config
```

---

## Requirements

Node.js 20 or newer. CI tests Node 20, 22 and 24 on Linux, macOS and Windows;
see [`docs/POLICIES.md`](docs/POLICIES.md). Each preset also needs the tool it
configures. Most presets declare that tool as a peer dependency (ESLint,
Prettier, Vitest and so on); for Biome, Docker, Lefthook, Oxlint, Playwright,
Size Limit and Tailwind CSS, install the tool yourself.

---

## Quick Start

```js
// eslint.config.mjs
import { eslint } from "@sebastienrousseau/config";

export default [...eslint];
```

```js
// prettier.config.mjs
export { prettier as default } from "@sebastienrousseau/config";
```

```js
// CommonJS, or one preset per subpath
const { vitest } = require("@sebastienrousseau/config");
const tsconfig = require("@sebastienrousseau/config/tsconfig");
```

Every required preset is a named export of the package and has its own
subpath. Each value is the preset package's own default export, unchanged.

---

## The @sebastienrousseau/config ecosystem

This package aggregates the 21 JavaScript and web presets of the configuration
family. [`docs/FAMILY.md`](docs/FAMILY.md) lists all 38 family packages, what
each exports and what validates it, and CI checks that table against the
registry.

| Component | Purpose | Use case |
| :--- | :--- | :--- |
| [`biome-config`](https://github.com/sebastienrousseau/biome-config) | Biome formatter and linter settings | `config/biome` |
| [`browserslist-config`](https://github.com/sebastienrousseau/browserslist-config) | Target browser query list | `config/browserslist` |
| [`c8-config`](https://github.com/sebastienrousseau/c8-config) | Coverage thresholds and reporters | `config/c8` |
| [`commitlint-config`](https://github.com/sebastienrousseau/commitlint-config) | Conventional commit rules | `config/commitlint` |
| [`docker-config`](https://github.com/sebastienrousseau/docker-config) | Hardened container image | `config/docker` |
| [`eslint-config`](https://github.com/sebastienrousseau/eslint-config) | ESLint flat configuration | `config/eslint` |
| [`jsdoc-config`](https://github.com/sebastienrousseau/jsdoc-config) | API documentation generation | `config/jsdoc` |
| [`knip-config`](https://github.com/sebastienrousseau/knip-config) | Unused code and dependency detection | `config/knip` |
| [`lefthook-config`](https://github.com/sebastienrousseau/lefthook-config) | Git hook definitions | `config/lefthook` |
| [`markdownlint-config`](https://github.com/sebastienrousseau/markdownlint-config) | Markdown style rules | `config/markdownlint` |
| [`mocha-config`](https://github.com/sebastienrousseau/mocha-config) | Mocha test runner settings | `config/mocha` |
| [`oxlint-config`](https://github.com/sebastienrousseau/oxlint-config) | Oxlint rules | `config/oxlint` |
| [`playwright-config`](https://github.com/sebastienrousseau/playwright-config) | Playwright end-to-end settings | `config/playwright` |
| [`prettier-config`](https://github.com/sebastienrousseau/prettier-config) | Prettier formatting rules | `config/prettier` |
| [`remark-config`](https://github.com/sebastienrousseau/remark-config) | Remark Markdown pipeline (optional peer) | `config/remark` |
| [`semantic-release-config`](https://github.com/sebastienrousseau/semantic-release-config) | Release pipeline and plugins (optional peer) | `config/semantic-release` |
| [`size-limit-config`](https://github.com/sebastienrousseau/size-limit-config) | Bundle size budgets | `config/size-limit` |
| [`stylelint-config`](https://github.com/sebastienrousseau/stylelint-config) | CSS and SCSS lint rules | `config/stylelint` |
| [`tailwindcss-config`](https://github.com/sebastienrousseau/tailwindcss-config) | Tailwind CSS theme | `config/tailwindcss` |
| [`tsconfig-config`](https://github.com/sebastienrousseau/tsconfig-config) | TypeScript compiler options | `config/tsconfig` |
| [`vitest-config`](https://github.com/sebastienrousseau/vitest-config) | Vitest runner and coverage settings | `config/vitest` |

The Use case column is the subpath under `@sebastienrousseau/`, for example
`@sebastienrousseau/config/eslint`.

---

## Capabilities at a glance

| Area | Capability | Status |
| :--- | :--- | :--- |
| CommonJS | `require("@sebastienrousseau/config")` returns the suite object | Since 0.0.2 |
| ESM | Default export plus a named export per required preset | Since 0.0.7 |
| Subpaths | `@sebastienrousseau/config/<preset>` for all 21 presets | Since 0.0.7 |
| TypeScript | `index.d.ts` (CommonJS), `index.d.mts` (ESM), one declaration per subpath | Since 0.0.7 |
| Optional peers | remark and semantic-release load on first access and name their install command | Since 0.0.7 |

---

## Ecosystem comparison

Not published. No comparison with other configuration bundles has been
measured, and this README makes no claims it cannot back with evidence.

---

## Benchmarks

Not applicable. The package re-exports configuration objects and runs no code
at lint, build or test time beyond loading them.

---

## Features

-  One dependency pulls in 19 presets at matching versions; two more are
    optional peers.
-  Each preset is reachable three ways: the suite object, a named ESM export,
    or its own subpath.
-  An optional peer that is not installed fails on access with the exact
    `npm install` command, instead of a bare module-not-found error.
-  The tarball holds only the entrypoints, the one-line preset re-exports,
    their type declarations, the licence texts, the README and the logo.

---

## Configuration

There is nothing to configure in this package. Each preset is passed to its
tool as that tool expects; see the preset's own README, linked from the
ecosystem table. To use the optional presets, install them next to the suite
(see [Install](#install)); `suite.remark` and `suite.semanticRelease` then
return them, and so do the `remark` and `semantic-release` subpaths.

---

## Examples

The [Quick Start](#quick-start) snippets are the examples for this package.
Each preset repository carries runnable examples for its own tool.

---

## When not to use @sebastienrousseau/config

-  You use only one or two presets: install those preset packages directly and
    skip the other tools' peer dependencies.
-  You need the presets for a non-JavaScript language (C, Go, Python and the
    rest of the family): they are separate packages, listed in
    [`docs/FAMILY.md`](docs/FAMILY.md), and this suite does not include them.
-  Your project cannot accept the advisories listed under Known issues in
    [`CHANGELOG.md`](CHANGELOG.md), which arrive through the presets' tools.

---

## Development

```bash
git clone https://github.com/sebastienrousseau/config.git
cd config
npm ci
npm test             # entrypoints, subpaths, optional peers, typings
npm run lint         # ESLint, Prettier, tsc and markdownlint, family presets
npm run check:family # docs/FAMILY.md against the registry
npm run demo         # re-render .github/demo.gif with VHS
```

CI runs the tests on Node 20, 22 and 24 across Linux, macOS and Windows, plus
the lint job, the family check and CodeQL, on every pull request into `main`.

---

## Security

-  Dependabot, CodeQL, OpenSSF Scorecard and secret scanning with push
    protection are enabled on the repository.
-  Every commit on `main` is signed, and releases are signed annotated tags.
-  From 0.0.8, npm releases are staged by `publish.yml` through trusted
    publishing (OIDC) with provenance, and made public by a maintainer with
    their second factor. 0.0.7 and earlier were published without provenance.

Report vulnerabilities according to [`SECURITY.md`](SECURITY.md).

---

## Documentation

-  [`CHANGELOG.md`](CHANGELOG.md): changes per release, and known issues.
-  [`docs/FAMILY.md`](docs/FAMILY.md): every package in the family.
-  [`docs/POLICIES.md`](docs/POLICIES.md): toolchain, versioning, dependency
    and release policies.
-  [`CONTRIBUTING.md`](CONTRIBUTING.md), [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md),
    [`SECURITY.md`](SECURITY.md).

---

## Stability guarantees

The version is below 0.1.0, so any release may change the public surface; each
change is listed in [`CHANGELOG.md`](CHANGELOG.md) under the release that makes
it. The public surface is the suite object, the named ESM exports, the
subpaths and their type declarations. The family releases in lockstep, so the
suite's version matches its presets'. The Node floor is in
[`docs/POLICIES.md`](docs/POLICIES.md).

---

## License

Dual-licensed under [Apache-2.0](LICENSE-APACHE) or [MIT](LICENSE-MIT), at
your option. See [`LICENSE`](LICENSE).

Developed by [Sebastien Rousseau](https://sebastienrousseau.com/).
