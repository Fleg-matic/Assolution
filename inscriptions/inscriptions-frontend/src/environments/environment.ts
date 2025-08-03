// inscriptions/inscription-frontend/src/environments/environment.ts

export const environment = {
  production: false,

  // API Configuration
  apiUrl: "http://localhost:8080/api",
  apiTimeout: 30000,

  // Application Info
  appName: "Assolution Inscriptions",
  appVersion: "1.0.0-dev",

  // Features Flags
  features: {
    enableRegistration: true,
    enablePayments: true,
    enableNotifications: true,
    enableAnalytics: false,
    enableDebugMode: true,
  },

  // Security
  security: {
    enableHttps: false,
    tokenStorageKey: "assolution_token_dev",
    refreshTokenStorageKey: "assolution_refresh_token_dev",
    tokenExpirationBuffer: 300000, // 5 minutes in ms
  },

  // UI Configuration
  ui: {
    defaultLanguage: "fr",
    availableLanguages: ["fr", "en"],
    theme: "default",
    enableDarkMode: true,
    pageSize: 10, // Smaller for dev
    maxFileSize: 10485760, // 10MB in bytes
  },

  // External Services
  stripe: {
    publishableKey: "pk_test_...", // Clé de test Stripe
  },

  // Monitoring & Analytics
  monitoring: {
    enableErrorReporting: true,
    enablePerformanceMonitoring: false, // Disabled in dev
    sampleRate: 1.0, // 100% sampling in dev
  },

  // Cache Configuration
  cache: {
    enableServiceWorker: false, // Disabled in dev
    cacheTimeout: 300000, // 5 minutes in dev
    enableOfflineMode: false,
  },

  // Logging
  logging: {
    level: "debug", // Verbose logging in dev
    enableConsoleLog: true,
    enableRemoteLogging: false, // Disabled in dev
    remoteLogUrl: "/api/logs",
  },

  // Timeouts & Retries
  http: {
    timeout: 30000,
    retryAttempts: 1, // Less retries in dev
    retryDelay: 500,
  },

  // Social Auth (if needed)
  auth: {
    google: {
      clientId: "your-google-client-id-dev.apps.googleusercontent.com",
    },
    facebook: {
      appId: "your-facebook-app-id-dev",
    },
  },

  // File Upload
  upload: {
    maxFileSize: 10485760, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
    uploadUrl: "/api/files/upload",
  },

  // Notifications
  notifications: {
    enablePushNotifications: false, // Disabled in dev
    vapidPublicKey: "your-vapid-public-key-dev",
  },

  // URLs
  urls: {
    termsOfService: "/terms",
    privacyPolicy: "/privacy",
    support: "/support",
    documentation: "/docs",
  },
};
