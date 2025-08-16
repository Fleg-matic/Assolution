-- Script d'initialisation de la base de données Assolution - TEMPLATE
-- Ce script est exécuté automatiquement au démarrage du container PostgreSQL

-- ===============================
-- CRÉATION DES UTILISATEURS ET BASES DE DONNÉES
-- ===============================

-- Création de l'utilisateur pour l'application (si pas déjà existant)
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'assolution_user') THEN

      CREATE ROLE assolution_user LOGIN PASSWORD '${DB_PASSWORD}';
   END IF;
END
$do$;

-- Création des bases de données
CREATE DATABASE assolution_dev OWNER assolution_user;
CREATE DATABASE assolution_prod OWNER assolution_user;
CREATE DATABASE assolution_test OWNER assolution_user;

-- Octroi des privilèges
GRANT ALL PRIVILEGES ON DATABASE assolution_dev TO assolution_user;
GRANT ALL PRIVILEGES ON DATABASE assolution_prod TO assolution_user;
GRANT ALL PRIVILEGES ON DATABASE assolution_test TO assolution_user;

-- ===============================
-- CONFIGURATION DES BASES DE DONNÉES
-- ===============================

-- Configuration pour assolution_dev
\c assolution_dev;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pour les fonctions de texte
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Configuration pour assolution_prod
\c assolution_prod;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pour les fonctions de texte
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Configuration pour assolution_test
\c assolution_test;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pour les fonctions de texte
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ===============================
-- SCHÉMAS DE BASE (OPTIONNEL)
-- ===============================

-- Retour à la base de développement pour créer le schéma de base
\c assolution_dev;

-- Création du schéma principal
CREATE SCHEMA IF NOT EXISTS assolution AUTHORIZATION assolution_user;

-- Définir le search_path
ALTER ROLE assolution_user SET search_path TO assolution, public;

-- ===============================
-- TABLES DE BASE (EXEMPLE)
-- ===============================

-- Table de logs d'audit (utile pour le monitoring)
CREATE TABLE IF NOT EXISTS assolution.audit_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Index pour les requêtes courantes sur les logs
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON assolution.audit_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON assolution.audit_log(entity_name, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON assolution.audit_log(user_id);

-- Table des sessions utilisateur (pour la gestion des sessions)
CREATE TABLE IF NOT EXISTS assolution.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Index pour les sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON assolution.user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON assolution.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON assolution.user_sessions(expires_at);

-- ===============================
-- FONCTIONS UTILITAIRES
-- ===============================

-- Fonction pour nettoyer les sessions expirées
CREATE OR REPLACE FUNCTION assolution.clean_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM assolution.user_sessions 
    WHERE expires_at < CURRENT_TIMESTAMP OR is_active = FALSE;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    INSERT INTO assolution.audit_log (entity_name, action, new_values, timestamp)
    VALUES ('user_sessions', 'CLEANUP', json_build_object('deleted_count', deleted_count), CURRENT_TIMESTAMP);
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour logger les actions d'audit
CREATE OR REPLACE FUNCTION assolution.log_audit(
    p_entity_name VARCHAR(100),
    p_entity_id VARCHAR(100),
    p_action VARCHAR(50),
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    audit_id UUID;
BEGIN
    INSERT INTO assolution.audit_log (
        entity_name, entity_id, action, old_values, new_values, 
        user_id, ip_address, user_agent, timestamp
    )
    VALUES (
        p_entity_name, p_entity_id, p_action, p_old_values, p_new_values,
        p_user_id, p_ip_address, p_user_agent, CURRENT_TIMESTAMP
    )
    RETURNING id INTO audit_id;
    
    RETURN audit_id;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- DONNÉES DE TEST (DÉVELOPPEMENT UNIQUEMENT)
-- ===============================

-- Log d'initialisation
INSERT INTO assolution.audit_log (entity_name, action, new_values)
VALUES ('database', 'INITIALIZATION', json_build_object(
    'message', 'Base de données développement initialisée',
    'version', '1.0',
    'date', CURRENT_TIMESTAMP
));

-- ===============================
-- CONFIGURATION POUR LA PRODUCTION
-- ===============================

-- Retour à la base de production pour la configurer
\c assolution_prod;

-- Création du schéma principal pour la production
CREATE SCHEMA IF NOT EXISTS assolution AUTHORIZATION assolution_user;

-- Définir le search_path
ALTER ROLE assolution_user SET search_path TO assolution, public;

-- Recréer les tables système pour la production
CREATE TABLE IF NOT EXISTS assolution.audit_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON assolution.audit_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON assolution.audit_log(entity_name, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON assolution.audit_log(user_id);

CREATE TABLE IF NOT EXISTS assolution.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON assolution.user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON assolution.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON assolution.user_sessions(expires_at);

-- Recréer les fonctions pour la production
CREATE OR REPLACE FUNCTION assolution.clean_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM assolution.user_sessions 
    WHERE expires_at < CURRENT_TIMESTAMP OR is_active = FALSE;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    INSERT INTO assolution.audit_log (entity_name, action, new_values, timestamp)
    VALUES ('user_sessions', 'CLEANUP', json_build_object('deleted_count', deleted_count), CURRENT_TIMESTAMP);
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION assolution.log_audit(
    p_entity_name VARCHAR(100),
    p_entity_id VARCHAR(100),
    p_action VARCHAR(50),
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    audit_id UUID;
BEGIN
    INSERT INTO assolution.audit_log (
        entity_name, entity_id, action, old_values, new_values, 
        user_id, ip_address, user_agent, timestamp
    )
    VALUES (
        p_entity_name, p_entity_id, p_action, p_old_values, p_new_values,
        p_user_id, p_ip_address, p_user_agent, CURRENT_TIMESTAMP
    )
    RETURNING id INTO audit_id;
    
    RETURN audit_id;
END;
$$ LANGUAGE plpgsql;

-- Log d'initialisation pour la production
INSERT INTO assolution.audit_log (entity_name, action, new_values)
VALUES ('database', 'INITIALIZATION', json_build_object(
    'message', 'Base de données production initialisée',
    'version', '1.0',
    'date', CURRENT_TIMESTAMP,
    'environment', 'production'
));

-- ===============================
-- CONFIGURATION DES PERMISSIONS FINALES
-- ===============================

-- Donner tous les privilèges sur le schéma à l'utilisateur
GRANT ALL ON SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL TABLES IN SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA assolution TO assolution_user;

-- Configuration pour la base de test
\c assolution_test;

CREATE SCHEMA IF NOT EXISTS assolution AUTHORIZATION assolution_user;
ALTER ROLE assolution_user SET search_path TO assolution, public;

-- Tables minimales pour les tests
CREATE TABLE IF NOT EXISTS assolution.audit_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Permissions pour les tests
GRANT ALL ON SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL TABLES IN SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA assolution TO assolution_user;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA assolution TO assolution_user;

-- ===============================
-- FINALISATION
-- ===============================

-- Log final
\c assolution_dev;
INSERT INTO assolution.audit_log (entity_name, action, new_values)
VALUES ('database', 'SETUP_COMPLETE', json_build_object(
    'message', 'Configuration complète des bases de données Assolution',
    'databases', json_build_array('assolution_dev', 'assolution_prod', 'assolution_test'),
    'timestamp', CURRENT_TIMESTAMP
));