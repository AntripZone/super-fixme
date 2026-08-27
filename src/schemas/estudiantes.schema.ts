import { z } from "zod";

export const estudianteSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  edad: z.number().int().min(3, "La edad mínima es 3 años").max(100, "La edad no es valida"), //Ajuste de limite de edad a uno razonable. 
  curso_id: z.number().int().positive("El curso_id debe ser un ID valido mayor 0"),
});

export const actualizarEstudianteSchema = estudianteSchema.partial();
