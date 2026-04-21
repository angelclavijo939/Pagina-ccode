-- ============================================
-- TechPro - Database Schema for Neon PostgreSQL
-- ============================================

-- Crear tabla de clientes web
CREATE TABLE IF NOT EXISTS clientes_web (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    mensaje TEXT DEFAULT '',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'nuevo'
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes_web(correo);
CREATE INDEX IF NOT EXISTS idx_clientes_fecha ON clientes_web(fecha_registro DESC);
CREATE INDEX IF NOT EXISTS idx_clientes_estado ON clientes_web(estado);

-- Comentarios de la tabla
COMMENT ON TABLE clientes_web IS 'Clientes que se registran desde el formulario web';
COMMENT ON COLUMN clientes_web.estado IS 'Estado del lead: nuevo, contactado, convertido, descartado';

-- Verificar estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'clientes_web'
ORDER BY ordinal_position;
