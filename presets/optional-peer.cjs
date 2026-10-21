// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

"use strict";

/**
 * Load an optional peer preset, or fail naming the package to install.
 *
 * The remark and semantic-release presets are optional peers because their
 * toolchains carry advisories with no patched release; a project that does
 * not use them should not install them through the suite.
 *
 * @param {string} name package name of the preset
 * @returns {unknown} the preset's default export
 */
module.exports = function optionalPeer(name) {
  try {
    return require(name);
  } catch (error) {
    if (error.code !== "MODULE_NOT_FOUND" || !error.message.includes(`'${name}'`)) {
      throw error;
    }
    throw new Error(
      `${name} is an optional peer of @sebastienrousseau/config; ` +
        `install it to use this preset: npm install --save-dev ${name}`,
      { cause: error },
    );
  }
};
