const assert = require("assert");
const cjsConfig = require("../index.cjs");

async function runTests() {
  console.log("Testing @sebastienrousseau/config...");

  assert(cjsConfig && typeof cjsConfig === "object", "Master config must be an object");
  assert(cjsConfig.eslint, "Must export eslint configuration");
  assert(cjsConfig.prettier, "Must export prettier configuration");
  assert(cjsConfig.tsconfig, "Must export tsconfig configuration");
  assert(cjsConfig.vitest, "Must export vitest configuration");

  console.log("✅ master config validation tests passed!");
}

runTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
