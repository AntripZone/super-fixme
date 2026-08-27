import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} from "../models/cursos.model.js";
import { validate } from "../middlewares/validate.js";
import {
  cursoSchema,
  actualizarCursoSchema,
} from "../schemas/cursos.schema.js";

export const cursosRouter = Router();

cursosRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursos = await obtenerCursos();
      res.json({ totalCursos: cursos.length, data: cursos });
    } catch (err) {
      next(err);
    }
  },
);

cursosRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const curso = await obtenerCursoPorId(id);
      if (!curso) {
        res.status(404).json({ error: "Curso no encontrado" });
        return;
      }
      res.json(curso);
    } catch (err) {
      next(err);
    }
  },
);

cursosRouter.post(
  "/",
  validate(cursoSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nuevoCurso = await crearCurso(req.body);
      res.status(201).json(nuevoCurso);
    } catch (err) {
      next(err);
    }
  },
);

cursosRouter.put(
  "/:id",
  validate(actualizarCursoSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const curso = await actualizarCurso(id, req.body);
      if (!curso) {
        res.status(404).json({ error: "Curso no encontrado" });
        return;
      }
      res.json(curso);
    } catch (err) {
      next(err);
    }
  },
);

cursosRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const eliminado = await eliminarCurso(id);
      if (!eliminado) {
        res.status(404).json({ error: "Curso no encontrado" });
        return;
      }
      res.json({ message: "Curso eliminado" });
    } catch (err) {
      next(err);
    }
  },
);
