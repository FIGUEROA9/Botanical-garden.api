# 🚀 Proyecto Semanal — Procesador de Datos con Node.js

## 🎯 Objetivo

Construir una herramienta de línea de comandos (CLI) que lea datos desde un archivo JSON, los procese aplicando filtros y transformaciones, y genere un reporte con los resultados — todo usando **Node.js + TypeScript + async/await**.

---

## 🌱 Tu Dominio Asignado: Jardín Botánico

El recurso principal del proyecto es:

**Plant**

La herramienta permite procesar información de plantas de un jardín botánico, aplicando filtros por categoría y generando un reporte con estadísticas del catálogo.

Adaptación realizada:

- `Item` → `Plant`
- `items.json` → `plants.json`
- Campos adaptados al dominio:

| Campo | Descripción |
|---|---|
| `id` | Identificador único de la planta |
| `name` | Nombre de la planta |
| `category` | Categoría de la planta |
| `price` | Precio de la planta |
| `stock` | Cantidad disponible |
| `active` | Estado activo o inactivo |

Ejemplos de categorías:

- flor
- orquidea
- cactus
- helecho
- palmera
- arbol
- suculenta

---

## ✅ Requisitos Funcionales

### 1. Leer datos desde un archivo JSON

La herramienta lee el archivo:

```text
data/plants.json
```

usando `fs/promises`.

---

### 2. Mostrar un resumen del catálogo

El programa muestra:

- Total de plantas
- Plantas activas vs inactivas
- Precio promedio
- Planta más cara
- Planta más económica
- Categorías disponibles

---

### 3. Filtrar por categoría

Acepta un argumento de línea de comandos para filtrar plantas por categoría:

```bash
pnpm dev -- --category flor
```

Ejemplo:

```bash
pnpm dev -- --category cactus
```

Si la categoría no existe, muestra un aviso con las categorías disponibles.

---

### 4. Generar reporte en un archivo de salida

El reporte se guarda en:

```text
output/report.json
```

utilizando:

- `fs/promises.writeFile`
- `JSON.stringify`

---

### 5. Manejo de errores

El proyecto maneja:

- Archivo `plants.json` inexistente → muestra un error descriptivo y finaliza el proceso.
- Categoría inexistente → muestra aviso y lista las categorías disponibles.

---

## 🛠️ Entregables

1. **Código funcional** que pasa:

```bash
pnpm build
```

sin errores TypeScript.

2. **README.md actualizado** con el dominio Jardín Botánico.

3. **Logs de ejecución** usando diferentes argumentos.

Ejemplos:

```bash
pnpm dev

pnpm dev -- --category flor
```

4. Archivo de datos adaptado:

```text
data/plants.json
```

con mínimo 10 registros.

5. Reporte generado:

```text
output/report.json
```

---

## ⏱️ Tiempo estimado: 2-3 horas

---

## 🧪 Cómo correr el proyecto

```bash
cd 3-proyecto/starter

pnpm install

pnpm dev
```

Ejecutar con filtro:

```bash
pnpm dev -- --category flor
```

Compilar TypeScript:

```bash
pnpm build
```

---

## 📊 Criterios de Evaluación

| Criterio | Peso |
|----------|------|
| Lee y parsea `plants.json` correctamente | 20% |
| Calcula el resumen del catálogo | 20% |
| Filtra por categoría con `--category` | 20% |
| Escribe `output/report.json` correctamente | 20% |
| Manejo de errores (archivo no encontrado, categoría inexistente) | 10% |
| TypeScript estricto — `pnpm build` sin errores | 10% |

---

## 🔗 Recursos de Apoyo

- [Teoría: Módulos ESM](../../1-teoria/02-modulos-esm.md)
- [Teoría: async/await](../../1-teoria/03-async-await.md)
- [Ejercicio 01: Hello Node](../../2-practicas/ejercicio-01-hello-node/README.md)
- [Node.js fs/promises API](https://nodejs.org/docs/latest/api/fs.html#promises-api)
- [process.argv — Node.js docs](https://nodejs.org/docs/latest/api/process.html#processargv)