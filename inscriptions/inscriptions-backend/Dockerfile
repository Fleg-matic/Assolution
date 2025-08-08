# inscriptions/inscriptions-backend/Dockerfile (Development)

# Backend Dockerfile pour Development
FROM eclipse-temurin:21-jdk as builder

# Métadonnées
LABEL maintainer="Assolution Team"
LABEL version="1.0"
LABEL description="Assolution Backend - Development"

# Variables d'environnement
ENV JAVA_HOME=/usr/local/openjdk-21
ENV SPRING_PROFILES_ACTIVE=dev
ENV SERVER_PORT=8080

# Installation des outils nécessaires
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Création du répertoire de travail
WORKDIR /app

# Copie du fichier Maven wrapper et pom.xml pour cache des dépendances
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Téléchargement des dépendances (mise en cache Docker)
RUN ./mvnw dependency:go-offline -B

# Copie du code source
COPY src/ ./src/

# Construction de l'application
RUN ./mvnw clean package -DskipTests

# Création d'un utilisateur non-root
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Port exposé
EXPOSE 8080

# Script de démarrage avec health check
COPY --chown=appuser:appuser <<EOF /app/start.sh
#!/bin/bash
set -e

echo "🚀 Starting Assolution Backend (Development)"
echo "📊 Java Version: \$(java -version 2>&1 | head -n 1)"
echo "🔧 Active Profile: \${SPRING_PROFILES_ACTIVE}"
echo "💾 Database Host: \${DB_HOST}"

# Attendre que la base de données soit prête
echo "⏳ Waiting for database..."
while ! nc -z \${DB_HOST:-postgres} \${DB_PORT:-5432}; do
  sleep 1
done
echo "✅ Database is ready!"

# Démarrer l'application
exec java \
  -Djava.security.egd=file:/dev/./urandom \
  -Dspring.profiles.active=\${SPRING_PROFILES_ACTIVE:-dev} \
  -jar target/*.jar
EOF

RUN chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Point d'entrée
ENTRYPOINT ["/app/start.sh"]