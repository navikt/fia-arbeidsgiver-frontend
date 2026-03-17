import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

const eslintconfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.module.css",
      "*.config.{ts,js}",
      "*.setup.{ts,js}",
      "mocks/**",
      "coverage/**",
      "playwright/**",
      "test-results/**",
      "tests/**",
    ],
  },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-expressions": "off", // Disabled as it conflicts with JSX patterns
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-expressions": "off",
    },
  },
];

export default eslintconfig;
