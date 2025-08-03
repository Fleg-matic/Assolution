// inscriptions/inscription-frontend/src/environments/environment.prod.ts

export const environment = {
  production: true,

  // API Configuration
  apiUrl: "http://assolution/api",
  apiTimeout: 30000,

  // Application Info
  appName: "Assolution Inscriptions",
  appVersion: "1.0.0",

  // Features Flags
  features: {
    enableRegistration: true,
    enablePayments: true,
    enableNotifications: true,
    enableAnalytics: false,
    enableDebugMode: false,
  },

  // Security
  security: {
    enableHttps: true,
    tokenStorageKey: "assolution_token",
    refreshTokenStorageKey: "assolution_refresh_token",
    tokenExpirationBuffer: 300000, // 5 minutes in ms
  },

  // UI Configuration
  ui: {
    defaultLanguage: "fr",
    availableLanguages: ["fr", "en"],
    theme: "default",
    enableDarkMode: true,
    pageSize: 20,
    maxFileSize: 10485760, // 10MB in bytes
  },

  // External Services
  stripe: {
    publishableKey: "pk_live_...", // À remplacer par votre clé Stripe de production
  },

  // Monitoring & Analytics
  monitoring: {
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    sampleRate: 0.1, // 10% sampling in production
  },

  // Cache Configuration
  cache: {
    enableServiceWorker: true,
    cacheTimeout: 3600000, // 1 hour in ms
    enableOfflineMode: false,
  },

  // Logging
  logging: {
    level: "warn", // Only warnings and errors in production
    enableConsoleLog: false,
    enableRemoteLogging: true,
    remoteLogUrl: "/api/logs",
  },

  // Timeouts & Retries
  http: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Social Auth (if needed)
  auth: {
    google: {
      clientId: "your-google-client-id.apps.googleusercontent.com",
    },
    facebook: {
      appId: "your-facebook-app-id",
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
    enablePushNotifications: true,
    vapidPublicKey: "your-vapid-public-key",
  },

  // URLs
  urls: {
    termsOfService: "/terms",
    privacyPolicy: "/privacy",
    support: "/support",
    documentation: "/docs",
  },
};
