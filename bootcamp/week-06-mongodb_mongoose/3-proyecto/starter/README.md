# Proyecto Semana 06 — Jardín Botánico (MongoDB + Mongoose)

Migración del proyecto del dominio **Jardín Botánico** de PostgreSQL/Prisma (semana 05) a
MongoDB con Mongoose.

## Entidades

| Entidad | Rol | Campos |
|---------|-----|--------|
| `Family` (Familia botánica) | Secundaria | `name` (único) |
| `Tree` (Árbol) | Principal | `name`, `scientificName` (único), `origin`, `stock`, `family: ObjectId → Family` |

## Endpoints

**Familias**
```
GET    /api/v1/families
GET    /api/v1/families/:id
POST   /api/v1/families
PUT    /api/v1/families/:id
DELETE /api/v1/families/:id
```

**Árboles** (con paginación y `populate('family')`)
```
GET    /api/v1/trees?page=1&limit=10&search=roble
GET    /api/v1/trees/:id
POST   /api/v1/trees
PUT    /api/v1/trees/:id
DELETE /api/v1/trees/:id
```

## Cómo correrlo

```bash
docker compose up -d          # levanta MongoDB en :27017
cp .env.example .env
pnpm install
pnpm seed                     # inserta 5 familias y 5 árboles de prueba
pnpm dev                      # http://localhost:3000
```

## Errores manejados

- `400` — ID inválido (`CastError`) o body inválido (Zod)
- `404` — recurso no encontrado
- `409` — `scientificName` o `name` de familia duplicado (error Mongo 11000)
