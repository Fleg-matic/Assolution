/**
 * Configuration de l'environnement de production pour Assolution - Angular 20.1
 */
export const environment = {
  production: true,
  development: false,

  // Configuration API
  apiUrl: "http://192.168.1.22/api",
  apiTimeout: 30000, // 30 secondes

  // Configuration de l'application
  appName: "Assolution",
  appVersion: "1.0.0",

  // URLs et endpoints
  baseUrl: "http://192.168.1.22",
  assetsUrl: "/assets",

  // Configuration d'authentification
  auth: {
    tokenKey: "assolution_token",
    refreshTokenKey: "assolution_refresh_token",
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
    analytics: true,
    errorReporting: true,
    maintenanceMode: false,
  },

  // Configuration de paiement (Stripe)
  payment: {
    stripePublishableKey: "pk_test_placeholder", // À remplacer par la vraie clé
    currency: "EUR",
    country: "FR",
  },

  // Configuration des logs et monitoring
  logging: {
    level: "warn", // Production: warn, error uniquement
    enableConsoleLog: false,
    enableRemoteLogging: true,
    logEndpoint: "/api/logs",
  },

  // Configuration de performance
  performance: {
    enableServiceWorker: true,
    enableLazyLoading: true,
    enableCaching: true,
    cacheTimeout: 300000, // 5 minutes
    debounceTime: 300,
    throttleTime: 1000,
  },

  // Configuration de sécurité
  security: {
    enableCSP: true,
    enableXSRFProtection: true,
    enableHttpsRedirect: false, // À activer quand HTTPS sera configuré
    maxUploadSize: 20971520, // 20MB
    allowedFileTypes: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  },

  // Configuration de l'interface utilisateur
  ui: {
    theme: "light",
    language: "fr",
    dateFormat: "dd/MM/yyyy",
    currencyFormat: "EUR",
    timezone: "Europe/Paris",
    itemsPerPage: 20,
    maxRetries: 3,
  },

  // Configuration des notifications
  notifications: {
    position: "top-right",
    timeout: 5000,
    showProgress: true,
    enableSound: false,
    maxNotifications: 5,
  },

  // URLs de contact et support
  contact: {
    supportEmail: "support@assolution.com",
    salesEmail: "contact@assolution.com",
    phoneNumber: "+33 1 23 45 67 89",
    address: "France",
  },

  // Configuration des cookies
  cookies: {
    domain: "192.168.1.22",
    secure: false, // À activer avec HTTPS
    sameSite: "Lax",
    expires: 30, // jours
  },

  // Analytics et tracking (à configurer selon besoins)
  analytics: {
    googleAnalyticsId: "", // À configurer si nécessaire
    enableTracking: false,
    trackPageViews: false,
    trackEvents: false,
  },

  // Configuration de développement (désactivées en prod)
  debug: {
    enableDebugInfo: false,
    showApiCalls: false,
    showPerformanceMetrics: false,
    enableMockData: false,
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
    networkError: "Erreur de connexion. Vérifiez votre connexion internet.",
    serverError: "Erreur serveur. Veuillez réessayer plus tard.",
    unauthorizedError: "Session expirée. Veuillez vous reconnecter.",
    forbiddenError: "Accès non autorisé.",
    notFoundError: "Ressource introuvable.",
    validationError: "Données invalides. Vérifiez votre saisie.",
    timeoutError: "Délai d'attente dépassé. Veuillez réessayer.",
    genericError: "Une erreur inattendue s'est produite.",
  },

  // Configuration de maintenance
  maintenance: {
    enabled: false,
    message: "Maintenance en cours. Veuillez réessayer plus tard.",
    estimatedTime: "",
    contactInfo: "support@assolution.com",
  },
};
