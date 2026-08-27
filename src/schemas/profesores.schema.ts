import { z } from "zod";

export const profesorSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().regex(/^\S+@\S+$/, "Email invalido"),
  telefono: z.string().optional(),
});

export const actualizarProfesorSchema = profesorSchema.partial();
