import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "node_modules"],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
      prettier: prettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,

      ...reactHooks.configs.recommended.rules,

      "prettier/prettier": "error",

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  prettierConfig,
]);
