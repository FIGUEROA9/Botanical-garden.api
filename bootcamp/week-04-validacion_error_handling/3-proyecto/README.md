🚀 Proyecto Semana 04: Validación, Errores y Logging
🎯 Objetivo
Integrar validación de datos con Zod, manejo estructurado de errores con AppError y
logging profesional con Winston + Morgan en la API del dominio Jardín Botánico.

📋 Tu Dominio Asignado
Dominio: Jardín Botánico
Recurso principal: Tree (Árbol)

La API permite gestionar árboles de un jardín botánico, utilizando una arquitectura en capas:

Rutas → Controladores → Servicios → Repositorios

✅ Requisitos Funcionales
1. Validación con Zod
Schema de creación (createItemSchema) con validaciones apropiadas para árboles
Schema de actualización (updateItemSchema) reutilizando .partial()
Tipos TypeScript inferidos con z.infer<>
Validación activa en controladores con .safeParse() — respuesta 400 con issues[]
Validación del parámetro :id con z.coerce.number().int().positive()
2. Manejo de errores estructurado
Clase AppError con statusCode e isOperational
Servicio lanza AppError(404, ...) cuando el árbol no existe
Middleware notFound registrado antes del errorHandler
Middleware errorHandler con exactamente 4 parámetros
errorHandler distingue ZodError → 400, AppError → statusCode, genérico → 500
next(err) en todos los bloques try/catch de los controladores
3. Logging profesional
Logger Winston configurado en src/config/logger.ts
Nivel http en desarrollo, warn en producción
Formato colorizado en desarrollo, JSON en producción
Transport de archivo logs/error.log solo en producción
Morgan integrado como middleware con la stream de Winston
Al menos un logger.info() al iniciar el servidor
Al menos un logger.warn() en el errorHandler para errores AppError
console.log reemplazados por logger.*
4. Arquitectura en capas
Rutas → Controladores → Servicios → Repositorios
Toda la lógica de negocio en el servicio, no en el controlador
Paginación en el endpoint de listado (page y limit como query params)
🛠️ Estructura del starter
starter/src/
├── config/
│   └── logger.ts          ← Winston logger + morganMiddleware
├── errors/
│   └── AppError.ts        ← clase AppError
├── middlewares/
│   ├── errorHandler.ts    ← 4-param error handler
│   └── notFound.ts        ← 404 middleware
├── schemas/
│   └── item.schema.ts     ← createItemSchema + updateItemSchema
├── repositories/
│   └── items.repository.ts ← CRUD en memoria
├── services/
│   └── items.service.ts   ← lógica de negocio con AppError
├── controllers/
│   └── items.controller.ts ← thin controller con next(err)
├── routes/
│   └── items.routes.ts    ← endpoints de Tree
├── types.ts               ← Tree entity + tipos de respuesta
├── app.ts                 ← setup Express + orden correcto
└── server.ts              ← bootstrap + logger.info

💡 Adaptación al dominio Jardín Botánico
Tree — campos y validaciones
export const createItemSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío').trim(),
  scientificName: z.string().min(1, 'El nombre científico es obligatorio').trim(),
  family: z.string().min(1, 'La familia botánica es obligatoria').trim(),
  origin: z.string().min(1, 'El origen es obligatorio').trim(),
  stock: z.number().int('El stock debe ser entero').nonnegative('El stock no puede ser negativo').default(0),
});

El schema de actualización reutiliza createItemSchema.partial() para permitir actualizaciones parciales.

📊 Endpoints requeridos
Método	Ruta	Descripción
GET	/api/v1/trees	Listar árboles con paginación
GET	/api/v1/trees/:id	Obtener un árbol por id
POST	/api/v1/trees	Crear un árbol validando con Zod
PUT	/api/v1/trees/:id	Actualizar un árbol
DELETE	/api/v1/trees/:id	Eliminar un árbol

🛠️ Entregables
API funcional para gestionar árboles.
Capturas de Postman/Thunder Client demostrando:
POST con body inválido → 400 con issues[]
GET /api/v1/trees/abc → 400
GET /api/v1/trees/9999 → 404
GET /api/v1/ruta-inexistente → 404 JSON (no HTML)
Logs en consola visibles
README.md dentro de la entrega describiendo:
Dominio asignado: Jardín Botánico.
Recurso principal: Tree.
Campos del schema y sus validaciones.
Cómo ejecutar el proyecto (pnpm dev).