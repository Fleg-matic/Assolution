# 🚀 Assolution - Plateforme d'Inscriptions

Une plateforme complète d'inscriptions développée avec **Spring Boot 3.5.4**, **Angular 20.1**, **PostgreSQL 17** et déployée avec **Docker** sur **Oracle Linux 9**.

## 📋 Table des matières

- [🏗️ Architecture](#architecture)
- [🔧 Prérequis](#prérequis)
- [🚀 Installation et déploiement](#installation-et-déploiement)
- [📱 Utilisation](#utilisation)
- [🧪 Tests](#tests)
- [📊 Monitoring](#monitoring)
- [🔒 Sécurité](#sécurité)
- [🤝 Contribution](#contribution)

## 🏗️ Architecture

### Stack technique

| Composant            | Technologie             | Version    |
| -------------------- | ----------------------- | ---------- |
| **Backend**          | Spring Boot + Java      | 3.5.4 + 21 |
| **Frontend**         | Angular + TypeScript    | 20.1       |
| **Base de données**  | PostgreSQL              | 17         |
| **Runtime**          | Node.js                 | 22         |
| **Conteneurisation** | Docker + Docker Compose | Latest     |
| **Reverse Proxy**    | Nginx                   | 1.25       |
| **OS Serveur**       | Oracle Linux            | 9          |

### Architecture des services

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   Angular 20.1  │    │   Spring Boot   │    │   PostgreSQL    │
│   Port: 4200    │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │     Nginx       │
                    │   Port: 80/443  │
                    │  Reverse Proxy  │
                    └─────────────────┘
```

## 🔧 Prérequis

### Sur votre machine de développement

- **Git** (pour cloner le repository)
- **Accès SSH** à la VM (clé SSH configurée)

### Sur la VM (Oracle Linux 9)

- **Docker** et **Docker Compose** ✅ (déjà installé)
- **Utilisateur**: `dbm` ✅
- **IP**: `192.168.1.22` ✅

### GitHub Secrets configurés

- `SSH_HOST`: `192.168.1.22` ✅
- `SSH_USER`: `dbm` ✅
- `SSH_KEY`: Votre clé privée SSH ✅
- `DB_PASSWORD`: `Assolution2025!` ✅
- `JWT_SECRET`: `productionSecretKeyChangeThisToAVerySecureRandomString123456789` ✅
- `STRIPE_SECRET_KEY`: `sk_test_placeholder` ✅
- `EMAIL_API_KEY`: `placeholder_email_key` ✅

## 🚀 Installation et déploiement

### Déploiement automatique via CI/CD

Le projet utilise **GitHub Actions** pour un déploiement automatique :

#### 🔄 Environnement de développement (branche `develop`)

```bash
git push origin develop
```

- ✅ Tests automatiques (backend + frontend)
- ✅ Tests E2E avec Cypress
- ✅ Analyse SonarQube
- ✅ Déploiement sur `http://192.168.1.22`

#### 🏭 Environnement de production (branche `master`)

```bash
git push origin master
```

- ✅ Suite de tests complète
- ✅ Scan de sécurité avec Trivy
- ✅ Sauvegarde automatique de la DB
- ✅ Déploiement en rolling update
- ✅ Health checks avancés

### Déploiement manuel (si nécessaire)

```bash
# 1. Cloner le repository
git clone https://github.com/Fleg-matic/Assolution.git
cd Assolution

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 3. Déployer en développement
docker-compose up -d --build

# 4. Déployer en production
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📱 Utilisation

### URLs d'accès

| Environnement         | URL                                     | Description                      |
| --------------------- | --------------------------------------- | -------------------------------- |
| **Application**       | http://192.168.1.22                     | Interface utilisateur principale |
| **API**               | http://192.168.1.22/api                 | API REST Backend                 |
| **Documentation API** | http://192.168.1.22/api/swagger-ui      | Swagger UI                       |
| **Health Check**      | http://192.168.1.22/api/actuator/health | État des services                |
| **Base de données**   | http://192.168.1.22:8081                | Adminer (dev uniquement)         |

### Fonctionnalités principales

- 👤 **Authentification JWT** avec refresh tokens
- 📝 **Gestion des inscriptions**
- 💳 **Paiements Stripe** (mode sandbox)
- 📧 **Notifications par email**
- 📊 **Dashboard administrateur**
- 📱 **Interface responsive**
- 🔒 **Sécurité avancée** (CORS, CSRF, rate limiting)

## 🧪 Tests

### Tests automatisés dans le CI/CD

#### Backend (Spring Boot)

```bash
# Tests unitaires
mvn test

# Tests d'intégration avec TestContainers
mvn verify

# Couverture de code
mvn jacoco:report
```

#### Frontend (Angular)

```bash
# Tests unitaires
npm run test:ci

# Linting
npm run lint

# Build de production
npm run build:prod
```

#### Tests E2E (Cypress)

```bash
# Tests end-to-end
npx cypress run

# Interface interactive (développement)
npx cypress open
```

### Exécution manuelle des tests

```bash
# Tests backend uniquement
cd inscriptions/inscription-backend
mvn clean test

# Tests frontend uniquement
cd inscriptions/inscription-frontend
npm test

# Tests E2E complets
npm run e2e
```

## 📊 Monitoring

### Health Checks automatiques

- ✅ **API Backend**: `/api/actuator/health`
- ✅ **Base de données**: `/api/actuator/health/db`
- ✅ **Frontend**: `/health`
- ✅ **Métriques**: `/api/actuator/metrics`

### Logs centralisés

```bash
# Logs de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# Logs sur la VM
ssh dbm@192.168.1.22
cd /home/dbm/assolution-prod
tail -f logs/assolution-prod.log
```

### Métriques et dashboards

- **Prometheus metrics**: http://192.168.1.22/api/actuator/prometheus
- **Application insights**: Logs structurés JSON
- **Performance monitoring**: Temps de réponse, utilisation CPU/RAM

## 🔒 Sécurité

### Mesures de sécurité implémentées

#### Backend

- 🔐 **JWT Authentication** avec expiration
- 🛡️ **Spring Security** configuration avancée
- 🚫 **CORS** configuré restrictivement
- 🔒 **CSRF Protection** activée
- 📊 **Rate Limiting** par IP
- 🔍 **Input Validation** avec Bean Validation
- 🚨 **Audit Logging** des actions sensibles

#### Frontend

- 🔒 **CSP Headers** (Content Security Policy)
- 🛡️ **XSS Protection**
- 📋 **Form Validation** côté client et serveur
- 🔐 **Secure Cookie** configuration
- 🚫 **Router Guards** pour les routes protégées

#### Infrastructure

- 🔥 **Nginx** rate limiting et security headers
- 🐳 **Docker** containers non-root
- 📝 **Secrets management** via GitHub Secrets
- 🔍 **Vulnerability scanning** avec Trivy
- 💾 **Automatic backups** de la base de données

## 🤝 Contribution

### Workflow de développement

1. **Fork** le repository
2. **Créer** une branche feature: `git checkout -b feature/ma-nouvelle-feature`
3. **Développer** et tester localement
4. **Commit** avec des messages explicites
5. **Push**: `git push origin feature/ma-nouvelle-feature`
6. **Créer** une Pull Request vers `develop`

### Standards de code

#### Backend (Java)

- ☕ **Java 21** features
- 📋 **Spring Boot** best practices
- 🧪 **Tests unitaires** obligatoires (>70% couverture)
- 📝 **JavaDoc** pour les APIs publiques
- 🔍 **SonarQube** quality gates

#### Frontend (TypeScript)

- 🅰️ **Angular 20.1** style guide
- 📏 **ESLint** configuration stricte
- 🧪 **Tests unitaires** Jasmine/Karma
- 📱 **Responsive design** obligatoire
- ♿ **Accessibilité** (WCAG 2.1)

### Structure des commits

```
type(scope): description courte

Description plus détaillée si nécessaire

- Changement 1
- Changement 2

Fixes #123
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📞 Support

### En cas de problème

1. **Vérifier les logs**:

   ```bash
   docker-compose logs -f
   ```

2. **Health checks**:

   ```bash
   curl http://192.168.1.22/api/actuator/health
   ```

3. **Redémarrage des services**:
   ```bash
   ssh dbm@192.168.1.22
   cd /home/dbm/assolution-prod
   docker-compose restart
   ```

### Contacts

- 📧 **Support technique**: support@assolution.com
- 📧 **Équipe de développement**: dev@assolution.com
- 🐙 **Issues GitHub**: https://github.com/Fleg-matic/Assolution/issues

---

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Spring Boot** team pour l'excellent framework
- **Angular** team pour les outils de développement
- **Docker** pour la simplicité de déploiement
- **PostgreSQL** pour la robustesse de la base de données

---

**⚡ Développé avec passion par l'équipe Assolution**
