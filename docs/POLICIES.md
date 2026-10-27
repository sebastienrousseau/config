<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Policies

## Minimum toolchain

-  Node.js 20 or newer (`engines.node` is `>=20.0.0`).
-  CI runs the test suite on Node 20, 22 and 24, each on Linux, macOS and
    Windows (`.github/workflows/ci.yml`). A Node line leaves the matrix, and
    the floor rises, only in a release whose CHANGELOG says so.
-  Lint, formatting, type and Markdown checks run on Node 24.

## Versioning

-  Versions start at 0.0.1 and step by 0.0.1. The configuration family
    releases in lockstep, so a package can skip numbers it never published
    (this one went from 0.0.2 to 0.0.7).
-  Before 0.1.0 any release may change the public surface. Every such change
    is listed in `CHANGELOG.md` under the version that makes it.

## Dependencies

-  Every advised package in `package-lock.json` is constrained to a patched
    range through `overrides`. Overrides apply to this repository only;
    advisories that reach consumer installs are listed under Known issues in
    the CHANGELOG.
-  Presets whose toolchains carry advisories with no reachable fix are
    optional peers rather than dependencies (remark and semantic-release
    since 0.0.7).
-  A family repository whose own audit cannot come back clean (an advisory
    inside a bundled dependency with no fixed release) records each accepted
    advisory in `.github/security-exceptions.json`:
    `{"exceptions": [{"advisory", "package", "reason", "owner", "accepted",
    "review_due", "expires"}]}`, the advisory a GHSA identifier and the dates
    `YYYY-MM-DD` in UTC. `reusable-security.yml` then gates the production
    tree at low and the full tree at high against it, and fails on an
    advisory no exception names, an exception past its review date or expiry,
    and an exception that no longer matches a reported advisory. Without the
    file, the two `npm audit` steps run as before. The workflow's copy of the
    checker is generated from `scripts/check-audit-exceptions.mjs` by
    `node scripts/embed-audit-checker.mjs`; `npm test` fails when they differ.

## Releases

-  Releases are tagged `v<version>` with a signed annotated tag.
-  From 0.0.8, `publish.yml` stages each release on npm through trusted
    publishing (OIDC) with provenance; a maintainer makes it public with
    `npm stage approve` and their second factor. 0.0.7 and earlier were
    published without provenance.
