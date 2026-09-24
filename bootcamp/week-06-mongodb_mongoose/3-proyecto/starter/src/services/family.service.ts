// ============================================
// SERVICE: Family — delega en el repositorio
// ============================================

import * as repo from '../repositories/family.repository';
import type { CreateFamilyDto, UpdateFamilyDto } from '../schemas/family.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createFamily(dto: CreateFamilyDto) {
  return repo.create(dto);
}

export async function updateFamily(id: string, dto: UpdateFamilyDto) {
  return repo.update(id, dto);
}

export async function deleteFamily(id: string) {
  return repo.remove(id);
}
