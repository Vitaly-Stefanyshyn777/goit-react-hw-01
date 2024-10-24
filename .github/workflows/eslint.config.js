import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  // Файли для перевірки
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  // Параметри для JSX
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  // Глобальні змінні браузера
  { languageOptions: { globals: globals.browser } },

  // Рекомендовані налаштування ESLint для JavaScript
  pluginJs.configs.recommended,
  // Рекомендовані налаштування для React
  pluginReactConfig,
  // Вимкнення стилістичних правил ESLint, які конфліктують з Prettier
  prettierConfig,

  {
    // Налаштування для React
    settings: {
      react: {
        version: "detect", // Автоматичне визначення версії React
      },
    },
    // Плагіни для Prettier
    plugins: {
      prettier: prettierPlugin,
    },
    // Правила для Prettier і React
    rules: {
      // Використання Prettier для форматування
      "prettier/prettier": "error",
      // Вимкнення правила про обов'язкові prop-types для React
      "react/prop-types": 0,
    },
  },
];
