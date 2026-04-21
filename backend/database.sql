-- Crear tabla de clientes_web
CREATE TABLE IF NOT EXISTS clientes_web (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    mensaje TEXT,
    estado VARCHAR(20) DEFAULT 'nuevo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_clientes_telefono ON clientes_web(telefono);
CREATE INDEX IF NOT EXISTS idx_clientes_correo ON clientes_web(correo);
CREATE INDEX IF NOT EXISTS idx_clientes_estado ON clientes_web(estado);
CREATE INDEX IF NOT EXISTS idx_clientes_fecha ON clientes_web(fecha_registro);

-- Tabla de usuarios admin
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Insertar usuario admin por defecto (cambiar contraseña en producción)
-- Contraseña: TechPro2025!
INSERT INTO admin_users (username, password_hash, email)
VALUES (
    'admin',
    '$2b$10$YourHashedPasswordHere', -- Reemplazar con hash bcrypt real
    'angel.clavijo@yahoo.es'
)
ON CONFLICT (username) DO NOTHING;

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes_web(id),
    tipo VARCHAR(50) NOT NULL,
    mensaje TEXT,
    enviada BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
