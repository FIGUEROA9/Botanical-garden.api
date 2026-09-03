// ============================================
// SCHEMAS — Tree (Árbol)
// Dominio: Jardín Botánico
// ============================================

import { z } from 'zod';

// Schema para crear un árbol
export const createItemSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del árbol es obligatorio')
    .trim(),

  scientificName: z
    .string()
    .min(1, 'El nombre científico es obligatorio')
    .trim(),

  familyId: z
    .number()
    .int('El familyId debe ser un número entero')
    .positive('El familyId debe ser mayor que 0'),

  origin: z
    .string()
    .min(1, 'El origen es obligatorio')
    .trim(),

  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .nonnegative('El stock no puede ser negativo')
    .default(0),
});

// Schema para actualizar un árbol
export const updateItemSchema = createItemSchema.partial();

// Tipos inferidos desde Zod
export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
