// cypress/support/commands.js
// ***********************************************************
// Commandes personnalisées pour Assolution
// ***********************************************************

// Commande pour naviguer avec gestion d'erreurs
Cypress.Commands.add("navigateTo", (path) => {
    cy.visit(path, {
        failOnStatusCode: false,
        timeout: 30000,
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
    });
});

// Commande pour nettoyer la base de données
Cypress.Commands.add("cleanDatabase", () => {
    cy.task("clearDatabase");
});

// Commande pour créer un utilisateur de test
Cypress.Commands.add("createTestUser", (userData) => {
    return cy.apiRequest("POST", "/auth/register", userData);
});

// Commande pour la connexion via l'interface
Cypress.Commands.add("login", (email, password) => {
    cy.navigateTo("/login");
    cy.get("[data-cy=email-input]").clear().type(email);
    cy.get("[data-cy=password-input]").clear().type(password);
    cy.get("[data-cy=login-button]").click();
});

// Commande pour la connexion via API
Cypress.Commands.add("loginAPI", (email, password) => {
    return cy
        .apiRequest("POST", "/auth/login", { email, password })
        .then((response) => {
            window.localStorage.setItem(
                "assolution_token",
                response.body.token
            );
            return response;
        });
});

// Commande pour la déconnexion
Cypress.Commands.add("logout", () => {
    cy.get("[data-cy=user-menu]").click();
    cy.get("[data-cy=logout-button]").click();
});

// Commande pour remplir le formulaire d'inscription
Cypress.Commands.add("fillRegistrationForm", (userData) => {
    if (userData.firstName) {
        cy.get("[data-cy=firstName-input]").clear().type(userData.firstName);
    }
    if (userData.lastName) {
        cy.get("[data-cy=lastName-input]").clear().type(userData.lastName);
    }
    if (userData.email) {
        cy.get("[data-cy=email-input]").clear().type(userData.email);
    }
    if (userData.password) {
        cy.get("[data-cy=password-input]").clear().type(userData.password);
    }
    if (userData.confirmPassword || userData.password) {
        cy.get("[data-cy=confirmPassword-input]")
            .clear()
            .type(userData.confirmPassword || userData.password);
    }
    if (userData.phone) {
        cy.get("[data-cy=phone-input]").clear().type(userData.phone);
    }

    // Accepter les conditions
    cy.get("[data-cy=terms-checkbox]").check();
});

// Commande pour vérifier les erreurs de formulaire
Cypress.Commands.add("checkFormErrors", (errors) => {
    errors.forEach((error) => {
        cy.get(`[data-cy=${error.field}-error]`).should(
            "contain",
            error.message
        );
    });
});

// Commande pour vérifier les notifications
Cypress.Commands.add("checkNotification", (message, type = "info") => {
    cy.get("[data-cy=notification]", { timeout: 10000 })
        .should("be.visible")
        .and("contain", message)
        .and("have.class", type);
});

// Commande pour les requêtes API avec retry
Cypress.Commands.add("apiRequest", (method, url, body = null, options = {}) => {
    const apiUrl = Cypress.env("apiUrl");
    const fullUrl = url.startsWith("http") ? url : `${apiUrl}${url}`;

    const requestOptions = {
        method,
        url: fullUrl,
        failOnStatusCode: false,
        timeout: Cypress.env("api_timeout") || 10000,
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
        ...options,
    };

    if (body) {
        requestOptions.body = body;
    }

    // Ajouter le token d'authentification si disponible
    const token = window.localStorage?.getItem("assolution_token");
    if (token) {
        requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return cy.request(requestOptions);
});

// Commande pour attendre qu'un service soit prêt
Cypress.Commands.add("waitForService", (url, timeout = 60000) => {
    return cy.task("waitForService", { url, timeout });
});

// Commande pour tester l'accessibilité
Cypress.Commands.add("checkA11y", () => {
    // Vous pourriez ajouter cypress-axe ici
    cy.log("Vérification de l'accessibilité");
    // TODO: Implémenter avec cypress-axe si nécessaire
});

// Commande pour tester le responsive
Cypress.Commands.add("testResponsive", (callback) => {
    const viewports = [
        { name: "mobile", width: 375, height: 667 },
        { name: "tablet", width: 768, height: 1024 },
        { name: "desktop", width: 1280, height: 720 },
    ];

    viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        callback(viewport);
    });
});

// Commande pour attendre le chargement complet de la page
Cypress.Commands.add("waitForPageLoad", () => {
    cy.window().should("have.property", "angular");
    cy.get("[data-cy=page-loader]").should("not.exist");
});

// Commande pour gérer les modals
Cypress.Commands.add("openModal", (modalTrigger) => {
    cy.get(modalTrigger).click();
    cy.get("[data-cy=modal]").should("be.visible");
});

Cypress.Commands.add("closeModal", () => {
    cy.get("[data-cy=modal-close]").click();
    cy.get("[data-cy=modal]").should("not.exist");
});

// Commande pour gérer les uploads de fichiers
Cypress.Commands.add(
    "uploadFile",
    (selector, fileName, fileType = "application/pdf") => {
        cy.fixture(fileName, "base64").then((fileContent) => {
            cy.get(selector).selectFile(
                {
                    contents: fileContent,
                    fileName: fileName,
                    mimeType: fileType,
                },
                { force: true }
            );
        });
    }
);
