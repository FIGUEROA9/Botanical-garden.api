// ============================================
// MODELO: Family (entidad secundaria)
// Dominio: Jardín Botánico
// ============================================

import { Schema, model } from 'mongoose';

export interface IFamily {
  name: string;
}

const familySchema = new Schema<IFamily>(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la familia es requerido'],
      trim: true,
      maxlength: 100,
      unique: true,
    },
  },
  { timestamps: true },
);

// Model 'Family' → colección 'families'
export const Family = model<IFamily>('Family', familySchema);
