// ============================================
// MODELO: Tree (entidad principal, con referencia a Family)
// Dominio: Jardín Botánico
// ============================================

import { Schema, model, Types } from 'mongoose';

export interface ITree {
  name: string;
  scientificName: string;
  origin: string;
  stock: number;
  family: Types.ObjectId;
}

const treeSchema = new Schema<ITree>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del árbol es requerido'],
      trim: true,
      maxlength: 150,
    },
    scientificName: {
      type: String,
      required: [true, 'El nombre científico es requerido'],
      trim: true,
      unique: true,
    },
    origin: {
      type: String,
      required: [true, 'El origen es requerido'],
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    family: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: [true, 'La referencia a la familia es requerida'],
    },
  },
  { timestamps: true },
);

// Model 'Tree' → colección 'trees'
export const Tree = model<ITree>('Tree', treeSchema);
