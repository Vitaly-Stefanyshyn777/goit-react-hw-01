import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect", // Автоматичне визначення версії React
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Вимкнення застарілого правила для JSX
      "no-prototype-builtins": "off", // Вимкнення правила для hasOwnProperty
      "react/prop-types": "off", // Якщо не використовуєте PropTypes
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
