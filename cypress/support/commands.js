// ***********************************************
// Commandes personnalisées pour les tests Cypress - Assolution
// ***********************************************

// ===============================
// COMMANDES D'AUTHENTIFICATION
// ===============================

/**
 * Commande pour se connecter avec des identifiants
 */
Cypress.Commands.add("login", (email, password) => {
    cy.visit("/login");
    cy.get("[data-cy=email-input]").type(email);
    cy.get("[data-cy=password-input]").type(password);
    cy.get("[data-cy=login-button]").click();

    // Attendre la redirection après connexion
    cy.url().should("not.include", "/login");
    cy.window()
        .its("localStorage")
        .invoke("getItem", "assolution_token")
        .should("exist");
});

/**
 * Commande pour se connecter via API (plus rapide)
 */
Cypress.Commands.add("loginAPI", (email, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        body: {
            email: email,
            password: password,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        window.localStorage.setItem("assolution_token", response.body.token);
        window.localStorage.setItem(
            "assolution_refresh_token",
            response.body.refreshToken
        );
    });
});

/**
 * Commande pour se déconnecter
 */
Cypress.Commands.add("logout", () => {
    cy.get("[data-cy=user-menu]").click();
    cy.get("[data-cy=logout-button]").click();
    cy.url().should("include", "/login");
    cy.window()
        .its("localStorage")
        .invoke("getItem", "assolution_token")
        .should("not.exist");
});

// ===============================
// COMMANDES DE NAVIGATION
// ===============================

/**
 * Commande pour naviguer vers une page avec vérification
 */
Cypress.Commands.add("navigateTo", (path, options = {}) => {
    cy.visit(path, options);
    cy.url().should("include", path);
    cy.get("[data-cy=loading]").should("not.exist");
});

/**
 * Commande pour attendre le chargement complet d'une page
 */
Cypress.Commands.add("waitForPageLoad", () => {
    cy.get("[data-cy=loading]").should("not.exist");
    cy.get("body").should("be.visible");
});

// ===============================
// COMMANDES DE FORMULAIRE
// ===============================

/**
 * Commande pour remplir un formulaire d'inscription
 */
Cypress.Commands.add("fillRegistrationForm", (userData) => {
    cy.get("[data-cy=firstName-input]").clear().type(userData.firstName);
    cy.get("[data-cy=lastName-input]").clear().type(userData.lastName);
    cy.get("[data-cy=email-input]").clear().type(userData.email);
    cy.get("[data-cy=password-input]").clear().type(userData.password);
    cy.get("[data-cy=confirmPassword-input]")
        .clear()
        .type(userData.confirmPassword || userData.password);

    if (userData.phone) {
        cy.get("[data-cy=phone-input]").clear().type(userData.phone);
    }

    // Accepter les conditions
    cy.get("[data-cy=terms-checkbox]").check();
});

/**
 * Commande pour valider les erreurs de formulaire
 */
Cypress.Commands.add("checkFormErrors", (expectedErrors) => {
    expectedErrors.forEach((error) => {
        cy.get(`[data-cy=${error.field}-error]`).should(
            "contain",
            error.message
        );
    });
});

// ===============================
// COMMANDES D'API
// ===============================

/**
 * Commande pour faire un appel API authentifié
 */
