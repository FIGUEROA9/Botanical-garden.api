// ============================================
// REPOSITORY: Tree (con populate de Family)
// Dominio: Jardín Botánico
// ============================================

import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Tree, ITree } from '../models/tree.model';
import { AppError } from '../errors/AppError';
import type { CreateTreeDto, UpdateTreeDto } from '../schemas/tree.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<ITree>> {
  const skip = (page - 1) * limit;
  const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    Tree.find(filter)
      .populate('family')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Tree.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function findById(id: string): Promise<ITree> {
  try {
    const tree = await Tree.findById(id).populate('family').lean();

    if (!tree) {
      throw new AppError(404, `Árbol ${id} no encontrado`);
    }

    return tree;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateTreeDto): Promise<ITree> {
  try {
    const tree = await Tree.create(dto);
    await tree.populate('family');
    return tree.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, `Ya existe un árbol con el nombre científico '${dto.scientificName}'`);
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'El id de familia es inválido');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateTreeDto): Promise<ITree> {
  try {
    const updated = await Tree.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    })
      .populate('family')
      .lean();

    if (!updated) {
      throw new AppError(404, `Árbol ${id} no encontrado`);
    }

    return updated;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, `Ya existe un árbol con el nombre científico '${dto.scientificName}'`);
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const deleted = await Tree.findByIdAndDelete(id);

    if (!deleted) {
      throw new AppError(404, `Árbol ${id} no encontrado`);
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
