<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# The configuration family

Every package in the `@sebastienrousseau` configuration family, what it
configures, the shape it exports, the files it ships and what validates it.

All of them are at version **0.0.7**, licensed Apache-2.0 OR MIT, require
Node 20 or newer, and are held to one standard by
[`@sebastienrousseau/config-kit`](https://github.com/sebastienrousseau/config-kit).

`scripts/check-family.mjs` verifies this table against the registry on every
push, so it cannot drift from what is actually published.

## JavaScript and web tooling

Aggregated by [`@sebastienrousseau/config`](https://github.com/sebastienrousseau/config).

| Package | Configures | Export | Ships | Validated by |
| --- | --- | --- | --- | --- |
| [`biome-config`](https://github.com/sebastienrousseau/biome-config) | Biome formatter and linter | `object` | `biome.json` | `biome` |
| [`browserslist-config`](https://github.com/sebastienrousseau/browserslist-config) | Target browser query list | `array` | inline | `browserslist` |
| [`c8-config`](https://github.com/sebastienrousseau/c8-config) | Coverage thresholds and reporters | `object` | inline | c8 |
| [`commitlint-config`](https://github.com/sebastienrousseau/commitlint-config) | Conventional commit rules | `object` | inline | `commitlint` |
| [`docker-config`](https://github.com/sebastienrousseau/docker-config) | Hardened container image | `string` | `Dockerfile` | `dockerfile` |
| [`eslint-config`](https://github.com/sebastienrousseau/eslint-config) | ESLint flat configuration | `array` | inline | `eslint-flat` |
| [`jsdoc-config`](https://github.com/sebastienrousseau/jsdoc-config) | API documentation generation | `object` | inline | jsdoc |
| [`knip-config`](https://github.com/sebastienrousseau/knip-config) | Unused code and dependency detection | `object` | inline | knip |
| [`lefthook-config`](https://github.com/sebastienrousseau/lefthook-config) | Git hook definitions | `string` | `lefthook.yml` | lefthook |
| [`markdownlint-config`](https://github.com/sebastienrousseau/markdownlint-config) | Markdown style rules | `object` | inline | `markdownlint` |
| [`mocha-config`](https://github.com/sebastienrousseau/mocha-config) | Mocha test runner options | `object` | inline | mocha |
| [`oxlint-config`](https://github.com/sebastienrousseau/oxlint-config) | oxlint rules | `object` | `.oxlintrc.json` | `oxlint` |
| [`playwright-config`](https://github.com/sebastienrousseau/playwright-config) | Browser test runner options | `object` | `playwright.config.js` | playwright |
| [`prettier-config`](https://github.com/sebastienrousseau/prettier-config) | Formatting rules | `object` | inline | `prettier` |
| [`remark-config`](https://github.com/sebastienrousseau/remark-config) | Markdown processing pipeline | `object` | inline | `remark` |
| [`semantic-release-config`](https://github.com/sebastienrousseau/semantic-release-config) | Release pipeline and plugins | `object` | inline | `semantic-release` |
| [`size-limit-config`](https://github.com/sebastienrousseau/size-limit-config) | Bundle size budgets | `array` | `.size-limit.js` | size-limit |
| [`stylelint-config`](https://github.com/sebastienrousseau/stylelint-config) | CSS lint rules | `object` | inline | `stylelint` |
| [`tailwindcss-config`](https://github.com/sebastienrousseau/tailwindcss-config) | Design token preset | `object` | `tailwind.config.js` | tailwindcss |
| [`tsconfig-config`](https://github.com/sebastienrousseau/tsconfig-config) | TypeScript compiler options | `object` | `base.json`, `node.json`, `web.json` | `typescript-tsconfig` |
| [`vitest-config`](https://github.com/sebastienrousseau/vitest-config) | Vitest runner options | `object` | inline | vitest |

## Native toolchains

These configure toolchains that do not resolve anything through `node_modules`.
npm is the distribution channel, not the consumption mechanism: copy the presets
in, or pass their installed path to the tool. Each repository's README shows the
exact invocation, and every one is validated in CI by the real toolchain.

| Package | Configures | Export | Ships | Validated by |
| --- | --- | --- | --- | --- |
| [`c-config`](https://github.com/sebastienrousseau/c-config) | clang-format and clang-tidy | `object` | `.clang-format`, `.clang-tidy` | clang-format, clang-tidy |
| [`cpp-config`](https://github.com/sebastienrousseau/cpp-config) | clang-format, clang-tidy, cmake-format | `object` | `.clang-format`, `.clang-tidy`, `cmake-format.py` | clang-format, clang-tidy, cmake-format |
| [`csharp-config`](https://github.com/sebastienrousseau/csharp-config) | OmniSharp and MSBuild properties | `object` | `omnisharp.json`, `Directory.Build.props` | dotnet format |
| [`dart-config`](https://github.com/sebastienrousseau/dart-config) | Dart analyzer options | `object` | `analysis_options.yaml` | dart analyze |
| [`go-config`](https://github.com/sebastienrousseau/go-config) | golangci-lint and staticcheck | `object` | `.golangci.yml`, `staticcheck.conf` | golangci-lint, staticcheck |
| [`java-config`](https://github.com/sebastienrousseau/java-config) | Checkstyle, PMD, SpotBugs | `object` | `checkstyle.xml`, `spotbugs-exclude.xml`, `pmd-ruleset.xml` | checkstyle, pmd, spotbugs |
| [`kotlin-config`](https://github.com/sebastienrousseau/kotlin-config) | detekt rules | `object` | `detekt.yml` | detekt |
| [`lua-config`](https://github.com/sebastienrousseau/lua-config) | luacheck and StyLua | `object` | `.luacheckrc`, `stylua.toml` | luacheck, stylua |
| [`php-config`](https://github.com/sebastienrousseau/php-config) | PHP-CS-Fixer and PHPStan | `object` | `.php-cs-fixer.php`, `phpstan.neon` | php-cs-fixer, phpstan |
| [`python-config`](https://github.com/sebastienrousseau/python-config) | Ruff, flake8, pyproject | `object` | `pyproject.toml`, `ruff.toml`, `.flake8` | ruff, flake8 |
| [`r-config`](https://github.com/sebastienrousseau/r-config) | lintr rules | `object` | `.lintr` | lintr |
| [`ruby-config`](https://github.com/sebastienrousseau/ruby-config) | RuboCop and Standard | `object` | `.rubocop.yml`, `standard.yml` | rubocop, standard |
| [`rust-config`](https://github.com/sebastienrousseau/rust-config) | rustfmt and Clippy | `object` | `rustfmt.toml`, `clippy.toml` | rustfmt, clippy |
| [`shell-config`](https://github.com/sebastienrousseau/shell-config) | ShellCheck and shfmt | `object` | `.shellcheckrc`, `.shfmt` | shellcheck, shfmt |
| [`sql-config`](https://github.com/sebastienrousseau/sql-config) | SQLFluff and sql-formatter | `object` | `.sqlfluff`, `.sql-formatter.json` | sqlfluff, sql-formatter |
| [`swift-config`](https://github.com/sebastienrousseau/swift-config) | SwiftLint and SwiftFormat | `object` | `.swiftlint.yml`, `.swiftformat` | swiftlint, swiftformat |
| [`zig-config`](https://github.com/sebastienrousseau/zig-config) | Zig and ZLS | `object` | `zls.json`, `build.zig.zon` | zig fmt, zls |

## Shared infrastructure

| Repository | Role |
| --- | --- |
| [`config`](https://github.com/sebastienrousseau/config) | Aggregates the JavaScript configurations; hosts the reusable CI, publish, security, docs and native-validate workflows every repository calls |
| [`config-kit`](https://github.com/sebastienrousseau/config-kit) | The conformance suite all 38 packages run |
