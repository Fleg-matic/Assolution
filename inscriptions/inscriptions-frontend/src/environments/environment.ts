/**
 * Configuration de l'environnement de développement pour Assolution - Angular 20.1
 * Ce fichier sera remplacé lors du build par environment.prod.ts en mode production
 */
export const environment = {
  production: false,
  development: true,

  // Configuration API
  apiUrl: "http://localhost:8080/api",
  apiTimeout: 10000, // 10 secondes (plus long en dev pour le debug)

  // Configuration de l'application
  appName: "Assolution (Dev)",
  appVersion: "1.0.0-dev",

  // URLs et endpoints
  baseUrl: "http://localhost:4200",
  assetsUrl: "/assets",

  // Configuration d'authentification
  auth: {
    tokenKey: "assolution_token_dev",
    refreshTokenKey: "assolution_refresh_token_dev",
    tokenExpiry: 3600000, // 1 heure
    refreshTokenExpiry: 86400000, // 24 heures
    autoRefresh: true,
    loginUrl: "/auth/login",
    logoutUrl: "/auth/logout",
    registerUrl: "/auth/register",
    profileUrl: "/auth/profile",
  },

  // Configuration des fonctionnalités
  features: {
    registration: true,
    payment: true,
    notifications: true,
    analytics: false, // Désactivé en dev
    errorReporting: false, // Désactivé en dev
    maintenanceMode: false,
    mockData: true, // Activé en dev pour les tests
    debugMode: true, // Activé en dev
  },

  // Configuration de paiement (Stripe)
  payment: {
    stripePublishableKey: "pk_test_placeholder", // Clé de test
    currency: "EUR",
    country: "FR",
  },

  // Configuration des logs et monitoring
  logging: {
    level: "debug", // Niveau debug en développement
    enableConsoleLog: true,
    enableRemoteLogging: false, // Pas de logs distants en dev
    logEndpoint: "/api/logs",
  },

  // Configuration de performance
  performance: {
    enableServiceWorker: false, // Désactivé en dev
    enableLazyLoading: false, // Désactivé en dev pour faciliter le debug
    enableCaching: false, // Pas de cache en dev
    cacheTimeout: 0,
    debounceTime: 100, // Plus court en dev
    throttleTime: 500, // Plus court en dev
  },

  // Configuration de sécurité (relaxée en dev)
  security: {
    enableCSP: false, // Désactivé en dev
    enableXSRFProtection: false, // Désactivé en dev
    enableHttpsRedirect: false,
    maxUploadSize: 10485760, // 10MB
    allowedFileTypes: [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".doc",
      ".docx",
      ".txt",
      ".csv",
    ],
  },

  // Configuration de l'interface utilisateur
  ui: {
    theme: "light",
    language: "fr",
    dateFormat: "dd/MM/yyyy",
    currencyFormat: "EUR",
    timezone: "Europe/Paris",
    itemsPerPage: 10, // Moins d'éléments en dev pour tester la pagination
    maxRetries: 5, // Plus de tentatives en dev
    showDebugInfo: true, // Affichage des infos de debug
  },

  // Configuration des notifications
  notifications: {
    position: "top-right",
    timeout: 8000, // Plus long en dev
    showProgress: true,
    enableSound: false,
    maxNotifications: 10, // Plus de notifications en dev
  },

  // URLs de contact et support
  contact: {
    supportEmail: "dev@assolution.local",
    salesEmail: "contact@assolution.local",
    phoneNumber: "+33 1 23 45 67 89",
    address: "Environnement de développement",
  },

  // Configuration des cookies
  cookies: {
    domain: "localhost",
    secure: false, // HTTP en dev
    sameSite: "Lax",
    expires: 1, // 1 jour en dev
  },

  // Analytics et tracking (désactivés en dev)
  analytics: {
    googleAnalyticsId: "", // Pas d'analytics en dev
    enableTracking: false,
    trackPageViews: false,
    trackEvents: false,
  },

  // Configuration de développement (activées)
  debug: {
    enableDebugInfo: true,
    showApiCalls: true,
    showPerformanceMetrics: true,
    enableMockData: true,
    showRouterOutlets: true,
    enableReduxDevTools: true,
  },

  // Endpoints API spécifiques
  endpoints: {
    // Authentification
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    refreshToken: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",

    // Utilisateurs
    users: "/users",
    profile: "/users/profile",

    // Inscriptions
    inscriptions: "/inscriptions",
    myInscriptions: "/inscriptions/my",

    // Paiements
    payments: "/payments",
    paymentMethods: "/payments/methods",
    invoices: "/payments/invoices",

    // Fichiers
    upload: "/files/upload",
    download: "/files/download",

    // Administration
    admin: "/admin",
    stats: "/admin/stats",
    reports: "/admin/reports",

    // Système
    health: "/actuator/health",
    version: "/actuator/info",
  },

  // Messages d'erreur personnalisés
  errorMessages: {
    networkError:
      "[DEV] Erreur de connexion. Vérifiez que le backend est démarré sur le port 8080.",
    serverError: "[DEV] Erreur serveur. Consultez les logs du backend.",
    unauthorizedError: "[DEV] Session expirée. Reconnectez-vous.",
    forbiddenError: "[DEV] Accès non autorisé. Vérifiez vos permissions.",
    notFoundError: "[DEV] Ressource introuvable. Vérifiez l'URL.",
    validationError:
      "[DEV] Données invalides. Vérifiez les champs du formulaire.",
    timeoutError:
      "[DEV] Délai d'attente dépassé. Le backend met du temps à répondre.",
    genericError:
      "[DEV] Erreur inattendue. Consultez la console du navigateur.",
  },

  // Configuration de maintenance
  maintenance: {
    enabled: false,
    message: "Maintenance en cours sur l'environnement de développement.",
    estimatedTime: "",
    contactInfo: "dev@assolution.local",
  },

  // Configuration spécifique au développement
  devTools: {
    enableHotReload: true,
    enableSourceMaps: true,
    enableVerboseLogging: true,
    apiMocking: {
      enabled: false, // À activer si vous voulez mocker l'API
      delay: 500, // Délai simulé pour les appels API
      failureRate: 0, // Taux d'échec simulé (0 = pas d'échec)
    },
    testingMode: {
      enabled: false,
      autoLogin: false,
      defaultUser: {
        email: "test@assolution.local",
        password: "TestPassword123!",
      },
    },
  },

  // Configuration pour les tests E2E
  e2e: {
    selectors: {
      useDataCy: true, // Utilise data-cy pour les sélecteurs Cypress
      prefix: "assolution",
    },
    timeouts: {
      default: 10000,
      api: 5000,
      navigation: 3000,
    },
  },
};
