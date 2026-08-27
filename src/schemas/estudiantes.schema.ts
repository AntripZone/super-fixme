import { z } from "zod";

export const estudianteSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  edad: z.number().int().min(3).max(180),
  curso_id: z.number().int().positive("curso_id es requerido"),
});

export const actualizarEstudianteSchema = estudianteSchema.partial();
