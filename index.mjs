// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * ESM entrypoint.
 *
 * The suite is assembled once, in `index.cjs`, and re-exported here so the two
 * module systems cannot drift apart. Until 0.0.7 this file listed its imports
 * by hand and had fallen seven packages behind `index.cjs`, so `import` and
 * `require` returned different objects.
 */

import suite from "./index.cjs";

export default suite;
