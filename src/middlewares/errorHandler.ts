import type { Request, Response, NextFunction } from "express";

// Middleware de manejo de errores: captura cualquier error pasado con next(err)
// y responde con un JSON consistente en vez de dejar que Express reviente.
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? "Error interno del servidor" });
};
