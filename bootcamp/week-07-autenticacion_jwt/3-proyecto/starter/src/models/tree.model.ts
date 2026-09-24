import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO: Tree (Árbol) — recurso principal
// Dominio: Jardín Botánico
// ============================================

export interface ITree extends Document {
  name: string;
  scientificName: string;
  origin: string;
  stock: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const TreeModel = mongoose.model<ITree>('Tree', treeSchema);
