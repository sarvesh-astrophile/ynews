import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import drizzlePlugin from "eslint-plugin-drizzle";
import eslintPreierConfig from "eslint-config-prettier";
import {fixupPluginRules} from "@eslint/compat";
import pluginJs from "@eslint/js";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { drizzle: fixupPluginRules(drizzlePlugin), js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPreierConfig,
]);
