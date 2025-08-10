// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.4/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("karma-sonarqube-unit-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution order
        random: true,
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/inscriptions-frontend"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "text-summary" },
        { type: "lcovonly" },
        { type: "cobertura" },
      ],
      check: {
        global: {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        },
      },
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "LATEST",
      outputFile: "coverage/sonar-report.xml",
      overrideTestDescription: true,
      testPaths: ["./src"],
      testFilePattern: ".spec.ts",
      useBrowserName: false,
    },
    reporters: ["progress", "kjhtml", "coverage", "sonarqubeUnit"],
    browsers: ["Chrome"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--disable-web-security",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--remote-debugging-port=9222",
        ],
      },
    },
    restartOnFileChange: true,
    singleRun: false,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: true,
    captureTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
  });

  // Configuration spécifique pour CI/CD
  if (process.env.NODE_ENV === "test" || process.env.CI) {
    config.set({
      browsers: ["ChromeHeadlessCI"],
      singleRun: true,
      autoWatch: false,
      reporters: ["progress", "coverage", "sonarqubeUnit"],
    });
  }
};
