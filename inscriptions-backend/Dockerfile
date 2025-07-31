# Multi-stage build pour optimiser
FROM maven:3.9-openjdk-21-slim AS build

WORKDIR /app

# Copier les fichiers Maven pour le cache des dépendances
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier le code source et builder
COPY src ./src
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copier le JAR depuis le stage build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=render", "-jar", "app.jar"]