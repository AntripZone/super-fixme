import { z } from "zod";

export const cursoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido"),
  descripcion: z.string().trim().optional(),
});

export const actualizarCursoSchema = cursoSchema.partial();
