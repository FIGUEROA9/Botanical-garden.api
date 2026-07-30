// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Plant, PlantSummary } from './types.js';

// TODO: Implementar filterByCategory
// Debe:
// 1. Si categoryFilter es null, retornar todas las plantas
// 2. Si categoryFilter está definido, retornar solo las plantas de esa categoría
//    (comparación case-insensitive con .toLowerCase())
// 3. Si no hay plantas en esa categoría, lanzar un Error que liste las categorías disponibles
//
// Firma esperada:
// export function filterByCategory(plants: Plant[], categoryFilter: string | null): Plant[]

export function filterByCategory(
  plants: Plant[],
  categoryFilter: string | null
): Plant[] {
  if (!categoryFilter) {
    return plants;
  }

  const filteredPlants = plants.filter(
    (plant) =>
      plant.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filteredPlants.length === 0) {
    const categories = Array.from(
      new Set(plants.map((plant) => plant.category))
    );

    throw new Error(
      `La categoría "${categoryFilter}" no existe. Categorías disponibles: ${categories.join(', ')}`
    );
  }

  return filteredPlants;
}

// TODO: Implementar calculateSummary
// Debe calcular y retornar un objeto PlantSummary con:
// - total: longitud del array
// - active: plantas con active === true
// - inactive: plantas con active === false
// - averagePrice: precio promedio redondeado a 2 decimales
// - mostExpensive: planta con el mayor precio
// - cheapest: planta con el menor precio
// - categories: array de categorías únicas (sin repetición)
//
// Pistas:
// - Usa .reduce() para sumar precios
// - Usa .filter() para separar activos e inactivos
// - Usa new Set() + Array.from() para categorías únicas
// - Usa Math.max/min o sort para la más cara/barata
//
// Firma esperada:
// export function calculateSummary(plants: Plant[]): PlantSummary

export function calculateSummary(plants: Plant[]): PlantSummary {
  const total = plants.length;

  const active = plants.filter((plant) => plant.active).length;

  const inactive = plants.filter((plant) => !plant.active).length;

  const totalPrice = plants.reduce(
    (sum, plant) => sum + plant.price,
    0
  );

  const averagePrice =
    Math.round((totalPrice / total) * 100) / 100;

  const mostExpensive = plants.reduce((max, plant) =>
    plant.price > max.price ? plant : max
  );

  const cheapest = plants.reduce((min, plant) =>
    plant.price < min.price ? plant : min
  );

  const categories = Array.from(
    new Set(plants.map((plant) => plant.category))
  );

  return {
    total,
    active,
    inactive,
    averagePrice,
    mostExpensive,
    cheapest,
    categories,
  };
}