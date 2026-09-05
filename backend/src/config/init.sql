CREATE DATABASE IF NOT EXISTS el_morenito_db CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE el_morenito_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'editor') DEFAULT 'admin',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE IF NOT EXISTS servicios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  imagen_url VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO servicios (titulo, slug, descripcion, imagen_url, categoria) VALUES
('Reformas Integrales para el Hogar', 'reformas-integrales', 'Proyectos completos de renovación: albañilería, pintura, suelos, fontanería y electricidad.', '/assets/images/reformas.webp', 'Reformas'),
('Cerrajería y Soldadura Estructural', 'cerrajeria-soldadura', 'Fabricación de escaleras metálicas, barandillas, automatización de accesos y seguridad.', '/assets/images/cerrajeria.webp', 'Metálica'),
('Albañilería General', 'albanileria-general', 'Muros, revestimientos, tabiquería de pladur, techos y soleras de hormigón.', '/assets/images/albanileria.webp', 'Construcción'),
('Fontanería y Climatización', 'fontaneria-climatizacion', 'Reparación de fugas, tuberías, instalación de griferías, sanitarios y termos.', '/assets/images/fontaneria.webp', 'Instalaciones'),
('Carpintería a Medida', 'carpinteria-madera', 'Puertas de paso, armarios empotrados, cocinas y muebles a medida.', '/assets/images/carpinteria.webp', 'Carpintería'),
('Instalación de Placas Solares', 'placas-solares', 'Montaje y mantenimiento de sistemas fotovoltaicos para ahorro energético.', '/assets/images/solar.webp', 'Energía Solar'),
('Ejecución de Losa y Hormigón Pulido', 'losa-hormigon-pulido', 'Bases firmes niveladas y pulido con máquinas allanadoras para máxima durabilidad.', '/assets/images/hormigon.webp', 'Pavimentos');
