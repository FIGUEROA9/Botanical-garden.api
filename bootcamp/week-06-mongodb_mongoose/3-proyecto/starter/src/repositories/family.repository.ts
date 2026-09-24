// ============================================
// REPOSITORY: Family
// Dominio: Jardín Botánico
// ============================================

import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Family, IFamily } from '../models/family.model';
import { AppError } from '../errors/AppError';
import type { CreateFamilyDto, UpdateFamilyDto } from '../schemas/family.schema';

export async function findAll(): Promise<IFamily[]> {
  return Family.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<IFamily> {
  try {
    const family = await Family.findById(id).lean();

    if (!family) {
      throw new AppError(404, `Familia ${id} no encontrada`);
    }

    return family;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateFamilyDto): Promise<IFamily> {
  try {
    const family = await Family.create(dto);
    return family.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, `La familia '${dto.name}' ya existe`);
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateFamilyDto): Promise<IFamily> {
  try {
    const updated = await Family.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      throw new AppError(404, `Familia ${id} no encontrada`);
    }

    return updated;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, `La familia '${dto.name}' ya existe`);
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const deleted = await Family.findByIdAndDelete(id);

    if (!deleted) {
      throw new AppError(404, `Familia ${id} no encontrada`);
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
