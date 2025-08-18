/**
 * Configuration de l'environnement LOCAL pour Assolution
 * 📝 Ce fichier est utilisé UNIQUEMENT pour le développement local
 * 🚀 En production/CI, environment.ts est généré automatiquement via templates
 */
export const environment = {
  production: false,
  development: true,
  showEnvironmentBanner: true, // ✅ Toujours visible en local

  // Configuration API locale
  apiUrl: 'http://localhost:8080',
  apiTimeout: 60000,

  // Configuration de l'application
  appName: 'Assolution (Local Dev)',
  appVersion: '1.0.0-local',

  // URLs et endpoints
  baseUrl: 'http://localhost:4200',
  assetsUrl: '/assets',

  // Configuration d'authentification
  auth: {
    tokenKey: 'assolution_local_token',
    refreshTokenKey: 'assolution_local_refresh_token',
    tokenExpiry: 3600000,
    refreshTokenExpiry: 86400000,
    autoRefresh: true,
    loginUrl: '/auth/login',
    logoutUrl: '/auth/logout',
    registerUrl: '/auth/register',
    profileUrl: '/auth/profile',
  },

  // Configuration des fonctionnalités (permissive pour le dev local)
  features: {
    registration: true,
    payment: false,
    notifications: true,
    analytics: false,
    errorReporting: false,
    maintenanceMode: false,
  },

  // Configuration de paiement - Clés de test Stripe
  payment: {
    stripePublishableKey: 'pk_test_local_development_key',
    currency: 'EUR',
    country: 'FR',
  },

  // Configuration des logs (debug complet en local)
  logging: {
    level: 'debug',
    enableConsoleLog: true,
    enableRemoteLogging: false,
    logEndpoint: '/api/logs',
  },

  // Configuration de performance (optimisée pour le dev)
  performance: {
    enableServiceWorker: false,
    enableLazyLoading: true,
    enableCaching: false,
    cacheTimeout: 60000,
    debounceTime: 300,
    throttleTime: 1000,
  },

  // Configuration de sécurité (permissive en local)
  security: {
    enableCSP: false,
    enableXSRFProtection: false,
    enableHttpsRedirect: false,
    maxUploadSize: 52428800,
    allowedFileTypes: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.txt', '.csv'],
  },

  // Configuration de l'interface utilisateur
  ui: {
    theme: 'light',
    language: 'fr',
    dateFormat: 'dd/MM/yyyy',
    currencyFormat: 'EUR',
    timezone: 'Europe/Paris',
    itemsPerPage: 10,
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

  // URLs de contact (développement local)
  contact: {
    supportEmail: 'dev@localhost',
    salesEmail: 'sales@localhost',
    phoneNumber: '+33 1 23 45 67 89',
    address: 'Développement local',
  },

  // Configuration des cookies (local)
  cookies: {
    domain: 'localhost',
    secure: false,
    sameSite: 'Lax',
    expires: 30,
  },

  // Analytics (désactivées en local)
  analytics: {
    googleAnalyticsId: 'LOCAL_DEV',
    enableTracking: false,
    trackPageViews: false,
    trackEvents: false,
  },

  // Configuration de développement (toutes activées)
  debug: {
    enableDebugInfo: true,
    showApiCalls: true,
    showPerformanceMetrics: true,
    enableMockData: true,
  },

  // Endpoints API
  endpoints: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    users: '/users',
    profile: '/users/profile',
    inscriptions: '/inscriptions',
    myInscriptions: '/inscriptions/my',
    payments: '/payments',
    paymentMethods: '/payments/methods',
    invoices: '/payments/invoices',
    upload: '/files/upload',
    download: '/files/download',
    admin: '/admin',
    stats: '/admin/stats',
    reports: '/admin/reports',
    health: '/actuator/health',
    version: '/actuator/info',
  },

  // Messages d'erreur
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
    contactInfo: 'dev@localhost',
  },
};
