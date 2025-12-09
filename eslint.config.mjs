// Re-export the CommonJS config so we still support `eslint.config.mjs` while
// avoiding importing protected subpaths like `eslint/config`.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./.eslintrc.cjs");
export default config;
