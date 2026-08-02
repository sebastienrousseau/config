const assert = require("assert");
const cjsConfig = require("../index.cjs");

async function runTests() {
  console.log("Testing 21-package master suite @sebastienrousseau/config...");

  assert(cjsConfig && typeof cjsConfig === "object", "Master config must be an object");
  assert(cjsConfig.eslint, "Must export eslint configuration");
  assert(cjsConfig.prettier, "Must export prettier configuration");
  assert(cjsConfig.tsconfig, "Must export tsconfig configuration");
  assert(cjsConfig.vitest, "Must export vitest configuration");
  assert(cjsConfig.biome, "Must export biome configuration");
  assert(cjsConfig.tailwindcss, "Must export tailwindcss configuration");
  assert(cjsConfig.playwright, "Must export playwright configuration");
  assert(cjsConfig.docker, "Must export docker configuration");

  console.log("✅ 21-package master config validation tests passed!");
}

runTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
