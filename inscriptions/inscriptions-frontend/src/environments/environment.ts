/**
 * Configuration de l'environnement de développement pour Assolution - Angular 20.1
 */
export const environment = {
  production: false,
  development: true,

  // Configuration API
  apiUrl: 'http://localhost:8080',
  apiTimeout: 60000, // 60 secondes pour le développement

  // Configuration de l'application
  appName: 'Assolution (Dev)',
  appVersion: '1.0.0-dev',

  // URLs et endpoints
  baseUrl: 'http://localhost:4200',
  assetsUrl: '/assets',

  // Configuration d'authentification
  auth: {
    tokenKey: 'assolution_dev_token',
    refreshTokenKey: 'assolution_dev_refresh_token',
    tokenExpiry: 3600000, // 1 heure
    refreshTokenExpiry: 86400000, // 24 heures
    autoRefresh: true,
    loginUrl: '/auth/login',
    logoutUrl: '/auth/logout',
    registerUrl: '/auth/register',
    profileUrl: '/auth/profile',
  },

  // Configuration des fonctionnalités
  features: {
    registration: true,
    payment: false, // Paiement désactivé en dev
    notifications: true,
    analytics: false, // Analytics désactivées en dev
    errorReporting: false,
    maintenanceMode: false,
  },

  // Configuration de paiement (Stripe) - Mode test
  payment: {
    stripePublishableKey: 'pk_test_51234567890abcdef', // Clé de test
    currency: 'EUR',
    country: 'FR',
  },

  // Configuration des logs et monitoring
  logging: {
    level: 'debug', // Développement: tous les logs
    enableConsoleLog: true,
    enableRemoteLogging: false,
    logEndpoint: '/api/logs',
  },

  // Configuration de performance
  performance: {
    enableServiceWorker: false,
    enableLazyLoading: true,
    enableCaching: false, // Cache désactivé en dev
    cacheTimeout: 60000, // 1 minute
    debounceTime: 300,
    throttleTime: 1000,
  },

  // Configuration de sécurité (plus permissive en dev)
  security: {
    enableCSP: false,
    enableXSRFProtection: false,
    enableHttpsRedirect: false,
    maxUploadSize: 52428800, // 50MB en dev
    allowedFileTypes: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.txt', '.csv'],
  },

  // Configuration de l'interface utilisateur
  ui: {
    theme: 'light',
    language: 'fr',
    dateFormat: 'dd/MM/yyyy',
    currencyFormat: 'EUR',
    timezone: 'Europe/Paris',
    itemsPerPage: 10, // Plus petit en dev pour tester
    maxRetries: 3,
  },

  // Configuration des notifications
  notifications: {
    position: 'top-right',
    timeout: 5000,
    showProgress: true,
    enableSound: false,
    maxNotifications: 5,
  },

  // URLs de contact et support
  contact: {
    supportEmail: 'dev-support@assolution.local',
    salesEmail: 'dev-commercial@assolution.local',
    phoneNumber: '+33 1 23 45 67 89',
    address: 'Environnement de développement',
  },

  // Configuration des cookies
  cookies: {
    domain: 'localhost',
    secure: false,
    sameSite: 'Lax',
    expires: 30, // jours
  },

  // Analytics et tracking (désactivées en dev)
  analytics: {
    googleAnalyticsId: 'DEV_GA_ID',
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
  },

  // Endpoints API spécifiques
  endpoints: {
    // Authentification
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',

    // Utilisateurs
    users: '/users',
    profile: '/users/profile',

    // Inscriptions
    inscriptions: '/inscriptions',
    myInscriptions: '/inscriptions/my',

    // Paiements
    payments: '/payments',
    paymentMethods: '/payments/methods',
    invoices: '/payments/invoices',

    // Fichiers
    upload: '/files/upload',
    download: '/files/download',

    // Administration
    admin: '/admin',
    stats: '/admin/stats',
    reports: '/admin/reports',

    // Système
    health: '/actuator/health',
    version: '/actuator/info',
  },

  // Messages d'erreur personnalisés
  errorMessages: {
    networkError: 'Erreur de connexion. Vérifiez votre connexion internet.',
    serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
    unauthorizedError: 'Session expirée. Veuillez vous reconnecter.',
    forbiddenError: 'Accès non autorisé.',
    notFoundError: 'Ressource introuvable.',
    validationError: 'Données invalides. Vérifiez votre saisie.',
    timeoutError: "Délai d'attente dépassé. Veuillez réessayer.",
    genericError: "Une erreur inattendue s'est produite.",
  },

  // Configuration de maintenance
  maintenance: {
    enabled: false,
    message: 'Maintenance en cours. Veuillez réessayer plus tard.',
    estimatedTime: '',
    contactInfo: 'dev-support@assolution.local',
  },
};
