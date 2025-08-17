/**
 * Tests E2E pour l'authentification - Assolution
 */

describe("Authentification", () => {
    beforeEach(() => {
        // Nettoyer les données avant chaque test
        cy.cleanDatabase();
        cy.visit("/");
    });

    describe("Page de connexion", () => {
        it("devrait afficher la page de connexion", () => {
            cy.navigateTo("/login");
            cy.get("[data-cy=login-form]").should("be.visible");
            cy.get("[data-cy=email-input]").should("be.visible");
            cy.get("[data-cy=password-input]").should("be.visible");
            cy.get("[data-cy=login-button]").should("be.visible");
            cy.title().should("contain", "Connexion - Assolution");
        });

        it("devrait afficher des erreurs pour des champs vides", () => {
            cy.navigateTo("/login");
            cy.get("[data-cy=login-button]").click();

            cy.checkFormErrors([
                { field: "email", message: "L'email est requis" },
                { field: "password", message: "Le mot de passe est requis" },
            ]);
        });

        it("devrait afficher une erreur pour un email invalide", () => {
            cy.navigateTo("/login");
            cy.get("[data-cy=email-input]").type("email-invalide");
            cy.get("[data-cy=password-input]").type("password123");
            cy.get("[data-cy=login-button]").click();

            cy.get("[data-cy=email-error]").should("contain", "Email invalide");
        });

        it("devrait se connecter avec des identifiants valides", () => {
            // Créer un utilisateur de test
            const testUser = {
                email: "test@assolution.com",
                password: "TestPassword123!",
                firstName: "Test",
                lastName: "User",
            };

            cy.createTestUser(testUser).then(() => {
                cy.login(testUser.email, testUser.password);

                // Vérifier la redirection vers le dashboard
                cy.url().should("include", "/dashboard");
                cy.get("[data-cy=welcome-message]").should(
                    "contain",
                    `Bienvenue ${testUser.firstName}`
                );
                cy.checkNotification("Connexion réussie", "success");
            });
        });

        it("devrait afficher une erreur pour des identifiants incorrects", () => {
            cy.navigateTo("/login");
            cy.get("[data-cy=email-input]").type("wrong@email.com");
            cy.get("[data-cy=password-input]").type("wrongpassword");
            cy.get("[data-cy=login-button]").click();

            cy.checkNotification("Identifiants incorrects", "error");
            cy.url().should("include", "/login");
        });
    });

    describe("Page d'inscription", () => {
        it("devrait afficher la page d'inscription", () => {
            cy.navigateTo("/register");
            cy.get("[data-cy=register-form]").should("be.visible");
            cy.get("[data-cy=firstName-input]").should("be.visible");
            cy.get("[data-cy=lastName-input]").should("be.visible");
            cy.get("[data-cy=email-input]").should("be.visible");
            cy.get("[data-cy=password-input]").should("be.visible");
            cy.get("[data-cy=confirmPassword-input]").should("be.visible");
            cy.get("[data-cy=terms-checkbox]").should("be.visible");
            cy.get("[data-cy=register-button]").should("be.visible");
        });

        it("devrait créer un nouveau compte avec des données valides", () => {
            const newUser = {
                firstName: "Nouveau",
                lastName: "Utilisateur",
                email: "nouveau@assolution.com",
                password: "NouveauPassword123!",
                phone: "0123456789",
            };

            cy.navigateTo("/register");
            cy.fillRegistrationForm(newUser);
            cy.get("[data-cy=register-button]").click();

            // Vérifier la création réussie
            cy.checkNotification("Compte créé avec succès", "success");
            cy.url().should("include", "/dashboard");
            cy.get("[data-cy=welcome-message]").should(
                "contain",
                `Bienvenue ${newUser.firstName}`
            );
        });

        it("devrait valider la confirmation du mot de passe", () => {
            const userData = {
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                password: "Password123!",
                confirmPassword: "DifferentPassword123!",
            };

            cy.navigateTo("/register");
            cy.fillRegistrationForm(userData);
            cy.get("[data-cy=register-button]").click();

            cy.get("[data-cy=confirmPassword-error]").should(
                "contain",
                "Les mots de passe ne correspondent pas"
            );
        });

        it("devrait empêcher l'inscription avec un email déjà utilisé", () => {
            const existingUser = {
                email: "existing@assolution.com",
                password: "Password123!",
                firstName: "Existing",
                lastName: "User",
            };

            // Créer d'abord un utilisateur
            cy.createTestUser(existingUser);

            // Essayer de créer un autre utilisateur avec le même email
            cy.navigateTo("/register");
            cy.fillRegistrationForm({
                firstName: "Another",
                lastName: "User",
                email: existingUser.email,
                password: "AnotherPassword123!",
            });
            cy.get("[data-cy=register-button]").click();

            cy.checkNotification("Cet email est déjà utilisé", "error");
        });
    });

    describe("Déconnexion", () => {
        it("devrait se déconnecter correctement", () => {
            const testUser = {
                email: "logout@assolution.com",
                password: "Password123!",
                firstName: "Logout",
                lastName: "Test",
            };

            cy.createTestUser(testUser);
            cy.loginAPI(testUser.email, testUser.password);
            cy.visit("/dashboard");

            cy.logout();

            // Vérifier la déconnexion
            cy.url().should("include", "/login");
            cy.checkNotification("Déconnexion réussie", "success");

            // Vérifier que l'accès aux pages protégées redirige vers login
            cy.visit("/dashboard");
            cy.url().should("include", "/login");
        });
    });

    describe("Mot de passe oublié", () => {
        it("devrait afficher la page de mot de passe oublié", () => {
            cy.navigateTo("/forgot-password");
            cy.get("[data-cy=forgot-password-form]").should("be.visible");
            cy.get("[data-cy=email-input]").should("be.visible");
            cy.get("[data-cy=send-reset-button]").should("be.visible");
        });

        it("devrait envoyer un email de réinitialisation", () => {
            const testUser = {
                email: "reset@assolution.com",
                password: "Password123!",
                firstName: "Reset",
                lastName: "Test",
            };

            cy.createTestUser(testUser);
            cy.navigateTo("/forgot-password");
            cy.get("[data-cy=email-input]").type(testUser.email);
            cy.get("[data-cy=send-reset-button]").click();

            cy.checkNotification("Email de réinitialisation envoyé", "success");
        });
    });

    describe("Tests de sécurité", () => {
        it("devrait protéger les routes authentifiées", () => {
            const protectedRoutes = ["/dashboard", "/profile", "/inscriptions"];

            protectedRoutes.forEach((route) => {
                cy.visit(route);
                cy.url().should("include", "/login");
            });
        });

        it("devrait déconnecter automatiquement après expiration du token", () => {
            const testUser = {
                email: "expire@assolution.com",
                password: "Password123!",
                firstName: "Expire",
                lastName: "Test",
            };

            cy.createTestUser(testUser);
            cy.loginAPI(testUser.email, testUser.password);

            // Simuler l'expiration du token
            cy.window().then((win) => {
                win.localStorage.setItem("assolution_token", "expired_token");
            });

            cy.visit("/dashboard");
            cy.apiRequest("GET", "/users/profile").then((response) => {
                expect(response.status).to.eq(401);
            });

            cy.url().should("include", "/login");
            cy.checkNotification("Session expirée", "warning");
        });
    });

    describe("Tests d'accessibilité", () => {
        it("devrait respecter les standards d'accessibilité sur la page de connexion", () => {
            cy.navigateTo("/login");
            cy.checkA11y();
        });

        it("devrait respecter les standards d'accessibilité sur la page d'inscription", () => {
            cy.navigateTo("/register");
            cy.checkA11y();
        });
    });

    describe("Tests responsive", () => {
        it("devrait fonctionner sur différentes tailles d'écran", () => {
            const testUser = {
                email: "responsive@assolution.com",
                password: "Password123!",
                firstName: "Responsive",
                lastName: "Test",
            };

            cy.createTestUser(testUser);

            cy.testResponsive((viewport) => {
                cy.navigateTo("/login");
                cy.get("[data-cy=login-form]").should("be.visible");

                if (viewport.name === "mobile") {
                    // Tests spécifiques mobile
                    cy.get("[data-cy=mobile-nav]").should("be.visible");
                }

                cy.login(testUser.email, testUser.password);
                cy.url().should("include", "/dashboard");
            });
        });
    });
});
