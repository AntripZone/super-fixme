import { pool } from "../config/db.js";

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export const obtenerCursos = async (): Promise<Curso[]> => {
  const result = await pool.query("SELECT * FROM curso ORDER BY id");
  return result.rows;
};

export const obtenerCursoPorId = async (id: number): Promise<Curso | undefined> => {
  const result = await pool.query("SELECT * FROM cursos WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearCurso = async (data: { nombre: string; descripcion?: string }): Promise<Curso> => {
  const result = await pool.query(
    "INSERT INTO cursos (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [data.nombre, data.descripcion ?? null]
  );
  return result.rows[0];
};

export const actualizarCurso = async (
  id: number,
  data: { nombre?: string; descripcion?: string }
): Promise<Curso | undefined> => {
  const actual = await obtenerCursoPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const descripcion = data.descripcion ?? actual.descripcion;

  const result = await pool.query(
    "UPDATE cursos SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
    [descripcion, nombre, id]
  );
  return result.rows[0];
};

export const eliminarCurso = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM cursos", [id]);
  return (result.rowCount ?? 0) > 0;
};
