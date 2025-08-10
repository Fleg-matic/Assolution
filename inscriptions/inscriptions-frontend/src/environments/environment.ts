/**
 * Configuration d'environnement pour le développement
 * Application Assolution - Inscriptions Frontend
 */

export const environment = {
  // Indicateurs d'environnement
  production: false,
  development: true,
  staging: false,

  // Informations de l'application
  appName: 'Assolution (Dev)',
  appVersion: '1.0.0-dev',
  appDescription: "Plateforme d'inscriptions sécurisée - Développement",

  // Configuration API (environnement de développement)
  apiUrl: 'http://localhost:8080',
  apiVersion: 'v1',
  apiTimeout: 30000, // 30 secondes pour le debug

  // URLs des services
  services: {
    auth: 'http://localhost:8080/v1/auth',
    inscriptions: 'http://localhost:8080/v1/inscriptions',
    users: 'http://localhost:8080/v1/users',
    admin: 'http://localhost:8080/v1/admin',
  },

  // Configuration sécurité (moins stricte en dev)
  security: {
    tokenStorageKey: 'assolution_dev_token',
    refreshTokenStorageKey: 'assolution_dev_refresh_token',
    tokenExpirationBuffer: 600000, // 10 minutes en ms
    maxLoginAttempts: 10, // Plus permissif en dev
    lockoutDuration: 300000, // 5 minutes en ms
  },

  // Configuration des cookies
  cookies: {
    domain: 'localhost',
    secure: false, // HTTP autorisé en dev
    sameSite: 'Lax',
    httpOnly: false,
  },

  // Fonctionnalités (toutes activées en dev)
  features: {
    enableRegistration: true,
    enablePasswordReset: true,
    enableTwoFactorAuth: true,
    enableFileUpload: true,
    enableNotifications: true,
    enableAnalytics: false, // Désactivé en dev
    enableChatSupport: true,
  },

  // Configuration des logs (verbose en dev)
  logging: {
    level: 'debug', // Tous les logs en dev
    enableConsoleLogging: true,
    enableRemoteLogging: false, // Pas de logs distants en dev
    remoteLogUrl: '',
  },

  // Configuration pagination
  pagination: {
    defaultPageSize: 10, // Plus petit en dev pour tester
    maxPageSize: 50,
    showSizeOptions: [5, 10, 20, 50],
  },

  // Configuration upload
  upload: {
    maxFileSize: 52428800, // 50MB en dev (plus permissif)
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt', '.csv'],
    uploadUrl: 'http://localhost:8080/v1/upload',
  },

  // Configuration cache (moins agressif en dev)
  cache: {
    enableCaching: false, // Désactivé en dev pour voir les changements
    cacheDuration: 60000, // 1 minute seulement
    maxCacheSize: 10,
  },

  // Configuration notifications
  notifications: {
    enablePushNotifications: false, // Désactivé en dev
    vapidPublicKey: 'DEV_VAPID_KEY',
    notificationApiUrl: 'http://localhost:8080/v1/notifications',
  },

  // Informations de contact (dev)
  contact: {
    supportEmail: 'dev-support@assolution.local',
    salesEmail: 'dev-commercial@assolution.local',
    phoneNumber: '+33 1 23 45 67 89',
    address: 'Environnement de développement',
  },

  // URLs externes (versions de test)
  external: {
    privacyPolicyUrl: 'http://localhost:4200/privacy',
    termsOfServiceUrl: 'http://localhost:4200/terms',
    helpUrl: 'http://localhost:4200/help',
    statusPageUrl: 'http://localhost:4200/status',
  },

  // Configuration sociale (désactivée en dev)
  social: {
    enableSocialLogin: false,
    providers: {
      google: {
        clientId: 'DEV_GOOGLE_CLIENT_ID',
        enabled: false,
      },
      microsoft: {
        clientId: 'DEV_MICROSOFT_CLIENT_ID',
        enabled: false,
      },
    },
  },

  // Métriques et analytics (désactivées en dev)
  analytics: {
    enableGoogleAnalytics: false,
    googleAnalyticsId: 'DEV_GA_ID',
    enableHotjar: false,
    hotjarId: 'DEV_HOTJAR_ID',
  },

  // Configuration monitoring (dev)
  monitoring: {
    enableErrorTracking: false,
    sentryDsn: '',
    enablePerformanceMonitoring: false,
  },

  // Timeouts (plus longs en dev pour le debug)
  timeouts: {
    httpRequestTimeout: 30000,
    fileUploadTimeout: 60000,
    longRunningOperationTimeout: 120000,
  },

  // Configuration internationalisation
  i18n: {
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en'],
    fallbackLanguage: 'fr',
  },

  // Configuration PWA (désactivée en dev)
  pwa: {
    enabled: false,
    updateCheckInterval: 60000, // 1 minute en dev
    promptUserToUpdate: false,
  },
};
