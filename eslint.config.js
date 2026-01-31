// eslint.config.js  (ESLint v9+ flat config, CommonJS format)
module.exports = [
  // Default settings applied to all JS files unless overridden
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: 2021,
      // Don't set "type":"module" in package.json for this project.
      // Keep sourceType as "script" globally and override per group below.
      sourceType: "script"
    },
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }],
      "no-undef": "error"
    }
  },

  // Node/CommonJS files (build scripts, etc.)
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

  // Browser app code
  {
    files: ["src/**/*.js"],
    languageOptions: {
      // Browser scripts
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        console: "readonly",
        self: "readonly",
        module: "readonly" // used conditionally in UMD wrapper
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