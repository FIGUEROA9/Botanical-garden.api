// ============================================
// SERVICE — lógica de negocio
// Dominio: Jardín Botánico — Tree
// ============================================
import { Tree, PaginatedResponse } from '../types';
import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(
  opts: FindAllOptions
): Promise<PaginatedResponse<Tree>> {
  const { page, limit } = opts;
  const all = await repo.findAll();

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

export async function findById(id: number): Promise<Tree> {
  const item = await repo.findById(id);

  if (!item) {
    throw new AppError(404, `Tree ${id} not found`);
  }

  return item;
}

export async function create(dto: repo.CreateItemRepoDto): Promise<Tree> {
  return repo.create(dto);
}

export async function update(
  id: number,
  dto: repo.UpdateItemRepoDto
): Promise<Tree> {
  const exists = await repo.findById(id);

  if (!exists) {
    throw new AppError(404, `Tree ${id} not found`);
  }

  const updated = await repo.update(id, dto);

  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);

  if (!exists) {
    throw new AppError(404, `Tree ${id} not found`);
  }

  await repo.remove(id);
}