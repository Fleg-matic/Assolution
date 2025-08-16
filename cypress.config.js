const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // Configuration globale
    projectId: "assolution-e2e",

    // Configuration des tests E2E
    e2e: {
        // URL de base de l'application - sera injectée par GitHub Actions
        baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:80",

        // Dossier des spécifications
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

        // Dossier de support
        supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",

        // Configuration de la viewport
        viewportWidth: 1280,
        viewportHeight: 720,

        // Timeouts ajustés pour GitHub Actions
        defaultCommandTimeout: 15000,
        requestTimeout: 15000,
        responseTimeout: 15000,
        pageLoadTimeout: 60000,

        // Configuration du navigateur
        chromeWebSecurity: false,

        // Configuration des tests
        setupNodeEvents(on, config) {
            // Gestion des tâches personnalisées
            on("task", {
                // Log des messages depuis les tests
                log(message) {
                    console.log(`[Cypress Task] ${message}`);
                    return null;
                },

                // Tâche pour nettoyer la base de données de test
                clearDatabase() {
                    console.log("🧹 Nettoyage de la base de données de test");
                    // TODO: Implémentation avec votre API backend
                    return null;
                },

                // Tâche pour créer des données de test
                seedDatabase() {
                    console.log("🌱 Création des données de test");
                    // TODO: Implémentation avec votre API backend
                    return null;
                },

                // Tâche pour attendre qu'un service soit prêt
                waitForService({ url, timeout = 60000 }) {
                    return new Promise((resolve, reject) => {
                        const startTime = Date.now();
                        const checkService = () => {
                            const http = require("http");
                            const req = http.get(url, (res) => {
                                if (res.statusCode === 200) {
                                    console.log(`✅ Service ready at ${url}`);
                                    resolve(true);
                                } else {
                                    setTimeout(checkService, 2000);
                                }
                            });
                            req.on("error", () => {
                                if (Date.now() - startTime > timeout) {
                                    reject(
                                        new Error(
                                            `Service not ready after ${timeout}ms`
                                        )
                                    );
                                } else {
                                    setTimeout(checkService, 2000);
                                }
                            });
                        };
                        checkService();
                    });
                },
            });

            // Configuration des variables d'environnement selon l'environnement
            const environment =
                process.env.CYPRESS_ENVIRONMENT ||
                config.env.environment ||
                "development";

            if (environment === "development") {
                config.baseUrl =
                    process.env.CYPRESS_BASE_URL || "http://localhost:80";
                config.env.apiUrl =
                    process.env.CYPRESS_API_URL || "http://localhost:8080/api";
            } else if (environment === "production") {
                config.baseUrl =
                    process.env.CYPRESS_BASE_URL_PROD ||
                    process.env.CYPRESS_BASE_URL;
                config.env.apiUrl =
                    process.env.CYPRESS_API_URL_PROD ||
                    process.env.CYPRESS_API_URL;
            }

            // Injection des variables d'environnement GitHub Actions
            config.env = {
                ...config.env,
                environment: environment,
                apiUrl: config.env.apiUrl,

                // Données de test depuis les secrets GitHub
                testUser: {
                    email:
                        process.env.CYPRESS_TEST_USER_EMAIL ||
                        "test@assolution.com",
                    password:
                        process.env.CYPRESS_TEST_USER_PASSWORD ||
                        "TestPassword123!",
                    firstName: "Test",
                    lastName: "User",
                },

                testAdmin: {
                    email:
                        process.env.CYPRESS_TEST_ADMIN_EMAIL ||
                        "admin@assolution.com",
                    password:
                        process.env.CYPRESS_TEST_ADMIN_PASSWORD ||
                        "AdminPassword123!",
                    firstName: "Admin",
                    lastName: "User",
                },
            };

            console.log(
                `🔧 Cypress configured for environment: ${environment}`
            );
            console.log(`🌐 Base URL: ${config.baseUrl}`);
            console.log(`🔌 API URL: ${config.env.apiUrl}`);

            return config;
        },
    },

    // Configuration des tests de composants (si utilisé)
    component: {
        devServer: {
            framework: "angular",
            bundler: "webpack",
        },
        specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    },

    // Configuration globale des variables d'environnement par défaut
    env: {
        // Ces valeurs seront surchargées par setupNodeEvents
        environment: "development",
        apiUrl: "http://localhost:8080/api",

        // Configuration des timeouts
        api_timeout: 10000,
        page_load_timeout: 30000,

        // Configuration des retry pour les API calls
        retry_attempts: 3,
        retry_delay: 1000,
    },

    // Configuration des captures d'écran et vidéos
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    screenshotOnRunFailure: true,

    // Configuration des retry pour les tests flaky
    retries: {
        runMode: 2, // 2 retry en mode CI
        openMode: 0, // Pas de retry en mode interactif
    },

    // Configuration des exclusions
    excludeSpecPattern: ["**/examples/*", "**/temp/*", "**/node_modules/*"],

    // Configuration de sécurité et expérimental
    experimentalStudio: false, // Désactivé en production
    experimentalWebKitSupport: false, // Peut causer des problèmes en CI

    // Configuration des téléchargements et fixtures
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",

    // Configuration pour CI/CD
    watchForFileChanges: false, // Désactivé pour les tests CI

    // Configuration Node.js
    nodeVersion: "system",

    // Configuration pour éviter les erreurs de mémoire en CI
    numTestsKeptInMemory: 5,
});
