// ============================================
// SERVICE: Tree — delega en el repositorio
// ============================================

import * as repo from '../repositories/tree.repository';
import type { CreateTreeDto, UpdateTreeDto } from '../schemas/tree.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createTree(dto: CreateTreeDto) {
  return repo.create(dto);
}

export async function updateTree(id: string, dto: UpdateTreeDto) {
  return repo.update(id, dto);
}

export async function deleteTree(id: string) {
  return repo.remove(id);
}
