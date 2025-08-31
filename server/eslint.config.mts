import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import pluginJs from "@eslint/js";
import eslintPreierConfig from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { drizzle: fixupPluginRules(drizzlePlugin), js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPreierConfig,
]);
