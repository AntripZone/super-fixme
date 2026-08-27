-- =====================================================
-- El Colegio de Kevin - Script de base de datos
-- =====================================================
-- Ejecuta este script completo en tu base de datos de PostgreSQL
-- (por ejemplo con psql, pgAdmin o DBeaver) ANTES de correr la API.
--
-- 1. Crea una base de datos vacia, por ejemplo:
--      CREATE DATABASE el_colegio;
-- 2. Conectate a esa base de datos.
-- 3. Corre todo el contenido de este archivo.
--
-- Nota: si mientras pruebas la API una tabla se queda vacia sin que lo
-- esperaras, no pasa nada raro, vuelve a correr este script para
-- reconstruir las tablas y los datos de ejemplo.
-- =====================================================

DROP TABLE IF EXISTS calificaciones;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS profesores;
DROP TABLE IF EXISTS cursos;

-- Cursos / secciones del colegio (ej: "Primero A", "Segundo B")
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- Estudiantes matriculados
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL DEFAULT 0,
    curso_id INTEGER REFERENCES cursos(id) ON DELETE SET NULL
);

-- Profesores del colegio
CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

-- Calificaciones que un profesor le pone a un estudiante en una materia
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
    profesor_id INTEGER NOT NULL REFERENCES profesores(id),
    materia VARCHAR(100) NOT NULL,
    nota INTEGER NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

-- =====================================================
-- Datos de ejemplo (opcional, pero ayuda a probar la API)
-- =====================================================

INSERT INTO cursos (nombre, descripcion) VALUES
    ('Primero A', 'Primer grado, seccion A'),
    ('Segundo B', 'Segundo grado, seccion B'),
    ('Tercero A', 'Tercer grado, seccion A');

INSERT INTO estudiantes (nombre, edad, curso_id) VALUES
    ('Carlos Rivas', 7, 1),
    ('Maria Solis', 8, 2),
    ('Jorge Lima', 9, 3),
    ('Paula Nunez', 8, 2);

INSERT INTO profesores (nombre, email, telefono) VALUES
    ('Prof. Ana Vega', 'ana.vega@example.com', '8888-3333'),
    ('Prof. Beto Cruz', 'beto.cruz@example.com', '8888-4444');

-- Ojo: Carlos (estudiante_id 1) queda con una sola calificacion a proposito,
-- y Jorge (estudiante_id 3) queda sin ninguna, para poder probar bien el
-- endpoint de promedio.
INSERT INTO calificaciones (estudiante_id, profesor_id, materia, nota) VALUES
    (1, 1, 'Matematicas', 85),
    (2, 1, 'Matematicas', 0),
    (2, 2, 'Ciencias', 92),
    (4, 2, 'Ciencias', 78);
