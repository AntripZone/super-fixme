
import { Router } from "express";
import {
  obtenerCalificaciones,
  obtenerCalificacionPorId,
  obtenerCalificacionesPorEstudiante,
  obtenerCalificacionesDeHoy,
  validarEstudianteYProfesorExisten,
  crearCalificacion,
  actualizarCalificacion,
  eliminarCalificacion,
} from "../models/calificaciones.model.js";
import { validate } from "../middlewares/validate.js";
import {
  calificacionSchema,
  actualizarCalificacionSchema,
  filtroCalificacionesSchema,
} from "../schemas/calificaciones.schema.js";

export const calificacionesRouter = Router();

calificacionesRouter.get("/", async (req, res, next) => {
  try {
    const filtro = filtroCalificacionesSchema.safeParse(req.query);

    if (!filtro.success) {
      return res.status(400).json({
        error: filtro.error.flatten(),
      });
    }

    const calificaciones = await obtenerCalificaciones();

    const resultado =
      filtro.data.notaMinima !== undefined
        ? calificaciones.filter(
            (c) => c.nota >= filtro.data.notaMinima!
          )
        : calificaciones;

    return res.json(resultado);
  } catch (err) {
    next(err);
  }
});

calificacionesRouter.get("/hoy", async (req, res, next) => {
  try {
    const calificaciones = await obtenerCalificacionesDeHoy();
    return res.json(calificaciones);
  } catch (err) {
    next(err);
  }
});

calificacionesRouter.get(
  "/estudiante/:estudianteId",
  async (req, res, next) => {
    try {
      const estudianteId = Number(req.params.estudianteId);

      if (isNaN(estudianteId)) {
        return res.status(400).json({
          error: "El estudianteId debe ser numérico",
        });
      }

      const calificaciones =
        await obtenerCalificacionesPorEstudiante(estudianteId);

      const suma = calificaciones.reduce(
        (acc, c) => acc + c.nota,
        0
      );

      const promedio =
        calificaciones.length > 0
          ? suma / calificaciones.length
          : 0;

      return res.json({
        calificaciones,
        promedio,
      });
    } catch (err) {
      next(err);
    }
  }
);

calificacionesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser numérico",
      });
    }

    const calificacion = await obtenerCalificacionPorId(id);

    if (!calificacion) {
      return res.status(404).json({
        error: "Calificacion no encontrada",
      });
    }

    return res.json(calificacion);
  } catch (err) {
    next(err);
  }
});

calificacionesRouter.post(
  "/",
  validate(calificacionSchema),
  async (req, res, next) => {
    try {
      const existen = await validarEstudianteYProfesorExisten(
        req.body.estudiante_id,
        req.body.profesor_id
      );

      if (!existen) {
        return res.status(404).json({
          error: "estudiante_id o profesor_id no existen",
        });
      }

      const nuevaCalificacion = await crearCalificacion(req.body);

      return res.status(201).json(nuevaCalificacion);
    } catch (err) {
      next(err);
    }
  }
);

calificacionesRouter.put(
  "/:id",
  validate(actualizarCalificacionSchema),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "El ID debe ser numérico",
        });
      }

      const calificacion = await actualizarCalificacion(
        id,
        req.body
      );

      if (!calificacion) {
        return res.status(404).json({
          error: "Calificacion no encontrada",
        });
      }

      return res.json(calificacion);
    } catch (err) {
      next(err);
    }
  }
);

calificacionesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "El ID debe ser numérico",
      });
    }

    const eliminada = await eliminarCalificacion(id);

    if (!eliminada) {
      return res.status(404).json({
        error: "Calificacion no encontrada",
      });
    }

    return res.json({
      message: "Calificacion eliminada",
    });
  } catch (err) {
    next(err);
  }
});
