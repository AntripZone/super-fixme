import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import type { Request, Response } from "express";

import { swaggerSpec } from "./config/swagger.js";
import { cursosRouter } from "./controllers/cursos.controller.js";
import { estudiantesRouter } from "./controllers/estudiantes.controller.js";
import { profesoresRouter } from "./controllers/profesores.controller.js";
import { calificacionesRouter } from "./controllers/calificaciones.controller.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.use("/api/cursos", cursosRouter);
app.use("/api/estudiantes", estudiantesRouter);
app.use("/api/profesores", profesoresRouter);
app.use("/api/calificaciones", calificacionesRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "Bienvenido a la API de El Colegio de Kevin. Ve a /api-docs",
  });
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
});
