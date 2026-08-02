<!-- SPDX-License-Identifier: ISC -->

<p align="center">
  <img src="./config.svg" alt="config logo" width="128" />
</p>

<h1 align="center">@sebastienrousseau/config</h1>

<p align="center">
  The master configuration suite providing 21 standardized lint, format, coverage, build, test, container, and release configurations in a single package.
</p>

<p align="center">
  <a href="https://github.com/sebastienrousseau/config/actions"><img src="https://img.shields.io/github/actions/workflow/status/sebastienrousseau/config/ci.yml?branch=main&style=for-the-badge&logo=github" alt="Build Status" /></a>
  <a href="https://www.npmjs.com/package/@sebastienrousseau/config"><img src="https://img.shields.io/npm/v/@sebastienrousseau%2Fconfig?style=for-the-badge&color=fc8d62&logo=npm" alt="npm package" /></a>
  <a href="https://scorecard.dev/viewer/?uri=github.com/sebastienrousseau/config"><img src="https://img.shields.io/ossf-scorecard/github.com/sebastienrousseau/config?style=for-the-badge&label=OpenSSF%20Scorecard&logo=openssf" alt="OpenSSF Scorecard" /></a>
  <a href="https://github.com/sebastienrousseau/config/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-ISC-blue?style=for-the-badge" alt="License" /></a>
</p>

---

## Contents

**Getting Started**
- [Installation](#installation) — Install all 21 configs with a single command
- [Quick Start](#quick-start) — Usage examples for all sub-configs

**Configuration Suite Inventory**
- [Included Packages](#included-packages) — Complete list of re-exported configs
- [Module Compatibility](#module-compatibility) — Dual CJS/ESM & TypeScript support

**Governance & Quality**
- [Development & Testing](#development--testing) — Local validation
- [Security & Compliance](#security--compliance) — SLSA attestation & vulnerability policy
- [Author & License](#author--license) — Open source license

---

## Installation

Install the entire 21-package configuration suite with a single command:

```bash
# npm
npm install --save-dev @sebastienrousseau/config

# pnpm
pnpm add -D @sebastienrousseau/config

# yarn
yarn add -D @sebastienrousseau/config

# bun
bun add -d @sebastienrousseau/config
```

---

## Quick Start

Import any configuration directly from `@sebastienrousseau/config`:

```js
// ESLint (Flat Config)
import { eslint } from "@sebastienrousseau/config";
export default [...eslint];

// Prettier
import { prettier } from "@sebastienrousseau/config";
export default prettier;

// TypeScript Base
import { tsconfig } from "@sebastienrousseau/config";

// Vitest
import { vitest } from "@sebastienrousseau/config";
export default vitest;

// Biome
import { biome } from "@sebastienrousseau/config";

// Tailwind CSS
import { tailwindcss } from "@sebastienrousseau/config";
```

---

## Included Packages (21 Configurations)

| Package | Export Subpath | Primary Tool | Description |
| :--- | :--- | :--- | :--- |
| [`@sebastienrousseau/eslint-config`](../eslint-config) | `@sebastienrousseau/config/eslint` | ESLint v9 | ESLint 9+ Flat Config & legacy rule sets |
| [`@sebastienrousseau/prettier-config`](../prettier-config) | `@sebastienrousseau/config/prettier` | Prettier v3 | Code formatting rules |
| [`@sebastienrousseau/tsconfig-config`](../tsconfig-config) | `@sebastienrousseau/config/tsconfig` | TypeScript | Strict compiler options (Base, Node, Web) |
| [`@sebastienrousseau/vitest-config`](../vitest-config) | `@sebastienrousseau/config/vitest` | Vitest | ESM test runner & V8 coverage rules |
| [`@sebastienrousseau/stylelint-config`](../stylelint-config) | `@sebastienrousseau/config/stylelint` | Stylelint | CSS and SCSS linting rules |
| [`@sebastienrousseau/commitlint-config`](../commitlint-config) | `@sebastienrousseau/config/commitlint` | commitlint | Conventional Commits formatting rules |
| [`@sebastienrousseau/markdownlint-config`](../markdownlint-config) | `@sebastienrousseau/config/markdownlint` | markdownlint | Markdown structure and style checks |
| [`@sebastienrousseau/remark-config`](../remark-config) | `@sebastienrousseau/config/remark` | Remark | Markdown AST & GFM linting presets |
| [`@sebastienrousseau/c8-config`](../c8-config) | `@sebastienrousseau/config/c8` | c8 V8 | 100% code coverage threshold rules |
| [`@sebastienrousseau/jsdoc-config`](../jsdoc-config) | `@sebastienrousseau/config/jsdoc` | JSDoc | API documentation generator settings |
| [`@sebastienrousseau/mocha-config`](../mocha-config) | `@sebastienrousseau/config/mocha` | Mocha | BDD unit test runner rules |
| [`@sebastienrousseau/browserslist-config`](../browserslist-config) | `@sebastienrousseau/config/browserslist` | Browserslist | Modern browser target selection |
| [`@sebastienrousseau/knip-config`](../knip-config) | `@sebastienrousseau/config/knip` | Knip | Dead code and unused dependency audit |
| [`@sebastienrousseau/semantic-release-config`](../semantic-release-config) | `@sebastienrousseau/config/semantic-release` | semantic-release | Automated release & changelog rules |
| [`@sebastienrousseau/biome-config`](../biome-config) | `@sebastienrousseau/config/biome` | Biome | Ultra-fast Rust-based linting and formatting |
| [`@sebastienrousseau/tailwindcss-config`](../tailwindcss-config) | `@sebastienrousseau/config/tailwindcss` | Tailwind CSS | Theme tokens, typography, and palettes |
| [`@sebastienrousseau/playwright-config`](../playwright-config) | `@sebastienrousseau/config/playwright` | Playwright | Cross-browser E2E testing settings |
| [`@sebastienrousseau/oxlint-config`](../oxlint-config) | `@sebastienrousseau/config/oxlint` | Oxlint | Ultra-fast Rust JS/TS linter rules |
| [`@sebastienrousseau/lefthook-config`](../lefthook-config) | `@sebastienrousseau/config/lefthook` | Lefthook | Parallel git hook execution rules |
| [`@sebastienrousseau/size-limit-config`](../size-limit-config) | `@sebastienrousseau/config/size-limit` | Size Limit | Performance bundle budget limits |
| [`@sebastienrousseau/docker-config`](../docker-config) | `@sebastienrousseau/config/docker` | Docker | Multi-stage hardened container builds |

---

## Module Compatibility

Exports dual module entrypoints via `package.json` `exports`:

```json
"exports": {
  ".": {
    "types": "./index.d.ts",
    "import": "./index.mjs",
    "require": "./index.cjs"
  }
}
```

---

## Development & Testing

```bash
# Clone repository
git clone https://github.com/sebastienrousseau/config.git
cd config

# Run validation tests
npm test
```

---

## Security & Compliance

- **SLSA Level 3 Provenance**: Builds are cryptographically signed with keyless provenance via GitHub Actions.
- **Automated Security Audit**: Monitored continuously with CodeQL and Dependabot.
- **Commit Signatures**: All commits are SSH/GPG signed.
- See [SECURITY.md](SECURITY.md) for vulnerability reporting procedures.

---

## Author & License

Developed and maintained by **[Sebastien Rousseau](https://github.com/sebastienrousseau)**.

Released under the [ISC License](LICENSE).
