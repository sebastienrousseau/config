// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

"use strict";

/**
 * The remark and semantic-release presets are optional peers: they pull in
 * whole toolchains (remark-cli, semantic-release and the npm CLI it bundles)
 * whose transitive advisories have no patched release. Installing the suite
 * must not install them, loading the suite must not need them, and asking for
 * one that is missing must fail naming the package to install.
 */

const assert = require("assert");
const manifest = require("../package.json");

const OPTIONAL = {
  remark: { subpath: "remark", name: "@sebastienrousseau/remark-config" },
  semanticRelease: {
    subpath: "semantic-release",
    name: "@sebastienrousseau/semantic-release-config",
  },
};

const isInstalled = (name) => {
  try {
    require.resolve(name);
    return true;
  } catch {
    return false;
  }
};

const suite = require("@sebastienrousseau/config");

for (const [key, { subpath, name }] of Object.entries(OPTIONAL)) {
  assert.ok(!(name in (manifest.dependencies ?? {})), `${name} must not be a dependency`);
  assert.ok(name in (manifest.peerDependencies ?? {}), `${name} must be a peer dependency`);
  assert.strictEqual(
    manifest.peerDependenciesMeta?.[name]?.optional,
    true,
    `${name} must be an optional peer`,
  );
  assert.ok(Object.keys(suite).includes(key), `suite.${key} must stay enumerable`);

  if (isInstalled(name)) {
    assert.strictEqual(suite[key], require(name));
    continue;
  }
  assert.throws(() => suite[key], new RegExp(`npm install --save-dev ${name}`));
  assert.throws(
    () => require(`@sebastienrousseau/config/${subpath}`),
    new RegExp(`npm install --save-dev ${name}`),
  );
}

console.log(`✅ ${Object.keys(OPTIONAL).length} optional peers are lazy and name themselves`);
