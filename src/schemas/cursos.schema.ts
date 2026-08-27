import { z } from "zod";

export const cursoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
});

export const actualizarCursoSchema = cursoSchema.partial();
