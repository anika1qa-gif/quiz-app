// eslint.config.js  (ESLint v9+ flat config, CommonJS)
module.exports = [
  // Base defaults
  {
    files: ["**/*.js"],
    // Ignore build/coverage and the config files themselves
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "eslint.config.js",
      "jest.config.js"
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script"
    },
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }],
      "no-undef": "error"
    }
  },

  // Node/CommonJS scripts (build tools, etc.)
  {
    files: ["build.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly"
      }
    }
  },

  // Browser app files
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        console: "readonly",
        self: "readonly",
        module: "readonly"
      }
    }
  },

  // Jest tests (Node + Jest globals)
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        console: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly"
      }
    }
  }
];