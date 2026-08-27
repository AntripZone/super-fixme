import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

// Middleware generico para validar el body de una request contra un schema de zod.
export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({ error: resultado.error.flatten() });
    }

    req.body = resultado.data;
    next();
  };
