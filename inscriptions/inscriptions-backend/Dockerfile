# Backend Dockerfile pour Development - Corrigé
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# ✅ CORRIGÉ: Copier depuis le contexte racine
COPY config-templates/ ../config-templates/
COPY inscriptions/inscriptions-backend/pom.xml .
COPY inscriptions/inscriptions-backend/src ./src

# Vérifier la structure du projet
RUN echo "🔍 Project structure:" && \
    ls -la . && \
    echo "📄 Maven version:" && \
    mvn --version

# ✅ UTILISER LE TEMPLATE si disponible, sinon utiliser le fichier existant
RUN echo "📋 Setting up application.properties..." && \
    if [ -f "../config-templates/application.properties.template" ]; then \
        echo "✅ Template found, copying from config-templates..." && \
        cp ../config-templates/application.properties.template src/main/resources/application.properties; \
    elif [ -f "src/main/resources/application.properties" ]; then \
        echo "✅ Using existing application.properties"; \
    else \
        echo "⚠️ No configuration found, creating basic one..." && \
        echo "spring.application.name=assolution-backend" > src/main/resources/application.properties && \
        echo "server.port=8080" >> src/main/resources/application.properties; \
    fi

# Build optimisé pour dev
RUN echo "🔨 Building with Maven (dev)..." && \
    mvn clean package -DskipTests --batch-mode --no-transfer-progress

# Trouver et copier le JAR
RUN echo "📦 Checking build artifacts:" && \
    ls -la target/ && \
    JAR_FILE=$(find target/ -name "*.jar" -not -name "*-sources.jar" -not -name "*-javadoc.jar" | head -1) && \
    echo "✅ Found JAR: $JAR_FILE" && \
    cp "$JAR_FILE" /build/app.jar

# Stage final
FROM eclipse-temurin:21-jre-jammy

# Installation des outils essentiels avec retry
RUN for i in 1 2 3; do \
        apt-get update && \
        apt-get install -y --no-install-recommends tini curl netcat-openbsd && \
        rm -rf /var/lib/apt/lists/* && \
        apt-get clean && break || \
        (echo "Attempt $i failed, retrying..." && sleep 10); \
    done

# Créer utilisateur non-root
RUN groupadd -g 1001 appuser && \
    useradd -r -u 1001 -g appuser appuser

# Créer répertoires
WORKDIR /app
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app && \
    chmod -R 755 /app

# Copier le JAR
COPY --from=builder --chown=appuser:appuser /build/app.jar /app/app.jar

# Script de démarrage dev
COPY --chown=appuser:appuser <<EOF /app/start-dev.sh
#!/bin/bash
set -e

echo "🚀 Starting Assolution Backend (Development)"
echo "📊 Java Version: \$(java -version 2>&1 | head -1)"
echo "🔧 Active Profile: \${SPRING_PROFILES_ACTIVE:-dev}"
echo "💾 Database Host: \${DB_HOST:-postgres}"

# Variables pour dev
echo "🔍 Environment variables:"
echo "DB_HOST: \${DB_HOST:-NOT_SET}"
echo "DB_USER: \${DB_USER:-NOT_SET}"
echo "JWT_SECRET: \${JWT_SECRET:+SET}"

# Attendre la base de données
echo "⏳ Waiting for database..."
TIMEOUT=60
COUNT=0
while ! timeout 3 nc -z \${DB_HOST:-postgres} \${DB_PORT:-5432} 2>/dev/null; do 
    COUNT=\$((COUNT + 1))
    if [ \$COUNT -gt \$TIMEOUT ]; then
        echo "❌ Database timeout after \${TIMEOUT} seconds"
        exit 1
    fi
    echo "Waiting... (\$COUNT/\$TIMEOUT)"
    sleep 1
done
echo "✅ Database ready!"

# Démarrer l'application
echo "🚀 Starting Spring Boot application..."
exec java \${JAVA_OPTS:-"-Xmx256m -Xms128m"} \\
    -Djava.security.egd=file:/dev/./urandom \\
    -Dspring.profiles.active=\${SPRING_PROFILES_ACTIVE:-dev} \\
    -Dserver.port=\${SERVER_PORT:-8080} \\
    -jar /app/app.jar
EOF

RUN chmod +x /app/start-dev.sh

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["tini", "--", "/app/start-dev.sh"]