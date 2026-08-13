// ============================================
// TYPES — Adapta estos tipos a tu dominio
// ============================================
// NOTA: Renombra "Item" por el recurso de tu dominio.
// Ejemplos: Book, Medicine, Member, Dish, Patient, Movie...
//
// Agrega o quita campos según las características de tu dominio.

// TODO: Renombra Item y ajusta los campos a tu dominio asignado
export type PlantStatus = 'saludable' | 'en_observacion' | 'enferma';

export interface Plant {
  id: number;
  nombreComun: string;
  nombreCientifico: string;
  familia: string;
  tipo: string;
  ubicacion: string;
  estado: PlantStatus;
  createdAt: string;
}

// DTO para crear — sin campos auto-generados
export type CreatePlantDto = Omit<Plant, 'id' | 'createdAt'>;

// DTO para actualizar — todos los campos opcionales
export type UpdatePlantDto = Partial<CreatePlantDto>;

// Contratos de respuesta (no cambiar nombres — son genéricos)
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

//interface
export interface PaginationParams {
  page: number;
  limit: number;
}