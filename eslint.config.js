// eslint.config.js (ESLint v9+ flat config)
export default [
  {
    files: ["**/*.js"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        module: "writable"   // for quizCore.js UMD on Node tests
      }
    },
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }],
      "no-undef": "error"
    }
  }
];