@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   ASSOLUTION - Setup Local Windows
echo ========================================
echo.

REM Verification qu'on est dans le bon repertoire
if not exist "config-templates" (
    echo [ERREUR] Vous devez executer ce script depuis la racine du projet Assolution
    echo    Repertoire attendu: Assolution\
    echo    Repertoire actuel: %cd%
    pause
    exit /b 1
)

echo [INFO] Verification des prerequis...

REM Verifier Java
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Java non trouve - Installez Java 21
    pause
    exit /b 1
)

REM Verifier Node
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js non trouve - Installez Node.js 22
    pause
    exit /b 1
)

REM Verifier Docker (optionnel pour le setup local)
docker --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Docker non trouve - L'application complète necessite Docker Desktop
    echo [INFO] Continuons quand meme pour creer les fichiers de config...
) else (
    echo [OK] Docker trouve
)

echo [OK] Prerequis verifies
echo.

echo [INFO] Creation des fichiers de configuration depuis les templates...

REM Creer .env depuis le template
if not exist ".env" (
    if exist "config-templates\.env.template" (
        copy "config-templates\.env.template" ".env" >nul
        echo [OK] Fichier .env cree depuis le template
        echo [IMPORTANT] Editez le fichier .env et remplacez les ${...} par vos vraies valeurs
    ) else (
        echo [ERREUR] Template .env.template non trouve
    )
) else (
    echo [INFO] Fichier .env existe deja
)

REM Creer .env.prod depuis le template
if not exist ".env.prod" (
    if exist "config-templates\.env.prod.template" (
        copy "config-templates\.env.prod.template" ".env.prod" >nul
        echo [OK] Fichier .env.prod cree depuis le template
        echo [IMPORTANT] Editez le fichier .env.prod et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier .env.prod existe deja
)

REM Creer application.properties depuis le template (CHEMIN CORRIGE)
if not exist "inscriptions\inscriptions-backend\src\main\resources\application.properties" (
    if exist "config-templates\application.properties.template" (
        copy "config-templates\application.properties.template" "inscriptions\inscriptions-backend\src\main\resources\application.properties" >nul
        echo [OK] Fichier application.properties cree depuis le template
        echo [IMPORTANT] Editez le fichier et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier application.properties existe deja
)

REM Creer application-prod.properties depuis le template (CHEMIN CORRIGE)
if not exist "inscriptions\inscriptions-backend\src\main\resources\application-prod.properties" (
    if exist "config-templates\application-prod.properties.template" (
        copy "config-templates\application-prod.properties.template" "inscriptions\inscriptions-backend\src\main\resources\application-prod.properties" >nul
        echo [OK] Fichier application-prod.properties cree depuis le template
        echo [IMPORTANT] Editez le fichier et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier application-prod.properties existe deja
)

REM Creer cypress.config.js depuis le template
if not exist "cypress.config.js" (
    if exist "config-templates\cypress.config.js.template" (
        copy "config-templates\cypress.config.js.template" "cypress.config.js" >nul
        echo [OK] Fichier cypress.config.js cree depuis le template
        echo [IMPORTANT] Editez le fichier et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier cypress.config.js existe deja
)

REM Creer 01-init-db.sql depuis le template (NOUVEAU)
if not exist "init-scripts\01-init-db.sql" (
    if exist "config-templates\01-init-db.sql.template" (
        copy "config-templates\01-init-db.sql.template" "init-scripts\01-init-db.sql" >nul
        echo [OK] Fichier 01-init-db.sql cree depuis le template
        echo [IMPORTANT] Editez le fichier et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier 01-init-db.sql existe deja
)

REM Creer environment.prod.ts depuis le template (NOUVEAU)
if not exist "inscriptions\inscriptions-frontend\src\environments\environment.prod.ts" (
    if exist "config-templates\environment.prod.ts.template" (
        copy "config-templates\environment.prod.ts.template" "inscriptions\inscriptions-frontend\src\environments\environment.prod.ts" >nul
        echo [OK] Fichier environment.prod.ts cree depuis le template
        echo [IMPORTANT] Editez le fichier et remplacez les ${...} par vos vraies valeurs
    )
) else (
    echo [INFO] Fichier environment.prod.ts existe deja
)

REM Creer les dossiers necessaires
if not exist "logs" mkdir logs
if not exist "postgres_data" mkdir postgres_data
if not exist "backups" mkdir backups
if not exist "cypress\screenshots" mkdir cypress\screenshots
if not exist "cypress\videos" mkdir cypress\videos
if not exist "cypress\downloads" mkdir cypress\downloads
echo [OK] Dossiers crees

echo.
echo [INFO] Installation des dependances...

REM Backend (CHEMIN CORRIGE)
echo [INFO] Installation dependances Backend...
cd inscriptions\inscriptions-backend
if exist "mvnw.cmd" (
    call mvnw.cmd clean install -DskipTests
    if errorlevel 1 (
        echo [ERREUR] Erreur lors de l'installation des dependances backend
        cd ..\..
        pause
        exit /b 1
    )
    echo [OK] Dependances Backend installees
) else (
    echo [WARNING] mvnw.cmd non trouve - utilisez votre IDE pour builder le backend
)
cd ..\..

REM Frontend (CHEMIN CORRIGE)
echo [INFO] Installation dependances Frontend...
cd inscriptions\inscriptions-frontend
if exist "package.json" (
    call npm install
    if errorlevel 1 (
        echo [ERREUR] Erreur lors de l'installation des dependances frontend
        cd ..\..
        pause
        exit /b 1
    )
    echo [OK] Dependances Frontend installees
) else (
    echo [WARNING] package.json non trouve dans le frontend
)
cd ..\..

REM Cypress
echo [INFO] Installation dependances Cypress...
if exist "package.json" (
    call npm install
    if errorlevel 1 (
        echo [WARNING] Erreur lors de l'installation des dependances Cypress - continuons
    ) else (
        echo [OK] Dependances Cypress installees
    )
) else (
    echo [WARNING] package.json racine non trouve - Cypress non installe
)

echo.
echo [SUCCESS] Configuration terminee avec succes !
echo.
echo [INFO] PROCHAINES ETAPES :
echo    1. Editez .env et remplacez toutes les valeurs ${...}
echo    2. Editez .env.prod et remplacez toutes les valeurs ${...}
echo    3. Editez inscriptions\inscriptions-backend\src\main\resources\application.properties
echo    4. Editez inscriptions\inscriptions-backend\src\main\resources\application-prod.properties
echo    5. Editez cypress.config.js et remplacez toutes les valeurs ${...}
echo    6. Editez init-scripts\01-init-db.sql et remplacez ${DB_PASSWORD}
echo    7. Editez inscriptions\inscriptions-frontend\src\environments\environment.prod.ts
echo    8. Si Docker est installe: docker-compose up
echo.
echo [INFO] URLs de developpement :
echo    - Frontend: http://localhost:4200
echo    - Backend:  http://localhost:8080
echo    - Full App: http://localhost:80
echo.
echo [INFO] Tests :
echo    - E2E: npx cypress open
echo    - Backend: cd inscriptions\inscriptions-backend et mvn test
echo    - Frontend: cd inscriptions\inscriptions-frontend et npm test
echo.
pause