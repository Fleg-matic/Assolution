# Frontend Dockerfile pour Development - Build statique
FROM node:22-alpine AS builder

ENV NODE_ENV=development
ENV NG_CLI_ANALYTICS=false

# Installation des outils
RUN apk add --no-cache git python3 make g++ curl bash gettext

WORKDIR /build

# ✅ CORRIGÉ: Copier les package files depuis le bon contexte
COPY inscriptions/inscriptions-frontend/package.json inscriptions/inscriptions-frontend/package-lock.json ./

# Vérifier les fichiers
RUN ls -la package*.json

# Installation des dépendances
RUN npm ci --no-audit --no-fund

# Copier le template d'environnement dev si disponible
RUN if [ -f config-templates/environment.ts.template ]; then \
      cp config-templates/environment.ts.template /tmp/environment.ts.template; \
    else \
      echo "No dev template found"; \
    fi

# Copier le code source
COPY inscriptions/inscriptions-frontend/ .

# ✅ Générer environment.ts pour dev
RUN echo "🔧 Setting up development environment..." && \
    if [ -f "/tmp/environment.ts.template" ]; then \
        echo "📋 Using template for development environment..." && \
        export FRONTEND_API_URL="${FRONTEND_API_URL:-http://localhost:8080}" && \
        export FRONTEND_BASE_URL="${FRONTEND_BASE_URL:-http://localhost:4200}" && \
        export STRIPE_PUBLISHABLE_KEY="${STRIPE_PUBLISHABLE_KEY:-pk_test_placeholder}" && \
        export ENABLE_ANALYTICS="${ENABLE_ANALYTICS:-false}" && \
        export ENABLE_HTTPS_REDIRECT="${ENABLE_HTTPS_REDIRECT:-false}" && \
        export SUPPORT_EMAIL="${SUPPORT_EMAIL:-dev-support@assolution.local}" && \
        export SALES_EMAIL="${SALES_EMAIL:-dev-sales@assolution.local}" && \
        export SUPPORT_PHONE="${SUPPORT_PHONE:-+33 1 23 45 67 89}" && \
        export COOKIE_DOMAIN="${COOKIE_DOMAIN:-localhost}" && \
        export COOKIE_SECURE="${COOKIE_SECURE:-false}" && \
        export GOOGLE_ANALYTICS_ID="${GOOGLE_ANALYTICS_ID:-}" && \
        envsubst < /tmp/environment.ts.template > src/environments/environment.ts; \
    elif [ ! -f "src/environments/environment.ts" ]; then \
        echo "⚠️ Creating basic development environment..." && \
        echo 'export const environment = {' > src/environments/environment.ts && \
        echo '  production: false,' >> src/environments/environment.ts && \
        echo '  development: true,' >> src/environments/environment.ts && \
        echo "  apiUrl: 'http://localhost:8080'," >> src/environments/environment.ts && \
        echo "  baseUrl: 'http://localhost:4200'," >> src/environments/environment.ts && \
        echo "  appName: 'Assolution (Dev)'," >> src/environments/environment.ts && \
        echo "  appVersion: '1.0.0-dev'" >> src/environments/environment.ts && \
        echo '};' >> src/environments/environment.ts; \
    fi && \
    echo "✅ Environment configured for development"

# Build Angular pour dev (production build mais avec config dev)
RUN echo "🎨 Building Angular application for development..." && \
    npm run build:dev && \
    echo "🔍 Checking if showEnvironmentBanner exists in build:" && \
    grep -r "showEnvironmentBanner" dist/ || echo "❌ showEnvironmentBanner not found in build" && \
    echo "✅ Angular dev build completed!"

# Vérification et copie des fichiers
RUN echo "📦 Preparing build artifacts..." && \
    mkdir -p /build/final_dist && \
    if [ -f "/build/dist/inscriptions-frontend/browser/index.html" ]; then \
        echo "✅ Angular 20+ structure detected (browser/)" && \
        cp -r /build/dist/inscriptions-frontend/browser/* /build/final_dist/; \
    elif [ -f "/build/dist/browser/index.html" ]; then \
        echo "✅ Angular 20+ structure detected (browser/)" && \
        cp -r /build/dist/browser/* /build/final_dist/; \
    elif [ -f "/build/dist/inscriptions-frontend/index.html" ]; then \
        echo "✅ Legacy Angular structure detected" && \
        cp -r /build/dist/inscriptions-frontend/* /build/final_dist/; \
    elif [ -f "/build/dist/index.html" ]; then \
        echo "✅ Simple dist structure detected" && \
        cp -r /build/dist/* /build/final_dist/; \
    else \
        echo "❌ No build output found!" && \
        echo "📁 Available structure:" && \
        find /build/dist -type f -name "*.html" 2>/dev/null || echo "No HTML files found" && \
        exit 1; \
    fi && \
    echo "✅ Dev build artifacts ready"

# Stage final pour dev
FROM alpine:3.19 AS production

RUN apk add --no-cache curl bash && \
    mkdir -p /app/dist

# Copier les fichiers buildés
COPY --from=builder /build/final_dist/ /app/dist/

# Vérification
RUN echo "🔍 Development build verification:" && \
    echo "📊 Files: $(find /app/dist -type f | wc -l)" && \
    echo "📊 Size: $(du -sh /app/dist | cut -f1)" && \
    ls -la /app/dist/index.html && echo "✅ index.html OK" || echo "❌ index.html missing"

# Script simple pour dev
RUN echo '#!/bin/bash' > /app/dev-verify.sh && \
    echo 'echo "🎨 Assolution Frontend - Development Build Ready"' >> /app/dev-verify.sh && \
    echo 'echo "📅 Built: $(date)"' >> /app/dev-verify.sh && \
    echo 'echo "📊 Files: $(find /app/dist -type f | wc -l)"' >> /app/dev-verify.sh && \
    echo 'ls -la /app/dist/' >> /app/dev-verify.sh && \
    echo 'echo "✅ Development frontend ready for nginx"' >> /app/dev-verify.sh && \
    echo 'tail -f /dev/null' >> /app/dev-verify.sh && \
    chmod +x /app/dev-verify.sh

WORKDIR /app
CMD ["/app/dev-verify.sh"]