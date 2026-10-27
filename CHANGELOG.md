# Changelog

## [Unreleased]

### Added

-  `reusable-security.yml` reads an optional `.github/security-exceptions.json`
    in the calling repository: documented, time-bounded exceptions for
    advisories that cannot be fixed (for example inside the npm CLI that
    `@semantic-release/npm` bundles). An advisory passes only while a current
    exception names it; an expired, overdue or stale exception fails the job.
    Without the file, the job runs as before. See `docs/POLICIES.md`.

## [0.0.8]

### Fixed

-  The README claimed the ISC licence (it is Apache-2.0 OR MIT) and SLSA
    provenance (no published version has it), and said all 21 presets
    install with the suite; it now follows the repository README
    template, with every claim checked against the repository.

### Changed

-  `publish.yml` releases to npm with trusted publishing (OIDC) instead of
    the `NPM_TOKEN` secret, which npm rejected when 0.0.7 was released, so
    0.0.7 went out without provenance. The trusted publisher may only stage:
    CI runs `npm stage publish --provenance`, and a maintainer makes the
    version public with `npm stage approve <id>` and their 2FA.
-  `npm run lint` runs ESLint (with the complexity ceilings), Prettier, tsc
    on the type declarations and markdownlint, all with the family presets,
    and CI runs it on every pull request. It previously re-ran the tests.
-  Sources are formatted with the family Prettier preset.

### Added

-  `docs/POLICIES.md`: toolchain floor, versioning, dependency and release
    policies.
-  `.github/demo.gif`, rendered from `.github/demo.tape` by `npm run demo`.

## [0.0.7]

Released in lockstep with the configuration family at 0.0.7; 0.0.3 to
0.0.6 were never published for this package.

### Fixed

-  Every documented subpath (`@sebastienrousseau/config/eslint` and the
  other 20) threw `ERR_INVALID_PACKAGE_TARGET`; `exports` now points each
  one at a re-export in `presets/`.
-  `import { eslint } from "@sebastienrousseau/config"`, as shown in the
  README, was a `SyntaxError`; `index.mjs` now exports each required
  preset by name.
-  TypeScript: `index.d.ts` declared `export default` for a CommonJS
  module. It now uses `export =`, `index.d.mts` types the ESM entry
  (default and named exports), and every subpath has a declaration.
-  The README's Node badge said 18; the floor is Node 20 (`engines`).
-  The package now ships `LICENSE-APACHE` and `LICENSE-MIT`, the licence
  texts `LICENSE` refers to; earlier tarballs carried neither.

### Changed

-  `@sebastienrousseau/remark-config` and
  `@sebastienrousseau/semantic-release-config` are optional peer
  dependencies instead of dependencies. Their toolchains carried
  advisories with no reachable fix (npm's bundled http-cache-semantics,
  ip-address and undici; handlebars; braces). Install them yourself if
  you use those presets; `suite.remark` and `suite.semanticRelease` load
  on first access and name the install command when missing.
-  Dependencies move to the family's 0.0.7 releases, and every advised
  package in the lockfile is constrained to a patched range via
  `overrides`.
-  The shared conformance suite replaces the per-repository tests, and CI
  runs on Node 20, 22 and 24 across Linux, macOS and Windows.
-  Reusable workflows: OpenSSF Scorecard and CodeQL, SHA-pinned actions,
  `npm ci` in the publish workflow, the npm bundled with Node 24 for
  OIDC publishing instead of an unpinned global install, hash-pinned pip
  installs and locked-mode `dotnet restore` in the native probes.

### Known issues

-  `braces` (GHSA-vfj7-8cjw-p6xm, high) still reaches installs through
  stylelint (globby, fast-glob, micromatch). No patched release of braces
  exists.
-  `katex` (GHSA-238p-pmpm-9mq7, low) reaches consumer installs through
  markdownlint 0.42.0 and micromark-extension-math 3.1.0, which requires
  katex ^0.16; the fix is in 0.18.2. This repository's lockfile is
  constrained by `overrides`, but overrides do not apply to consumers.

[0.0.8]: https://github.com/sebastienrousseau/config/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/sebastienrousseau/config/compare/v0.0.2...v0.0.7
