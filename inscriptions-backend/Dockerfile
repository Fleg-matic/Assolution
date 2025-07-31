FROM openjdk:21-jdk

WORKDIR /app

# Installer Maven
RUN apt-get update && apt-get install -y maven

# Copier et builder
COPY . .
RUN mvn clean package -DskipTests

EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=render", "-jar", "target/*.jar"]