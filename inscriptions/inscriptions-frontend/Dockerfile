# Frontend Dockerfile pour Development
FROM node:22-alpine

# Métadonnées
LABEL maintainer="Assolution Team"
LABEL version="1.0"
LABEL description="Assolution Frontend - Development"

# Variables d'environnement
ENV NODE_ENV=development
ENV NG_CLI_ANALYTICS=false
ENV BACKEND_URL=http://localhost:8080

# Installation des outils système
RUN apk add --no-cache \
    curl \
    bash \
    git

# Installation d'Angular CLI globalement
RUN npm install -g @angular/cli@20

# Création d'un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001 -G nodejs

# Répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration des dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci --only=production=false

# Copie du code source
COPY --chown=angular:nodejs . .

# Changement vers l'utilisateur non-root
USER angular

# Port exposé
EXPOSE 4200

# Script de démarrage pour le développement
COPY --chown=angular:nodejs <<EOF /app/start-dev.sh
#!/bin/bash
set -e

echo "🎨 Starting Assolution Frontend (Development)"
echo "📊 Node Version: \$(node --version)"
echo "📊 Angular CLI Version: \$(ng --version | head -n 1)"
echo "🔧 Environment: \${NODE_ENV}"
echo "🔗 Backend URL: \${BACKEND_URL}"

# Vérifier si le backend est accessible (optionnel en dev)
if [ ! -z "\${BACKEND_URL}" ] && [[ "\${BACKEND_URL}" != "http://localhost:8080" ]]; then
    echo "⏳ Checking backend connectivity..."
    timeout 30 bash -c 'until curl -f \${BACKEND_URL}/actuator/health 2>/dev/null; do sleep 2; done' || echo "⚠️  Backend not yet available, continuing anyway..."
fi

# Démarrer le serveur de développement
echo "🚀 Starting Angular development server..."
exec ng serve --host 0.0.0.0 --port 4200 --poll 2000 --disable-host-check
EOF

RUN chmod +x /app/start-dev.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:4200 || exit 1

# Point d'entrée
ENTRYPOINT ["/app/start-dev.sh"]