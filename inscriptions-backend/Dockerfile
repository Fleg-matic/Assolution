FROM openjdk:21-jdk-slim

WORKDIR /app

# Copier d'abord les fichiers Maven pour le cache
COPY pom.xml .
COPY src ./src

# Build du projet
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=render", "-jar", "target/*.jar"]