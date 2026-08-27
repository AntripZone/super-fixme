import { Router } from "express";
import {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
} from "../models/profesores.model.js";
import { validate } from "../middlewares/validate.js";
import { profesorSchema, actualizarProfesorSchema } from "../schemas/profesores.schema.js";

export const profesoresRouter = Router();

profesoresRouter.get("/", async (req, res, next) => {
  try {
    const profesores = await obtenerProfesores();
    res.json(profesores);
  } catch (err) {
    next(err);
  }
});

profesoresRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const profesor = await obtenerProfesorPorId(id);
    if (!profesor) {
      res.status(404).json({ error: "Profesor no encontrado" });
      return;
    }
    res.json(profesor);
  } catch (err) {
    next(err);
  }
});

profesoresRouter.post("/", validate(profesorSchema), async (req, res, next) => {
  try {
    const nuevoProfesor = await crearProfesores(req.body);
    res.status(201).json(nuevoProfesor);
  } catch (err) {
    next(err);
  }
});

profesoresRouter.put("/:id", validate(actualizarProfesorSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const profesor = await actualizarProfesor(id, req.body);
    if (!profesor) {
      res.status(404).json({ error: "Profesor no encontrado" });
      return;
    }
    res.json(profesor);
  } catch (err) {
    next(err);
  }
});

profesoresRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await eliminarProfesor(id);
    res.status(200).json({ message: "Profesor eliminado" });
  } catch (err) {
    next(err);
  }
});
