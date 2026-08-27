# El Colegio de Kevin - API

API REST sencilla hecha con Express + TypeScript + PostgreSQL, con un CRUD
para 4 tablas: cursos, estudiantes, profesores y calificaciones.

> Este repositorio se usa como ejercicio de practica: a proposito tiene
> errores regados en el codigo. Esta vez la mayoria son errores de LOGICA
> (no solo nombres mal escritos), asi que hay que leer el codigo con calma
> y pensar en casos borde, no solo mirar lo que marca el editor en rojo.

## Requisitos

- Node.js 18+
- PostgreSQL corriendo localmente (o accesible por red)

## Como levantar el proyecto

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea la base de datos y las tablas ejecutando el script `sql/schema.sql`
   en tu PostgreSQL (con psql, pgAdmin, DBeaver, lo que uses).

3. Copia `.env.example` a `.env` (o usa el `.env` que ya viene) y ajusta las
   credenciales de tu base de datos.

4. Levanta el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la documentacion interactiva en:

   http://localhost:3000/api-docs

## Estructura del proyecto

```
src/
  config/       conexion a la base de datos y spec de Swagger
  middlewares/  validacion de body con zod y manejo de errores
  controllers/  rutas y handlers de cada recurso (CRUD)
  models/       queries a PostgreSQL con el driver pg
  schemas/      validaciones de zod por recurso
  index.ts      arranque de la app
sql/
  schema.sql    script para crear las tablas (correrlo a mano, no hay migraciones)
```

## Recursos

- `GET/POST /api/cursos`, `GET/PUT/DELETE /api/cursos/:id`
- `GET/POST /api/estudiantes`, `GET/PUT/DELETE /api/estudiantes/:id`,
  `GET /api/estudiantes/buscar?nombre=` (busqueda por nombre)
- `GET/POST /api/profesores`, `GET/PUT/DELETE /api/profesores/:id`
- `GET/POST /api/calificaciones` (admite `?notaMinima=`),
  `GET/PUT/DELETE /api/calificaciones/:id`,
  `GET /api/calificaciones/estudiante/:estudianteId` (incluye el promedio),
  `GET /api/calificaciones/hoy` (calificaciones registradas hoy)

## Reto

Hay 25 bugs escondidos en distintas capas (schemas, models, controllers,
middlewares, config). La mayoria no truenan nada a simple vista: hay que
probar cada endpoint con datos concretos (incluyendo casos borde, como una
nota de 0, un estudiante sin calificaciones, o un estudiante con solo una)
y comparar contra lo que el endpoint deberia hacer.

Los ultimos 5 son de otro nivel: no basta con leer el codigo, hay que
investigar un concepto concreto (seguridad, validacion, manejo de
conexiones a la base de datos, codigos de error de Postgres, fechas y
zonas horarias) para entenderlos y arreglarlos bien.

Tips:

- No te confies solo de que "no marca error". Varios bugs son de logica
  pura: comparaciones al reves, condiciones invertidas, o valores que se
  descartan por accidente.
- Algunos SI los marca el editor en rojo, esos son ganancia facil.
- Prueba casos borde: el numero 0, listas vacias, listas con un solo
  elemento. Muchos bugs solo se notan ahi.
- Si en algun momento una tabla se queda vacia sin que lo esperaras, no te
  asustes: vuelve a correr `sql/schema.sql` para reconstruir los datos de
  ejemplo y sigue probando.
- Si el servidor deja de responder despues de crear varias calificaciones
  seguidas, no es coincidencia: investiga que esta pasando con las
  conexiones a la base de datos.
