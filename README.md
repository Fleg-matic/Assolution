# 🎓 Assolution - Plateforme d'Inscriptions

> Plateforme moderne d'inscriptions avec backend Spring Boot, frontend Angular et système de paiement intégré.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)
[![Angular](https://img.shields.io/badge/Angular-20-red.svg)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

## 🏗️ Architecture

```
Assolution/
├── 📱 inscriptions/
│   ├── 🔧 inscriptions-backend/     # API REST Spring Boot
│   └── 🎨 inscriptions-frontend/    # Application Angular
├── 🐳 Docker Compose              # Orchestration des services
├── 🔒 Configuration sécurisée      # Templates + GitHub Secrets
└── 🧪 Tests E2E Cypress           # Tests automatisés
```

### Stack Technique

| Composant            | Technologie    | Version  |
| -------------------- | -------------- | -------- |
| **Backend**          | Spring Boot    | 3.5.4    |
| **Frontend**         | Angular        | 20.1     |
| **Base de données**  | PostgreSQL     | 17       |
| **Runtime**          | Java           | 21       |
| **Node.js**          | Node.js        | 22       |
| **Reverse Proxy**    | Nginx          | 1.25     |
| **Tests E2E**        | Cypress        | Dernière |
| **Containerisation** | Docker Compose | v2       |

## 🚀 Installation rapide

### Prérequis

-   **Java 21** ([Télécharger](https://adoptium.net/))
-   **Node.js 22** ([Télécharger](https://nodejs.org/))
-   **Docker Desktop** ([Télécharger](https://www.docker.com/products/docker-desktop/))
-   **Git** ([Télécharger](https://git-scm.com/))

### Configuration automatique

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/Assolution.git
cd Assolution

# 2. Configuration automatique (Windows)
.\scripts\setup-local.bat

# 3. Éditer les configurations
# Remplacez toutes les valeurs ${...} par vos vraies valeurs dans :
# - .env
# - .env.prod
# - inscriptions/inscriptions-backend/src/main/resources/application.properties
# - cypress.config.js
# - etc.

# 4. Lancer l'application
docker-compose up
```

### Accès à l'application

| Service                     | URL                            | Description                   |
| --------------------------- | ------------------------------ | ----------------------------- |
| 🌐 **Application complète** | http://localhost               | Nginx + Frontend + API        |
| 🎨 **Frontend**             | http://localhost:4200          | Interface utilisateur Angular |
| 🔧 **API**                  | http://localhost:8080          | API REST Spring Boot          |
| 🗄️ **Base de données**      | localhost:5432                 | PostgreSQL                    |
| 📊 **Monitoring**           | http://localhost:8080/actuator | Spring Boot Actuator          |

## 🔒 Configuration sécurisée

Ce projet utilise un **système de templates sécurisé** :

-   ✅ **Aucun secret dans Git**
-   ✅ **Templates versionnés** (`config-templates/`)
-   ✅ **GitHub Secrets** pour le déploiement
-   ✅ **Script de récupération** automatique

### Fichiers de configuration

```
config-templates/
├── .env.template                     # Variables d'environnement
├── .env.prod.template               # Variables production
├── application.properties.template  # Config Spring Boot dev
├── application-prod.properties.template # Config Spring Boot prod
├── cypress.config.js.template       # Configuration des tests
├── 01-init-db.sql.template         # Script d'initialisation DB
└── environment.prod.ts.template     # Environment Angular prod
```

## 🧪 Tests

### Tests unitaires

```bash
# Backend
cd inscriptions/inscriptions-backend
mvn test

# Frontend
cd inscriptions/inscriptions-frontend
npm test
```

### Tests E2E avec Cypress

```bash
# Interface graphique
npx cypress open

# Mode headless
npx cypress run
```

## 🚀 Déploiement

### Développement

```bash
# Démarrage rapide
docker-compose up

# Ou service par service
docker-compose up postgres     # Base de données seulement
docker-compose up backend      # + API
docker-compose up frontend     # + Interface
```

### Production

```bash
# Build et démarrage production
docker-compose -f docker-compose.prod.yml up -d

# Avec backup automatique
docker-compose -f docker-compose.prod.yml up backup
```

### CI/CD

Le projet inclut des **GitHub Actions** pour :

-   ✅ **Tests automatiques** (backend + frontend)
-   ✅ **Analyse de code** (SonarQube)
-   ✅ **Déploiement automatique** (dev + prod)
-   ✅ **Tests E2E** intégrés
-   ✅ **Scan de sécurité** (Trivy)

## 📊 Fonctionnalités

### 👤 Gestion des utilisateurs

-   Inscription et connexion sécurisées
-   Authentification JWT
-   Gestion des rôles et permissions
-   Profils utilisateurs complets

### 📝 Système d'inscriptions

-   Création et gestion d'événements
-   Inscription en ligne avec validation
-   Suivi des participants
-   Notifications automatiques

### 💳 Paiements

-   Intégration **Stripe** sécurisée
-   Paiements en ligne
-   Gestion des factures
-   Historique des transactions

### 📊 Administration

-   Tableau de bord administrateur
-   Statistiques en temps réel
-   Export des données
-   Gestion des configurations

### 🔒 Sécurité

-   Authentification JWT sécurisée
-   Validation des données
-   Protection CSRF
-   Chiffrement des données sensibles
-   Logs d'audit complets

## 🛠️ Développement

### Structure du projet

```
inscriptions/
├── inscriptions-backend/
│   ├── src/main/java/com/assolution/
│   │   ├── controller/          # Contrôleurs REST
│   │   ├── service/             # Logique métier
│   │   ├── repository/          # Accès aux données
│   │   ├── model/               # Entités JPA
│   │   ├── config/              # Configuration Spring
│   │   └── security/            # Sécurité JWT
│   └── src/test/                # Tests unitaires
└── inscriptions-frontend/
    ├── src/app/
    │   ├── components/          # Composants Angular
    │   ├── services/            # Services Angular
    │   ├── models/              # Modèles TypeScript
    │   ├── guards/              # Guards de route
    │   └── interceptors/        # Intercepteurs HTTP
    └── cypress/e2e/             # Tests E2E
```

### Base de données

```sql
-- Schémas principaux
assolution/
├── users/                    # Gestion des utilisateurs
├── events/                   # Événements et inscriptions
├── payments/                 # Transactions financières
├── audit_log/               # Logs d'audit
└── user_sessions/           # Sessions JWT
```

### API REST

| Endpoint         | Méthode   | Description              |
| ---------------- | --------- | ------------------------ |
| `/auth/login`    | POST      | Connexion utilisateur    |
| `/auth/register` | POST      | Inscription utilisateur  |
| `/users/profile` | GET       | Profil utilisateur       |
| `/events`        | GET, POST | Gestion des événements   |
| `/inscriptions`  | GET, POST | Gestion des inscriptions |
| `/payments`      | POST      | Traitement des paiements |
| `/admin/stats`   | GET       | Statistiques admin       |

## 🐳 Docker

### Services

```yaml
services:
    postgres: # Base de données PostgreSQL 17
    backend: # API Spring Boot (Java 21)
    frontend: # Application Angular (Node 22)
    nginx: # Reverse proxy et load balancer
```

### Volumes persistants

```yaml
volumes:
    postgres_data: # Données de la base
    logs: # Logs applicatifs
    backups: # Sauvegardes automatiques
```

## 📚 Documentation

### Guides

-   [🔧 Guide d'installation](docs/INSTALLATION.md)
-   [🚀 Guide de déploiement](docs/DEPLOYMENT.md)
-   [🔒 Guide de sécurité](docs/SECURITY.md)
-   [🧪 Guide des tests](docs/TESTING.md)

### API

-   [📖 Documentation Swagger](http://localhost:8080/swagger-ui.html)
-   [🔍 OpenAPI Spec](http://localhost:8080/v3/api-docs)

## 🤝 Contribution

1. **Fork** le projet
2. Créez une **branche feature** (`git checkout -b feature/amazing-feature`)
3. **Committez** vos changements (`git commit -m 'Add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une **Pull Request**

### Standards de code

-   ☕ **Backend** : Google Java Style Guide
-   🅰️ **Frontend** : Angular Style Guide
-   🧪 **Tests** : Coverage minimum 80%
-   📝 **Commits** : Conventional Commits

## 📞 Support

### Contacts

-   📧 **Support technique** : support@assolution.com
-   💼 **Commercial** : contact@assolution.com
-   📞 **Téléphone** : +33 1 23 45 67 89

### Issues

Pour signaler un bug ou proposer une fonctionnalité :

1. Vérifiez les [issues existantes](https://github.com/votre-username/Assolution/issues)
2. Créez une [nouvelle issue](https://github.com/votre-username/Assolution/issues/new)
3. Utilisez les templates fournis

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🏆 Remerciements

-   [Spring Boot](https://spring.io/projects/spring-boot) - Framework backend
-   [Angular](https://angular.io/) - Framework frontend
-   [PostgreSQL](https://www.postgresql.org/) - Base de données
-   [Docker](https://www.docker.com/) - Containerisation
-   [Stripe](https://stripe.com/) - Paiements en ligne
-   [Cypress](https://www.cypress.io/) - Tests E2E

---

<div align="center">
  <strong>Fait avec ❤️ pour la communauté</strong>
</div>
