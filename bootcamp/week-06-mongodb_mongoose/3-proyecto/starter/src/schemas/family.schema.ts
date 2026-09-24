// ============================================
// SCHEMAS ZOD: Family
// Dominio: Jardín Botánico
// ============================================

import { z } from 'zod';

export const createFamilySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la familia es obligatorio')
    .max(100)
    .trim(),
});

export const updateFamilySchema = createFamilySchema.partial();

export type CreateFamilyDto = z.infer<typeof createFamilySchema>;
export type UpdateFamilyDto = z.infer<typeof updateFamilySchema>;
