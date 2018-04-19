/* tslint:disable */

module.exports = function (w) {
  return {
    files: [
      "src/**/*.ts?(x)",
      "src/**/*.js",
      "__tests__/__helpers__/**/*",
      "*.json"
    ],

    tests: [
      "__tests__/*.ts",
      "!__tests__/*.e2e.ts",
    ],

    filesWithNoCoverageCalculated: [
      "__tests__/__helpers__/**/*",
      "src/**/*.js",
    ],

    testFramework: "jest",

    env: {
      type: "node",
    },
    
    hints: {
      ignoreCoverage: /istanbul ignore/,
    },

    delays: {
      run: 2000,
    },

    setup: function (w) {
      const fs = require("fs");
      const path = require("path");

      try {
        fs.existsSync("./node_modules") && fs.unlinkSync("./node_modules");
        fs.symlinkSync(path.join(w.localProjectDir, "node_modules"), "./node_modules");
      } catch (_) { /* intentionally blank */}
    }
  };
};
