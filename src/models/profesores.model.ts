import { pool } from "../config/db.js";

export interface Profesor {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
}

export const obtenerProfesores = async (): Promise<Profesor[]> => {
  const result = await pool.query("SELECT * FROM profesores ORDER BY id");
  return result.rows;
};

export const obtenerProfesorPorId = async (id: number): Promise<Profesor | undefined> => {
  const result = await pool.query("SELECT * FROM profesores WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearProfesor = async (data: {
  nombre: string;
  email: string;
  telefono?: string;
}): Promise<Profesor> => {
  const result = await pool.query(
    "INSERT INTO profesores (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *",
    [data.nombre, data.email, data.telefono ?? null]
  );
  return result.rows[0];
};

export const actualizarProfesor = async (
  id: number,
  data: Partial<{ nombre: string; email: string; telefono: string }>
): Promise<Profesor | undefined> => {
  const actual = await obtenerProfesorPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const email = data.email ?? actual.email;
  const telefono = data.telefono ?? actual.telefono;

  const result = await pool.query(
    "UPDATE profesores SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *",
    [nombre, email, telefono, id]
  );
  return result.rows[0];
};

export const eliminarProfesor = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM profesores WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
