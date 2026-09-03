// ============================================
// TYPES — Tree (Árbol)
// Dominio: Jardín Botánico
// ============================================

export interface Tree {
  id: number;
  name: string;
  scientificName: string;
  familyId: number;
  origin: string;
  stock: number;
  createdAt: Date;
}

// Tipos de respuesta genéricos
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