Cypress.Commands.add("apiRequest", (method, endpoint, body = null) => {
    cy.window()
        .its("localStorage")
        .invoke("getItem", "assolution_token")
        .then((token) => {
            const options = {
                method: method,
                url: `${Cypress.env("apiUrl")}${endpoint}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            if (body) {
                options.body = body;
            }

            cy.request(options);
        });
});

/**
 * Commande pour créer un utilisateur de test via API
 */
Cypress.Commands.add("createTestUser", (userData) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/register`,
        body: userData,
        failOnStatusCode: false,
    });
});

// ===============================
// COMMANDES DE BASE DE DONNÉES
// ===============================

/**
 * Commande pour nettoyer la base de données de test
 */
Cypress.Commands.add("cleanDatabase", () => {
    cy.task("clearDatabase");
});

/**
 * Commande pour créer des données de test
 */
Cypress.Commands.add("seedTestData", () => {
    cy.task("seedDatabase");
});

// ===============================
// COMMANDES D'ASSERTIONS
// ===============================

/**
 * Commande pour vérifier qu'un toast/notification est affiché
 */
Cypress.Commands.add("checkNotification", (message, type = "success") => {
    cy.get(`[data-cy=notification][data-type=${type}]`)
        .should("be.visible")
        .and("contain", message);
});

/**
 * Commande pour vérifier l'état de chargement
 */
Cypress.Commands.add("checkLoadingState", (shouldBeLoading = false) => {
    if (shouldBeLoading) {
        cy.get("[data-cy=loading]").should("be.visible");
    } else {
        cy.get("[data-cy=loading]").should("not.exist");
    }
});

// ===============================
// COMMANDES DE FICHIERS
// ===============================

/**
 * Commande pour uploader un fichier
 */
Cypress.Commands.add(
    "uploadFile",
    (selector, fileName, fileType = "application/pdf") => {
        cy.fixture(fileName, "base64").then((fileContent) => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType);
            const file = new File([blob], fileName, { type: fileType });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            cy.get(selector).then((input) => {
                input[0].files = dataTransfer.files;
                cy.wrap(input).trigger("change", { force: true });
            });
        });
    }
);

// ===============================
// COMMANDES DE PAIEMENT
// ===============================

/**
 * Commande pour simuler un paiement Stripe (en mode test)
 */
Cypress.Commands.add("simulatePayment", (cardDetails = {}) => {
    const defaultCard = {
        number: "4242424242424242",
        expiry: "12/34",
        cvc: "123",
    };

    const card = { ...defaultCard, ...cardDetails };

    // Attendre que Stripe soit chargé
    cy.get("[data-cy=stripe-card-element]").should("be.visible");

    // Remplir les détails de la carte (simulation)
    cy.get("[data-cy=card-number]").type(card.number);
    cy.get("[data-cy=card-expiry]").type(card.expiry);
    cy.get("[data-cy=card-cvc]").type(card.cvc);

    cy.get("[data-cy=pay-button]").click();
});

// ===============================
// COMMANDES D'ACCESSIBILITÉ
// ===============================

/**
 * Commande pour vérifier l'accessibilité de base
 */
Cypress.Commands.add("checkA11y", (context = null, options = {}) => {
    cy.injectAxe();
    cy.checkA11y(context, options);
});

// ===============================
// COMMANDES DE RESPONSIVE
// ===============================

/**
 * Commande pour tester différentes tailles d'écran
 */
Cypress.Commands.add("testResponsive", (callback) => {
    const viewports = [
        { width: 320, height: 568, name: "mobile" },
        { width: 768, height: 1024, name: "tablet" },
        { width: 1280, height: 720, name: "desktop" },
    ];

    viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        cy.log(
            `Testing on ${viewport.name} (${viewport.width}x${viewport.height})`
        );
        callback(viewport);
    });
});

// ===============================
// COMMANDES DE DEBUGGING
// ===============================

/**
 * Commande pour logger des informations de debug
 */
Cypress.Commands.add("debugLog", (message, data = null) => {
    cy.task(
        "log",
        `[DEBUG] ${message}${data ? ": " + JSON.stringify(data) : ""}`
    );
});

/**
 * Commande pour faire une pause dans les tests (développement uniquement)
 */
Cypress.Commands.add("pause", () => {
    if (Cypress.config("isInteractive")) {
        cy.debug();
    }
});

// ===============================
// CONFIGURATION DES COMMANDES GLOBALES
// ===============================

// Augmenter les timeouts pour les commandes qui peuvent être lentes
Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
    return originalFn(url, {
        timeout: 30000,
        ...options,
    });
});

// Commande pour attendre avant chaque test
beforeEach(() => {
    // Vérifier que l'application est accessible
    cy.request({
        url: Cypress.config("baseUrl"),
        failOnStatusCode: false,
    }).then((response) => {
        if (response.status !== 200) {
            cy.log("Application might not be ready, waiting...");
            cy.wait(5000);
        }
    });
});
