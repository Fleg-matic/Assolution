// Karma configuration file for Angular 20
// Adapté à la structure Assolution avec SonarQube à la racine

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
        random: true,
        seed: "4321",
        stopOnFailure: false,
        failFast: false,
      },
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
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
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
      includeAllSources: true,
      instrumenterOptions: {
        istanbul: { noCompact: true },
      },
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "LATEST",
      // Chemin vers la racine du projet Assolution
      outputFile: "../../reports/sonar-report.xml",
      overrideTestDescription: true,
      testPaths: ["./src"],
      testFilePattern: ".spec.ts",
      useBrowserName: false,
      reportName: function (browser) {
        return browser.name.replace(/ /g, "_");
      },
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
          "--disable-extensions",
          "--disable-plugins",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-renderer-backgrounding",
          "--remote-debugging-port=9222",
          "--js-flags=--max-old-space-size=4096",
          "--memory-pressure-off",
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
    pingTimeout: 120000,
    processKillTimeout: 10000,
  });

  // Configuration CI/CD
  if (process.env.NODE_ENV === "test" || process.env.CI) {
    config.set({
      browsers: ["ChromeHeadlessCI"],
      singleRun: true,
      autoWatch: false,
      reporters: ["progress", "coverage"],
      logLevel: config.LOG_ERROR,
      browserConsoleLogOptions: {
        level: "error",
        format: "%b %T: %m",
        terminal: true,
      },
    });

    // Réactiver SonarQube seulement si le dossier reports existe
    if (!process.env.DISABLE_SONAR) {
      config.reporters.push("sonarqubeUnit");
    }
  }
};
