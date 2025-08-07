const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // Configuration globale

    projectId: "assolution-e2e",

    // Configuration des tests E2E

    e2e: {
        // URL de base de l'application

        baseUrl: "http://localhost:80",

        // Dossier des spécifications

        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

        // Dossier de support

        supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",

        // Configuration de la viewport

        viewportWidth: 1280,

        viewportHeight: 720,

        // Timeouts

        defaultCommandTimeout: 10000,

        requestTimeout: 10000,

        responseTimeout: 10000,

        pageLoadTimeout: 30000,

        // Configuration du navigateur

        chromeWebSecurity: false,

        // Configuration des tests

        setupNodeEvents(on, config) {
            // Gestion des tâches personnalisées

            on("task", {
                // Log des messages depuis les tests

                log(message) {
                    console.log(message);

                    return null;
                },

                // Tâche pour nettoyer la base de données de test

                clearDatabase() {
                    // Implémentation à ajouter selon vos besoins

                    console.log("Nettoyage de la base de données de test");

                    return null;
                },

                // Tâche pour créer des données de test

                seedDatabase() {
                    // Implémentation à ajouter selon vos besoins

                    console.log("Création des données de test");

                    return null;
                },
            });

            // Configuration des variables d'environnement selon l'environnement

            if (config.env.environment === "development") {
                config.baseUrl = "http://localhost:80";

                config.env.apiUrl = "http://localhost:80/api";
            } else if (config.env.environment === "production") {
                config.baseUrl = "http://192.168.1.22";

                config.env.apiUrl = "http://192.168.1.22/api";
            }

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

    // Configuration globale

    env: {
        // Variables d'environnement pour les tests

        environment: "development",

        apiUrl: "http://localhost:80/api",

        // Données de test

        testUser: {
            email: "test@assolution.com",

            password: "TestPassword123!",

            firstName: "Test",

            lastName: "User",
        },

        testAdmin: {
            email: "admin@assolution.com",

            password: "AdminPassword123!",

            firstName: "Admin",

            lastName: "User",
        },
    },

    // Configuration des captures d'écran et vidéos

    screenshotsFolder: "cypress/screenshots",

    videosFolder: "cypress/videos",

    video: true,

    screenshotOnRunFailure: true,

    // Configuration des retry

    retries: {
        runMode: 2,

        openMode: 0,
    },

    // Configuration des reporters

    reporter: "cypress-multi-reporters",

    reporterOptions: {
        configFile: "cypress/reporter-config.json",
    },

    // Configuration des exclusions

    excludeSpecPattern: ["**/examples/*", "**/temp/*"],

    // Configuration de sécurité

    experimentalStudio: true,

    experimentalWebKitSupport: true,

    // Configuration des téléchargements

    downloadsFolder: "cypress/downloads",

    // Configuration des fixtures

    fixturesFolder: "cypress/fixtures",

    // Désactiver la collecte automatique des métriques

    watchForFileChanges: true,

    // Configuration Node.js

    nodeVersion: "system",
});

// Configuration avancée pour les tests E2E spécifiques à Assolution
