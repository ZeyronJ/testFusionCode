CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL, 
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL, 
  cantidad INT NOT NULL, 
  fecha_creacion TIMESTAMP DEFAULT NOW(), 
  fecha_actualizacion TIMESTAMP DEFAULT NOW()
);
