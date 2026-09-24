// ============================================
// SCHEMAS ZOD: Tree (con referencia a Family)
// Dominio: Jardín Botánico
// ============================================

import { z } from 'zod';

// ObjectId: 24 caracteres hexadecimales
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createTreeSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del árbol es obligatorio')
    .max(150)
    .trim(),

  scientificName: z
    .string()
    .min(1, 'El nombre científico es obligatorio')
    .trim(),

  origin: z
    .string()
    .min(1, 'El origen es obligatorio')
    .trim(),

  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .nonnegative('El stock no puede ser negativo')
    .default(0),

  family: z
    .string()
    .regex(objectIdRegex, 'El id de familia es inválido'),
});

export const updateTreeSchema = createTreeSchema.partial();

export type CreateTreeDto = z.infer<typeof createTreeSchema>;
export type UpdateTreeDto = z.infer<typeof updateTreeSchema>;
