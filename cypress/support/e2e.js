// cypress/support/e2e.js
// ***********************************************************
// Support file pour les tests E2E Assolution
// ***********************************************************

import "./commands";

// Configuration globale
Cypress.on("uncaught:exception", (err, runnable) => {
    // Ne pas faire échouer les tests sur certaines erreurs JavaScript
    if (
        err.message.includes("Script error") ||
        err.message.includes("ResizeObserver loop limit exceeded")
    ) {
        return false;
    }
    return true;
});

// Configuration des timeouts par défaut
Cypress.config("defaultCommandTimeout", 10000);
Cypress.config("pageLoadTimeout", 30000);

// Hook avant chaque test
beforeEach(() => {
    // Intercepter les appels API pour éviter les vraies requêtes vers des services externes
    cy.intercept("POST", "**/analytics/**", { statusCode: 200 }).as(
        "analytics"
    );
    cy.intercept("GET", "**/actuator/health", {
        status: "UP",
        components: {
            db: { status: "UP" },
            diskSpace: { status: "UP" },
        },
    }).as("healthCheck");
});

// Hook après chaque test
afterEach(() => {
    // Nettoyer les données de test si nécessaire
    cy.clearLocalStorage();
    cy.clearCookies();
});
