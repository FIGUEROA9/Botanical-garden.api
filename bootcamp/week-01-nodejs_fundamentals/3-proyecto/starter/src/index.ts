// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readPlants } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

// TODO: Parsear el argumento --category desde process.argv
// process.argv = ['node', 'script.ts', '--category', 'flor']
// Si '--category' está en los args, el siguiente elemento es el valor.
// Si no está, el filtro debe ser null.
//
// Ejemplo:
// const args = process.argv.slice(2);
// const categoryIndex = args.indexOf('--category');
// const categoryFilter: string | null = categoryIndex !== -1 ? args[categoryIndex + 1] : null;

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    const categoryIndex = args.indexOf('--category');

    const categoryFilter: string | null =
      categoryIndex !== -1 ? args[categoryIndex + 1] : null;

    // Leer plantas desde el archivo JSON
    const plants = await readPlants();

    // Filtrar plantas por categoría
    const filteredPlants = filterByCategory(
      plants,
      categoryFilter
    );

    // Calcular resumen del catálogo
    const summary = calculateSummary(filteredPlants);

    // Construir reporte final
    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filteredPlants,
    };

    // Mostrar resumen en consola
    console.log('\n===== JARDÍN BOTÁNICO =====');
    console.log(`Total plantas: ${summary.total}`);
    console.log(`Plantas activas: ${summary.active}`);
    console.log(`Plantas inactivas: ${summary.inactive}`);
    console.log(`Precio promedio: ${summary.averagePrice}`);
    console.log(
      `Categorías: ${summary.categories.join(', ')}`
    );

    console.log(
      `Planta más cara: ${summary.mostExpensive.name} - ${summary.mostExpensive.price}`
    );

    console.log(
      `Planta más económica: ${summary.cheapest.name} - ${summary.cheapest.price}`
    );

    // Escribir reporte
    await writeReport(report);

  } catch (error) {
    console.error(
      error instanceof Error ? error.message : error
    );

    process.exit(1);
  }
}

// TODO: Llamar main() al final del archivo
main();