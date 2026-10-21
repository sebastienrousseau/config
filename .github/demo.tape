# SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
# SPDX-License-Identifier: Apache-2.0 OR MIT
#
# Renders .github/demo.gif with VHS (https://github.com/charmbracelet/vhs).
# Run `npm run demo` from the repository root after `npm ci`. Every command
# below runs against this checkout; nothing is fetched from the network.

Output .github/demo.gif

Set Shell "bash"
Set FontSize 16
Set Width 1200
Set Height 460
Set Padding 24
Set TypingSpeed 35ms
Set Theme "Catppuccin Mocha"

Hide
Type "export PS1='$ ' && clear"
Enter
Show

Type "# Named ESM imports, one per preset"
Enter
Type `node --input-type=module -e 'import { eslint, prettier, vitest } from "@sebastienrousseau/config"; console.log(eslint.length, prettier.printWidth, typeof vitest)'`
Enter
Sleep 2s

Type "# Or one subpath per preset, from require or import"
Enter
Type `node -p 'require("@sebastienrousseau/config/tsconfig").base.compilerOptions.strict'`
Enter
Sleep 2s

Type "# Optional peers name the package to install"
Enter
Type `node -e 'require("@sebastienrousseau/config").semanticRelease' 2>&1 | grep -o "is an optional peer.*"`
Enter
Sleep 3s

Type "npm test --silent"
Enter
Sleep 5s
