// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Plant } from './types.js';

// TODO: Implementar la función readPlants
// Debe:
// 1. Construir la ruta al archivo data/plants.json usando join() e import.meta.dirname
// 2. Leer el archivo con readFile (de 'fs/promises') usando 'utf-8'
// 3. Parsear el JSON y retornar el array de Plant[]
// 4. Si ocurre un error, lanzar un Error descriptivo con el mensaje original
//
// Firma esperada:
// export async function readPlants(): Promise<Plant[]>
//
// Ejemplo de estructura:
export async function readPlants(): Promise<Plant[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'plants.json');

  try {
    const raw = await readFile(filePath, 'utf-8');

    return JSON.parse(raw) as Plant[];
  } catch (err) {
    // Lanza un error descriptivo — el main() lo atrapará con try/catch
    const message = err instanceof Error ? err.message : String(err);

    throw new Error(`Error al leer archivo de plantas: ${message}`);
  }
}