// Documento OpenAPI escrito a mano (sin swagger-jsdoc) para mantener
// las dependencias al minimo. Se sirve con swagger-ui-express en /api-docs.

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "El Colegio de Kevin - API",
    version: "1.0.0",
    description:
      "API sencilla con CRUD para cursos, estudiantes, profesores y calificaciones.",
  },
  servers: [{ url: "/api" }],
  tags: [
    { name: "Cursos" },
    { name: "Estudiantes" },
    { name: "Profesores" },
    { name: "Calificaciones" },
  ],
  components: {
    schemas: {
      Curso: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          descripcion: { type: "string" },
        },
        required: ["nombre"],
      },
      Estudiante: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          edad: { type: "integer" },
          curso_id: { type: "integer" },
        },
        required: ["nombre", "curso_id"],
      },
      Profesor: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          email: { type: "string", format: "email" },
          telefono: { type: "string" },
        },
        required: ["nombre", "email"],
      },
      Calificacion: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          estudiante_id: { type: "integer" },
          profesor_id: { type: "integer" },
          materia: { type: "string" },
          nota: { type: "integer", minimum: 0, maximum: 100 },
          fecha: { type: "string", format: "date", readOnly: true },
        },
        required: ["estudiante_id", "profesor_id", "materia", "nota"],
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Listar todos los cursos",
        responses: {
          200: {
            description: "Lista de cursos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Curso" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Cursos"],
        summary: "Crear un curso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Curso" },
            },
          },
        },
        responses: {
          201: { description: "Curso creado" },
          400: { description: "Datos invalidos" },
        },
      },
    },
    "/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener un curso por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Curso encontrado" },
          404: { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Cursos"],
        summary: "Actualizar un curso",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Curso" },
            },
          },
        },
        responses: {
          200: { description: "Curso actualizado" },
          404: { description: "No encontrado" },
        },
      },
      delete: {
        tags: ["Cursos"],
        summary: "Eliminar un curso",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Curso eliminado" },
          404: { description: "No encontrado" },
        },
      },
    },
    "/estudiantes": {
      get: {
        tags: ["Estudiantes"],
        summary: "Listar todos los estudiantes",
        responses: { 200: { description: "Lista de estudiantes" } },
      },
      post: {
        tags: ["Estudiantes"],
        summary: "Crear un estudiante",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Estudiante" },
            },
          },
        },
        responses: { 201: { description: "Estudiante creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/estudiantes/{id}": {
      get: {
        tags: ["Estudiantes"],
        summary: "Obtener un estudiante por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Estudiante encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Estudiantes"],
        summary: "Actualizar un estudiante",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Estudiante" },
            },
          },
        },
        responses: { 200: { description: "Estudiante actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Estudiantes"],
        summary: "Eliminar un estudiante",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Estudiante eliminado" }, 404: { description: "No encontrado" } },
      },
    },
    "/profesores": {
      get: {
        tags: ["Profesores"],
        summary: "Listar todos los profesores",
        responses: { 200: { description: "Lista de profesores" } },
      },
      post: {
        tags: ["Profesores"],
        summary: "Crear un profesor",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profesor" },
            },
          },
        },
        responses: { 201: { description: "Profesor creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/profesores/{id}": {
      get: {
        tags: ["Profesores"],
        summary: "Obtener un profesor por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Profesor encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Profesores"],
        summary: "Actualizar un profesor",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profesor" },
            },
          },
        },
        responses: { 200: { description: "Profesor actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Profesores"],
        summary: "Eliminar un profesor",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Profesor eliminado" }, 404: { description: "No encontrado" } },
      },
    },
    "/calificaciones": {
      get: {
        tags: ["Calificaciones"],
        summary: "Listar todas las calificaciones",
        responses: { 200: { description: "Lista de calificaciones" } },
      },
      post: {
        tags: ["Calificaciones"],
        summary: "Crear una calificacion",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Calificacion" },
            },
          },
        },
        responses: { 201: { description: "Calificacion creada" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/calificaciones/estudiante/{estudianteId}": {
      get: {
        tags: ["Calificaciones"],
        summary: "Listar las calificaciones de un estudiante junto con su promedio",
        parameters: [{ name: "estudianteId", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Calificaciones y promedio del estudiante" } },
      },
    },
    "/calificaciones/{id}": {
      get: {
        tags: ["Calificaciones"],
        summary: "Obtener una calificacion por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Calificacion encontrada" }, 404: { description: "No encontrada" } },
      },
      put: {
        tags: ["Calificaciones"],
        summary: "Actualizar una calificacion",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Calificacion" },
            },
          },
        },
        responses: { 200: { description: "Calificacion actualizada" }, 404: { description: "No encontrada" } },
      },
      delete: {
        tags: ["Calificaciones"],
        summary: "Eliminar una calificacion",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Calificacion eliminada" }, 404: { description: "No encontrada" } },
      },
    },
  },
};
