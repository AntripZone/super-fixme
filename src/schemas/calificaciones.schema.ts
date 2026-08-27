import { z } from "zod";

export const calificacionSchema = z.object({
  estudiante_id: z.number().int().positive(),
  profesor_id: z.number().int().positive(),
  materia: z.string().min(1, "La materia es requerida"),
  nota: z.number().int().min(0).max(99),
});

export const actualizarCalificacionSchema = calificacionSchema.partial();

export const filtroCalificacionesSchema = z.object({
  notaMinima: z.number().int().min(0).max(100).optional(),
});
