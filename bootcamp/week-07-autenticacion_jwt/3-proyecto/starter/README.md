# Proyecto Semana 07 — Autenticación JWT (Jardín Botánico)

API con autenticación completa (bcrypt + JWT access/refresh en cookies HttpOnly)
protegiendo el recurso `Tree` (Árbol) del dominio Jardín Botánico.

## Auth (ya dada por el starter)

```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me        (protegida)
POST /api/v1/auth/refresh
POST /api/v1/auth/logout    (protegida)
```

## Recurso: Trees (Árboles) — todas protegidas con authMiddleware

```
GET    /api/v1/trees
GET    /api/v1/trees/:id
POST   /api/v1/trees
PATCH  /api/v1/trees/:id
DELETE /api/v1/trees/:id
```

Campos: `name`, `scientificName` (único), `origin`, `stock`, `createdBy` (usuario autenticado).

## Cómo correrlo

```bash
docker compose up -d
cp .env.example .env
# editar .env: JWT_ACCESS_SECRET y JWT_REFRESH_SECRET (openssl rand -base64 64)
pnpm install
pnpm dev
```

## Flujo de prueba

1. `POST /auth/register` → crea usuario
2. `POST /auth/login` → guarda cookies `accessToken` y `refreshToken`
3. `POST /trees` con cookie → 201
4. `GET /trees` sin cookie → 401
5. `POST /auth/refresh` → nuevas cookies
6. `POST /auth/logout` → cookies limpiadas, refresh posterior → 401
