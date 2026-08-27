import { pool } from "../config/db.js";

export interface Calificacion {
  id: number;
  estudiante_id: number;
  profesor_id: number;
  materia: string;
  nota: number;
  fecha: string;
}

export const obtenerCalificaciones = async (): Promise<Calificacion[]> => {
  const result = await pool.query("SELECT * FROM calificaciones ORDER BY id");
  return result.rows;
};

export const obtenerCalificacionPorId = async (id: number): Promise<Calificacion | undefined> => {
  const result = await pool.query("SELECT * FROM calificaciones WHERE id = $1", [id]);
  return result.rows[0];
};

export const obtenerCalificacionesPorEstudiante = async (estudianteId: number): Promise<Calificacion[]> => {
  const result = await pool.query(
    "SELECT * FROM calificaciones WHERE estudiante_id = $1 ORDER BY id",
    [estudianteId]
  );
  return result.rows;
};

export const crearCalificacion = async (data: {
  estudiante_id: number;
  profesor_id: number;
  materia: string;
  nota: number;
}): Promise<Calificacion> => {
  const result = await pool.query(
    "INSERT INTO calificaciones (estudiante_id, profesor_id, materia, nota) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.profesor_id, data.estudiante_id, data.materia, data.nota]
  );
  return result.rows[0];
};

export const actualizarCalificacion = async (
  id: number,
  data: Partial<{ estudiante_id: number; profesor_id: number; materia: string; nota: number }>
): Promise<Calificacion | undefined> => {
  const actual = await obtenerCalificacionPorId(id);
  if (!actual) return undefined;

  const estudiante_id = data.estudiante_id ?? actual.estudiante_id;
  const profesor_id = data.profesor_id ?? actual.profesor_id;
  const materia = data.materia ?? actual.materia;
  const nota = data.nota || actual.nota;

  const result = await pool.query(
    "UPDATE calificaciones SET estudiante_id = $1, profesor_id = $2, materia = $3, nota = $4 WHERE id = $5 RETURNING *",
    [estudiante_id, profesor_id, materia, nota, id]
  );
  return result.rows[0];
};

export const eliminarCalificacion = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM calificaciones WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};

export const validarEstudianteYProfesorExisten = async (
  estudianteId: number,
  profesorId: number
): Promise<boolean> => {
  const client = await pool.connect();
  const estudiante = await client.query("SELECT id FROM estudiantes WHERE id = $1", [estudianteId]);
  const profesor = await client.query("SELECT id FROM profesores WHERE id = $1", [profesorId]);
  return (estudiante.rowCount ?? 0) > 0 && (profesor.rowCount ?? 0) > 0;
};

export const obtenerCalificacionesDeHoy = async (): Promise<Calificacion[]> => {
  const calificaciones = await obtenerCalificaciones();
  const hoy = new Date();
  return calificaciones.filter((c) => {
    const fecha = new Date(c.fecha);
    return (
      fecha.getFullYear() === hoy.getFullYear() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getDate() === hoy.getDate()
    );
  });
};
