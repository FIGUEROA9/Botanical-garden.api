// ============================================
// TIPOS — Adapta estas interfaces a tu dominio
// ============================================
// Renombra 'Item' al recurso de tu dominio asignado.
// Ejemplo: Book, Medicine, Member, Dish, Room...

// Dominio asignado: Jardín Botánico
// Recurso principal: Plant

export interface Plant {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
}

// TODO: Agregar campos específicos de tu dominio
// Ejemplo para Biblioteca:
// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   year: number;
//   available: boolean;
// }

// Resumen que el procesador debe calcular
export interface PlantSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Plant;
  cheapest: Plant;
  categories: string[];
}

// Reporte final que se escribirá en output/report.json
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: PlantSummary;
  items: Plant[];
}