import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  {
    // Налаштування для перевірки файлів
    files: ["**/*.{js,mjs,cjs,jsx}"],

    // Налаштування мови
    languageOptions: {
      ecmaVersion: 2021, // Вказуємо версію ECMAScript
      sourceType: "module", // Для підтримки ECMAScript Modules (ESM)
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Підтримка JSX
        },
      },
      // Глобальні змінні для браузера
      globals: globals.browser,
    },

    // Включення рекомендованих конфігурацій для JavaScript
    ...js.configs.recommended,
    // Рекомендовані налаштування для React
    ...reactConfig,
    // Вимкнення стилістичних правил ESLint, що конфліктують із Prettier
    ...prettierConfig,

    // Налаштування для плагінів
    plugins: {
      prettier: prettierPlugin,
    },

    // Налаштування для React
    settings: {
      react: {
        version: "detect", // Автоматичне визначення версії React
      },
    },

    // Визначення правил
    rules: {
      // Використання Prettier для форматування
      "prettier/prettier": "error",
      // Вимкнення правила про обов'язкові prop-types для React
      "react/prop-types": 0,
    },
  },
];
