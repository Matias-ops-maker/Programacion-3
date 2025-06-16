-- Archivo de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS movimientos (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE SET NULL,
    cantidad INTEGER NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'salida')),
    fecha TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

SELECT 'Base de datos inicializada correctamente' AS status;