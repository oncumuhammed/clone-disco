-- Database initialization script for PostgreSQL
-- Creates the Concord database and required extensions

CREATE DATABASE concord;

\c concord;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Log initialization
SELECT 'Concord database initialized successfully' AS status;
