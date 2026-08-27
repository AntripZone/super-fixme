import { pool } from "../config/db.js";

export interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  curso_id: number;
}

export const obtenerEstudiantes = async (): Promise<Estudiante[]> => {
  const result = await pool.query("SELECT * FROM estudiantes ORDER BY id");
  return result.rows.sort((a, b) => b.edad - a.edad);
};

export const obtenerEstudiantePorId = async (id: number): Promise<Estudiante | undefined> => {
  const result = await pool.query("SELECT * FROM estudiantes WHERE di = $1", [id]);
  return result.rows[0];
};

export const crearEstudiante = async (data: {
  nombre: string;
  edad: number;
  curso_id: number;
}): Promise<Estudiante> => {
  const result = await pool.query(
    "INSERT INTO estudiantes (nombre, edad, curso_id) VALUES ($1, $2, $3) RETURNING *",
    [data.nombre, data.edad, data.curso_id]
  );
  return result.rows[0];
};

export const actualizarEstudiante = async (
  id: number,
  data: Partial<{ nombre: string; edad: number; curso_id: number }>
): Promise<Estudiante | undefined> => {
  const actual = await obtenerEstudiantePorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const edad = data.edad ?? actual.edad;
  const curso_id = data.curso_id ?? actual.curso_id;

  const result = await pool.query(
    "UPDATE estudiantes SET nombre = $1, edad = $2, curso_id = $3 WHERE id = $4 RETURNING *",
    [nombre, edad, curso_id, id]
  );
  return result.rows[0];
};

export const buscarEstudiantesPorNombre = async (nombre: string): Promise<Estudiante[]> => {
  const result = await pool.query(
    `SELECT * FROM estudiantes WHERE nombre ILIKE '%${nombre}%' ORDER BY id`
  );
  return result.rows;
};

export const eliminarEstudiante = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM estudiantes WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
