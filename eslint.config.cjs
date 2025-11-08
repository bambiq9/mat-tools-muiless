const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");

const {
    fixupConfigRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    files: ["./src/**/*.{js,jsx,ts,tsx,json}"],

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",

        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    extends: fixupConfigRules(compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:jsx-a11y/recommended",
        "plugin:eslint-comments/recommended",
    )),

    rules: {
        "quotes": [2, "single", {
            "avoidEscape": true,
        }],

        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-var-requires": "off",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },

    ignores: [
        "node_modules/**/*",
        "public/**/*",
        "eslint.config.js",
        "storybook-static/**/*",
        "build/**/*",
        "dist/**/*",
        "webpack/*.js",
        "package*.json",
        "**/*.d.ts",
    ],
}]);