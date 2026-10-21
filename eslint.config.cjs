// SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
// SPDX-License-Identifier: Apache-2.0 OR MIT

"use strict";

// The suite lints itself with the family preset it ships, plus the
// per-function complexity ceilings every repository in the portfolio keeps
// (cyclomatic 10, 60 lines per function, 500 per file).
module.exports = [
  ...require("@sebastienrousseau/eslint-config"),
  {
    rules: {
      complexity: ["error", 10],
      "max-depth": ["error", 4],
      "max-lines": ["error", 500],
      "max-lines-per-function": ["error", 60],
    },
  },
];
