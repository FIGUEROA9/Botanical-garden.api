import { z } from 'zod';

// ============================================
// SCHEMA: Tree (Árbol)
// Dominio: Jardín Botánico
// ============================================

export const createTreeSchema = z.object({
  name: z.string().min(1, 'El nombre del árbol es obligatorio').max(150).trim(),
  scientificName: z.string().min(1, 'El nombre científico es obligatorio').trim(),
  origin: z.string().min(1, 'El origen es obligatorio').trim(),
  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .nonnegative('El stock no puede ser negativo')
    .default(0),
});

export const updateTreeSchema = createTreeSchema.partial();

export type CreateTreeDto = z.infer<typeof createTreeSchema>;
export type UpdateTreeDto = z.infer<typeof updateTreeSchema>;
