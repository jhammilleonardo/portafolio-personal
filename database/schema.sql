-- Portafolio Database Schema
CREATE DATABASE IF NOT EXISTS portafolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portafolio;

-- Profile table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  bio TEXT,
  email VARCHAR(100),
  location VARCHAR(100),
  avatar_url VARCHAR(500),
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  years_experience INT DEFAULT 0,
  availability VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  long_description TEXT,
  repo_url VARCHAR(500),
  demo_url VARCHAR(500),
  image_url VARCHAR(500),
  tags JSON,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'archived', 'wip') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_url VARCHAR(500),
  image_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level INT DEFAULT 50 CHECK (level BETWEEN 1 AND 100),
  icon VARCHAR(100),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data

INSERT INTO profile (name, title, bio, email, location, github_url, linkedin_url, years_experience) VALUES (
  'Tu Nombre',
  'Full Stack Developer & Software Engineer',
  'Apasionado por crear experiencias digitales excepcionales. Especializado en desarrollo web moderno con un enfoque en rendimiento, accesibilidad y código limpio. Me encanta explorar nuevas tecnologías y resolver problemas complejos con soluciones elegantes.',
  'tu@email.com',
  'Tu Ciudad, País',
  'https://github.com/tuusuario',
  'https://linkedin.com/in/tuusuario',
  3
);

INSERT INTO projects (title, description, long_description, repo_url, demo_url, tags, featured, status) VALUES
(
  'Portafolio Personal',
  'Portafolio profesional moderno construido con Astro, React y MySQL. Incluye panel de administración, animaciones fluidas y diseño glassmorphism.',
  'Este portafolio fue creado desde cero usando Astro 4 con SSR, React para componentes interactivos, MySQL para persistencia de datos, y Tailwind CSS para estilos. Incluye un panel de administración completo para gestionar proyectos, certificaciones y habilidades.',
  'https://github.com/tuusuario/portafolio',
  'https://tuportafolio.com',
  '["Astro", "React", "TypeScript", "MySQL", "Tailwind CSS"]',
  TRUE,
  'active'
),
(
  'E-Commerce API',
  'API REST completa para plataforma de comercio electrónico con autenticación JWT, pagos con Stripe y gestión de inventario.',
  'Backend robusto construido con Node.js y Express, base de datos PostgreSQL con Prisma ORM, autenticación con JWT y refresh tokens, integración con Stripe para pagos, y documentación con Swagger.',
  'https://github.com/tuusuario/ecommerce-api',
  NULL,
  '["Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Stripe"]',
  TRUE,
  'active'
),
(
  'Task Manager App',
  'Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones push y sincronización offline.',
  'Aplicación fullstack con React Native para móvil y React para web. Backend con NestJS, WebSockets para tiempo real, y PWA con Service Workers para offline.',
  'https://github.com/tuusuario/task-manager',
  'https://tasks.demo.com',
  '["React", "React Native", "NestJS", "WebSockets", "PWA"]',
  FALSE,
  'active'
),
(
  'CLI Dev Tools',
  'Herramienta de línea de comandos para automatizar tareas de desarrollo: scaffolding, deployment y gestión de entornos.',
  'CLI construida con Go que permite crear proyectos desde templates, automatizar deployments a múltiples plataformas, y gestionar variables de entorno de forma segura.',
  'https://github.com/tuusuario/cli-tools',
  NULL,
  '["Go", "CLI", "DevOps", "Automation"]',
  FALSE,
  'active'
);

INSERT INTO certifications (title, issuer, issue_date, credential_url) VALUES
('AWS Certified Developer - Associate', 'Amazon Web Services', '2024-03-15', 'https://aws.amazon.com/certification/'),
('Professional Scrum Master I (PSM I)', 'Scrum.org', '2023-11-20', 'https://www.scrum.org/certificates/'),
('Google Cloud Associate Cloud Engineer', 'Google Cloud', '2024-06-10', 'https://cloud.google.com/certification/'),
('Meta React Developer Certificate', 'Meta', '2023-08-05', 'https://www.coursera.org/professional-certificates/meta-react-native');

INSERT INTO skills (name, category, level, icon, color) VALUES
-- Frontend
('React', 'Frontend', 92, 'react', '#61DAFB'),
('TypeScript', 'Frontend', 88, 'typescript', '#3178C6'),
('Astro', 'Frontend', 85, 'astro', '#FF5D01'),
('Tailwind CSS', 'Frontend', 90, 'tailwind', '#06B6D4'),
('Next.js', 'Frontend', 82, 'nextjs', '#000000'),
-- Backend
('Node.js', 'Backend', 88, 'nodejs', '#339933'),
('Express', 'Backend', 85, 'express', '#000000'),
('NestJS', 'Backend', 75, 'nestjs', '#E0234E'),
('Go', 'Backend', 65, 'go', '#00ADD8'),
-- Databases
('MySQL', 'Databases', 85, 'mysql', '#4479A1'),
('PostgreSQL', 'Databases', 80, 'postgresql', '#4169E1'),
('MongoDB', 'Databases', 75, 'mongodb', '#47A248'),
('Redis', 'Databases', 70, 'redis', '#DC382D'),
-- DevOps
('Docker', 'DevOps', 80, 'docker', '#2496ED'),
('AWS', 'DevOps', 75, 'aws', '#FF9900'),
('Git', 'DevOps', 92, 'git', '#F05032'),
('CI/CD', 'DevOps', 72, 'github-actions', '#2088FF');
