import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "script",
    },

    rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-var": "error",
        "prefer-const": "error",
        "dot-notation": "warn",
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "object-shorthand": ["warn", "always"],
        "no-dupe-keys": "error",
    },
}]);